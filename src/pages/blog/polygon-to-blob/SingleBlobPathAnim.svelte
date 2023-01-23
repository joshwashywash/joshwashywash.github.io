<script lang="ts">
	import type { Polygon } from './types';
	import { animation } from '../../../actions/animation';
	import { aperture, bezierOffset } from './functions';
	import { midpoint } from './geometry';

	export let width: number;
	export let height: number;
	export let polygon: Polygon;
	const strokeWidth = width / 100;

	const pairs = aperture(2, polygon.slice(0, 3));
	const controlPoint = polygon[1];

	const [m1, m2] = pairs.map(([p1, p2]) => midpoint(p1, p2));
	const offsets = bezierOffset(m1, m2, controlPoint);
	const d = `M${m1} q${offsets}`;
	const [cx, cy] = controlPoint;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox={`0 0 ${width} ${height}`}
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<polygon points={polygon.join()} class="fill-pine/50" />
	<circle {cx} {cy} r={strokeWidth} class="fill-love" />
	<polyline
		points={pairs.join()}
		stroke-width={strokeWidth}
		class="stroke-love/50"
		fill="none"
		pathLength={1}
		stroke-dasharray={strokeWidth / 4}
		use:animation={{
			keyframes: { strokeDashoffset: [1, 0] },
			options: { duration: 5, easing: 'linear', repeat: Infinity },
		}}
	/>
	<path
		class="stroke-gold"
		fill="none"
		stroke-width={strokeWidth}
		pathLength={1}
		stroke-dashoffset={1}
		stroke-dasharray={1}
		{d}
		use:animation={{
			keyframes: { strokeDashoffset: 0 },
			options: { duration: 2, repeat: Infinity, direction: 'alternate' },
		}}
	/>
</svg>

<script lang="ts">
	import { example, type Polygon } from '../../lib/polygon';
	import { animation } from '../../lib/actions/animation';
	import { aperture } from '../../lib/array';
	import {
		diff,
		midpoint,
		multiply,
		toVec2,
		type Vec3,
	} from '../../lib/vector';
	import type { Offset } from '../../lib/bezier';
	import { tweened } from 'svelte/motion';

	export let width = 10;
	export let height = 5;
	export let polygon: Polygon = example;
	const strokeWidth = width / 100;

	const pairs = aperture(2, polygon.slice(0, 3));
	const controlPoint = polygon[1];

	const scale: Vec3 = [width, 2 * height, 0];

	const [m1, m2] = pairs.map(([p1, p2]) => midpoint(p1, p2));
	const offset: Offset = [diff(controlPoint, m1), diff(m2, m1)];
	const d = `M${toVec2(multiply(scale, m1))} q${offset.map((v) =>
		v ? toVec2(multiply(scale, v)) : ''
	)}`;
	const [cx, cy] = multiply(scale, controlPoint);

	const strokeDashOffset = tweened(1, { duration: 4000 });

	const animate = () => {
		strokeDashOffset.set(0).then(() => {
			strokeDashOffset.set(1).then(() => {
				animate();
			});
		});
	};

	animate();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox={`0 0 ${width} ${height}`}
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<polygon
		points={polygon.map((p) => toVec2(multiply(scale, p))).join()}
		class="fill-pine/50"
	/>
	<circle {cx} {cy} r={strokeWidth} class="fill-love" />
	<polyline
		points={pairs
			.map((pair) => pair.map((v) => toVec2(multiply(scale, v))))
			.join()}
		stroke-width={strokeWidth}
		class="stroke-love/50"
		fill="none"
		pathLength={1}
		stroke-dasharray={strokeWidth / 4}
		stroke-dashoffset={$strokeDashOffset}
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

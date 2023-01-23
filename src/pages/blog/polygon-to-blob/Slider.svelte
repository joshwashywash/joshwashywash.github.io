<script lang="ts">
	import type { Polygon } from './types';
	import { aperture, bezierOffset, clamp } from './functions';
	import { midpoint } from './geometry';

	export let width: number;
	export let height: number;
	export let strokeWidth = width / 100;
	export let polygon: Polygon;

	let _x = width / 2;

	const [m0, ...ms] = aperture(2, [...polygon, polygon[0]]).map(([p1, p2]) =>
		midpoint(p1, p2)
	);

	const offsets = aperture(2, [m0, ...ms, m0]).map(([m1, m2], i) => {
		const controlPoint = polygon[(i + 1) % polygon.length];
		return bezierOffset(m1, m2, controlPoint);
	});

	const d = `M${m0} q${offsets}`;

	let grabbing = false;
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox={`0 0 ${width} ${height}`}
	on:pointermove={(e) => {
		if (grabbing) {
			e.currentTarget.setPointerCapture(e.pointerId);
			const { currentTarget, x } = e;
			const rect = currentTarget.getBoundingClientRect();
			_x = clamp(0, width, ((x - rect.x) / rect.width) * width);
		}
	}}
	on:pointerup={() => {
		grabbing = false;
	}}
	class:cursor-grabbing={grabbing}
>
	<defs>
		<clipPath id="clip">
			<rect x1={0} x2={0} width={_x} {height} />
		</clipPath>
	</defs>
	<path {d} class="fill-gold" />
	<polygon points={polygon.join()} class="fill-pine" clip-path="url(#clip)" />
	<g stroke-width={strokeWidth} class="fill-rose stroke-love active:fill-iris">
		<line x1={_x} y1={0} x2={_x} y2={height} />
		<circle
			class:hover:cursor-grab={!grabbing}
			on:touchstart|preventDefault
			on:pointerdown={() => {
				grabbing = true;
			}}
			cx={_x}
			cy={height / 2}
			r={3 * strokeWidth}
		/>
	</g>
</svg>

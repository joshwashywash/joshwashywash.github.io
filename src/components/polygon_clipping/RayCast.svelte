<script lang="ts">
	import type { Vec2 } from '../../lib/vector';
	import { lineIntersections, translatable } from './util';

	export let insideColor: string;
	export let outsideColor: string;
	export let polygonColor: string;

	export let polygon: Vec2[];

	export let width: number;
	export let height: number;

	let cx = width / 2;
	let cy = height / 2;

	const li = lineIntersections(polygon);

	$: ints = li(cx, cy, width, cy);
	$: color = ints.length % 2 === 1 ? insideColor : outsideColor;
</script>

<svg viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">
	<polygon
		stroke={polygonColor}
		stroke-width="1%"
		fill="none"
		points={polygon.join(' ')}
	/>
	<line x1={cx} y1={cy} x2={width} y2={cy} stroke={color} stroke-width="1%" />
	<circle
		class="cursor-move"
		fill={color}
		use:translatable={{ offset: { x: cx, y: cy } }}
		on:translate={({ detail }) => {
			cx = detail.x;
			cy = detail.y;
		}}
		{cx}
		{cy}
		r="4%"
	/>

	<g fill={color} stroke={polygonColor} stroke-width="1%">
		{#each ints as [cx, cy]}
			<circle {cx} {cy} r="1%" />
		{/each}
	</g>
	<text
		class="text-[10%]"
		x={width}
		y={height - height / 10}
		text-anchor="end"
		fill={polygonColor}
	>
		{ints.length}
	</text>
</svg>

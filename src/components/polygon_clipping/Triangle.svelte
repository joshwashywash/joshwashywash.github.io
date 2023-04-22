<script lang="ts">
	import type { Vec2 } from '../../lib/vector';
	import { contains, moveable } from './util';

	export let insideColor: string;
	export let outsideColor: string;
	export let lineColor: string;

	const DIAMETER = 6;

	const triangle: Vec2[] = [
		[1, 5],
		[3, 1],
		[5, 5],
	];

	let cx = DIAMETER / 2;
	let cy = cx;

	const c = contains(triangle);

	$: fill = c(cx, cy) ? insideColor : outsideColor;
</script>

<svg viewBox="0 0 {DIAMETER} {DIAMETER}" xmlns="http://www.w3.org/2000/svg">
	<polygon
		fill="none"
		points={triangle.join(' ')}
		stroke={lineColor}
		stroke-linecap="round"
		stroke-width="1%"
	/>
	<circle
		class="cursor-move"
		{fill}
		use:moveable
		on:move={({ detail }) => {
			cx = detail.x;
			cy = detail.y;
		}}
		{cx}
		{cy}
		r="3%"
	/>
</svg>

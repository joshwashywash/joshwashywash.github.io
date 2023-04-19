<script lang="ts">
	import type { Vec2 } from '../../lib/vector';
	import { contains, moveable } from './util';

	export let insideColor: string;
	export let outsideColor: string;
	export let lineColor: string;

	const DIAMETER = 1;
	const LINE_COUNT = 5;

	const CELL_WIDTH = DIAMETER / (LINE_COUNT + 1);

	const multiply =
		(b: Vec2) =>
		(a: Vec2): Vec2 =>
			[a[0] * b[0], a[1] * b[1]];

	const scale = multiply([CELL_WIDTH, CELL_WIDTH]);

	const steps: Vec2[] = [
		[1, 5],
		[3, 1],
		[5, 5],
	];

	const triangle = steps.map(scale);

	let cx = 3 * CELL_WIDTH;
	let cy = 4 * CELL_WIDTH;

	const c = contains(triangle);

	$: fill = c(cx, cy) ? insideColor : outsideColor;
</script>

<svg viewBox="0 0 {DIAMETER} {DIAMETER}" xmlns="http://www.w3.org/2000/svg">
	<g stroke-width="1%" stroke={lineColor} stroke-linecap="round">
		{#each triangle as _, i}
			{@const [x1, y1] = triangle[i]}
			{@const [x2, y2] = triangle[(i + 1) % triangle.length]}
			<line {x1} {y1} {x2} {y2} />
		{/each}
	</g>
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

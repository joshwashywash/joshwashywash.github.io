<script lang="ts">
	import { intersection, moveable } from './util';
	import type { Vec2 } from '../../lib/vector';

	const WIDTH = 1;
	const HEIGHT = 1;

	const CELL_COUNT = 4;
	const W = WIDTH / CELL_COUNT;

	const a: Vec2 = [W, W];
	const b: Vec2 = [3 * W, 3 * W];
	const c: Vec2 = [W, 3 * W];
	const d: Vec2 = [3 * W, W];


	$: inter = intersection(a, b);
	$: point = inter(c, d);
</script>

<svg viewBox="0 0 {WIDTH} {HEIGHT}" xmlns="http://www.w3.org/2000/svg">
	<line
		x1={a[0]}
		y1={a[1]}
		x2={b[0]}
		y2={b[1]}
		stroke="white"
		stroke-width="1%"
	/>
	<line
		x1={c[0]}
		y1={c[1]}
		x2={d[0]}
		y2={d[1]}
		stroke="white"
		stroke-width="1%"
	/>
	{#each [a, b, c, d] as point}
		<circle
			class="cursor-move"
			use:moveable
			on:move={({ detail }) => {
				const { x, y } = detail;
				point[0] = x;
				point[1] = y;
			}}
			cx={point[0]}
			cy={point[1]}
			r="5%"
			fill="white"
		/>
	{/each}

	{#if point}
		<circle cx={point[0]} cy={point[1]} fill="red" r="5%" />
	{/if}
</svg>

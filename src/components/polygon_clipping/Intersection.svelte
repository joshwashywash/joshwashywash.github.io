<script lang="ts">
	import { intersection, translatable } from './util';
	import type { Vec2 } from '../../lib/vector';

	export let intersectionColor: string;
	export let lineColor: string;
	export let pointColor: string;

	const CELL_COUNT = 4;

	const WIDTH = CELL_COUNT;
	const HEIGHT = WIDTH;

	const a: Vec2 = [1, 1];
	const b: Vec2 = [3, 3];
	const c: Vec2 = [1, 3];
	const d: Vec2 = [3, 1];

	$: inter = intersection(a[0], a[1], b[0], b[1], true);
	$: point = inter(c[0], c[1], d[0], d[1]);
</script>

<svg viewBox="0 0 {WIDTH} {HEIGHT}" xmlns="http://www.w3.org/2000/svg">
	<g stroke={lineColor} stroke-width="1%">
		<line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} />
		<line x1={c[0]} y1={c[1]} x2={d[0]} y2={d[1]} />
	</g>
	<g fill={pointColor}>
		{#each [a, b, c, d] as point}
			<circle
				style="--stroke-color: {lineColor}"
				class="cursor-move hover:stroke-[--stroke-color] hover:stroke-[1%]"
				use:translatable={{ offset: { x: point[0], y: point[1] } }}
				on:translate={({ detail }) => {
					point[0] = detail.x;
					point[1] = detail.y;
				}}
				cx={point[0]}
				cy={point[1]}
				r="5%"
			/>
		{/each}
	</g>

	{#if point}
		{@const [cx, cy] = point}
		<circle {cx} {cy} stroke-width="1%" stroke={lineColor} fill={intersectionColor} r="3%" />
	{/if}
</svg>

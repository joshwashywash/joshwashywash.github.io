<script lang="ts">
	import type { Vec2 } from '../../lib/vector';
	import { contains, translatable } from './util';

	export let insideColor: string;
	export let lineColor: string;
	export let outsideColor: string;

	const DIAMETER = 4;

	const triangle: Vec2[] = [
		[2, 1],
		[3, 3],
		[1, 3],
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
		style="--stroke-color: {lineColor}"
		class="cursor-move hover:stroke-[--stroke-color] hover:stroke-[1%]"
		{fill}
		use:translatable={{ offset: { x: cx, y: cy } }}
		on:translate={({ detail }) => {
			cx = detail.x;
			cy = detail.y;
		}}
		{cx}
		{cy}
		r="3%"
	/>
</svg>

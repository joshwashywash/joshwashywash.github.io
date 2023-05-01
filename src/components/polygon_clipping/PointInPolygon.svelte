<script lang="ts">
	import type { Vec2 } from '../../lib/vector';
	import { contains, translatable } from './util';

	export let insideColor: string;
	export let lineColor: string;
	export let outsideColor: string;

	export let width: number;
	export let height: number;

	export let polygon: Vec2[];
	export let pointX: number;
	export let pointY: number;

	const c = contains(polygon);

	$: fill = c(pointX, pointY) ? insideColor : outsideColor;
</script>

<svg viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">
	<polygon
		fill="none"
		points={polygon.join(' ')}
		stroke={lineColor}
		stroke-linecap="round"
		stroke-width="1%"
	/>
	<circle
		style="--stroke-color: {lineColor}"
		class="cursor-move hover:stroke-[--stroke-color] hover:stroke-[1%]"
		{fill}
		use:translatable={{ offset: { x: pointX, y: pointY } }}
		on:translate={({ detail }) => {
			pointX = detail.x;
			pointY = detail.y;
		}}
		cx={pointX}
		cy={pointY}
		r="3%"
	/>
</svg>

<script lang="ts">
	import { right, translatable } from './util';

	const RADIUS = Math.SQRT2 * 0.5;
	const DIAMETER = 2 * RADIUS;

	export let insideColor: string;
	export let lineColor: string;
	export let outsideColor: string;

	let cx = -RADIUS * 0.5;
	let cy = 0;

	let angle = 90;

	$: radians = (Math.PI / 180) * angle;

	$: x1 = Math.cos(radians);
	$: y1 = Math.sin(radians);
	$: x2 = -x1;
	$: y2 = -y1;

	$: r = right(x1, y1, x2, y2);

	$: fill = r(cx, cy) ? insideColor : outsideColor;

	let stroke = 'none';
</script>

<figure class="flex flex-col items-center gap-2">
	<fieldset>
		<label class="flex items-center gap-2">
			<span>angle: {angle}</span>
			<input bind:value={angle} type="range" max="180" />
		</label>
	</fieldset>
	<svg
		class="w-5/6"
		viewBox="{-RADIUS} {-RADIUS} {DIAMETER} {DIAMETER}"
		xmlns="http://www.w3.org/2000/svg"
	>
		<line {x1} {y1} {x2} {y2} stroke={lineColor} stroke-width="1%" />
		<circle
			style="--stroke-color: {lineColor}"
			class="cursor-move hover:stroke-[--stroke-color] hover:stroke-[1%]"
			{fill}
			{stroke}
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
</figure>

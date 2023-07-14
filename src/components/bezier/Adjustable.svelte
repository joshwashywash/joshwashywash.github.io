<script lang="ts">
	import type { Curve } from '../../lib/bezier';
	import { createClamp, randomInt } from '../../lib/number';
	import { derived } from 'svelte/store';
	import { diff, toVec2 } from '../../lib/vector';
	import { tweened } from 'svelte/motion';

	export let height: number;
	export let width: number;

	const s = width / 6;
	const t = height / 6;

	export let bezier: Curve = [
		[s, 5 * t, 0],
		[3 * s, t, 0],
		[5 * s, 5 * t, 0],
	];

	const strokeWidth = width / 20;

	const curve = tweened(bezier);

	const d = derived(
		curve,
		([start, control, end]): string =>
			`M${toVec2(start)}q${toVec2(diff(control, start))} ${toVec2(diff(end, start))}`
	);

	const randomBezier = (minX: number, maxX: number, minY: number, maxY: number): Curve => {
		const rix = () => randomInt(minX, maxX);
		const riy = () => randomInt(minY, maxY);
		return [
			[rix(), riy(), 0],
			[rix(), riy(), 0],
			[rix(), riy(), 0],
		];
	};

	const randomize = () => {
		curve.set(randomBezier(1, width, 1, height));
	};

	let grabbing = false;
	let index = 0;
	const horizontalClamp = createClamp(0, width);
	const verticalClamp = createClamp(0, height);
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox={`0 0 ${width} ${height}`}
	on:pointermove={(e) => {
		if (grabbing) {
			const { currentTarget, pointerId, x, y } = e;
			currentTarget.setPointerCapture(pointerId);
			const rect = currentTarget.getBoundingClientRect();
			$curve[index] = [
				horizontalClamp(((x - rect.x) / rect.width) * width),
				verticalClamp(((y - rect.y) / rect.height) * height),
				0,
			];
		}
	}}
	on:pointerup={() => {
		grabbing = false;
	}}
>
	<path
		on:click={randomize}
		on:keydown={randomize}
		fill="none"
		stroke-width={strokeWidth}
		class="cursor-pointer stroke-pine hover:stroke-foam"
		d={$d}
	/>
	{#each $curve as [cx, cy], i}
		<circle
			class="cursor-move touch-none fill-love stroke-0 active:fill-rose"
			{cx}
			{cy}
			r={(strokeWidth * 3) / 4}
			on:touchstart|preventDefault
			on:pointerdown={() => {
				grabbing = true;
				index = i;
			}}
		/>
	{/each}
</svg>

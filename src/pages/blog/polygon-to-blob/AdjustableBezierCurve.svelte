<script lang="ts">
	import type { AbsoluteBezierCurve } from './types';
	import { bezierOffset, randomInt } from './functions';
	import { clamp } from './functions';
	import { derived } from 'svelte/store';
	import { tweened } from 'svelte/motion';

	export let height: number;
	export let width: number;
	const strokeWidth = width / 20;

	const s = width / 6;
	const t = height / 6;

	const curve = tweened<AbsoluteBezierCurve>([
		[s, 5 * t],
		[5 * s, 5 * t],
		[3 * s, t],
	]);

	const d = derived(curve, ([start, end, control]) => {
		const offsets = bezierOffset(start, end, control);
		return `M${start} q${offsets}`;
	});

	const randomCurve = (
		minX: number,
		maxX: number,
		minY: number,
		maxY: number
	) =>
		Array.from({ length: 3 }, () =>
			[
				[minX, maxX],
				[minY, maxY],
			].map(([a, b]) => randomInt(a, b))
		) as AbsoluteBezierCurve;

	const randomize = () => {
		curve.set(randomCurve(1, width, 1, height));
	};

	let grabbing = false;
	let index = 0;
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
				clamp(0, width, ((x - rect.x) / rect.width) * width),
				clamp(0, height, ((y - rect.y) / rect.height) * height),
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

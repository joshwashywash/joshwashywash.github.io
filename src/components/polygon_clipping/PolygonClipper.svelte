<script lang="ts">
	import type { Vec2 } from '../../lib/vector';
	import { clip, translatable } from './util';

	export let strokeColor: string;
	export let subjectColor: string;

	export let width: number;
	export let height: number;

	export let clipper: Vec2[];
	export let subject: Vec2[];

	let clipperTranslation: Vec2 = [0, 0];

	const add =
		(a: Vec2) =>
		(b: Vec2): Vec2 =>
			[a[0] + b[0], a[1] + b[1]];

	$: translatedClipper = clipper.map(add(clipperTranslation));

	$: clipped = clip(translatedClipper)(subject);

	let showClippedPoints = false;
</script>

<figure class="flex flex-col items-center">
	<figcaption>
		<label>
			<span>show clipped points</span>
			<input type="checkbox" bind:checked={showClippedPoints} />
		</label>
	</figcaption>

	<svg viewBox="0 0 {width} {height}">
		<polygon fill={subjectColor} points={clipped.join(' ')} />
		<polygon
			class="cursor-move"
			use:translatable={{
				offset: { x: clipperTranslation[0], y: clipperTranslation[1] },
			}}
			on:translate={({ detail }) => {
				clipperTranslation[0] = detail.x;
				clipperTranslation[1] = detail.y;
			}}
			fill="transparent"
			stroke={strokeColor}
			stroke-width="1%"
			points={translatedClipper.join(' ')}
		/>

		{#if showClippedPoints}
			{#each clipped as [cx, cy]}
				<circle {cx} {cy} r="1%" fill={strokeColor} />
			{/each}
		{/if}
	</svg>
</figure>

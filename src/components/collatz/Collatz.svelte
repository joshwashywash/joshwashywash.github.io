<script lang="ts">
	import { collatzSequence, path } from './util';

	export let n = 1;
	export let size = 1;
	export let angle = 45;

	export let forward = 3;
	export let spread = 0;

	$: f = forward / 100;

	const divs = 360 / n;

	const toRads = (d: number) => (Math.PI / 180) * d;

	$: pather = path(size, f, toRads(angle), toRads(spread));

	$: ds = Array.from({ length: n }, (_, i) => pather(collatzSequence(n - i)));
</script>

<figure class="flex flex-col items-center justify-center gap-4 sm:flex-row-reverse sm:gap-8">
	<fieldset class="flex flex-col gap-2">
		<label class="flex flex-col items-center">
			angle: {angle}
			<input type="range" bind:value={angle} min={0} max={180} />
		</label>
		<label class="flex flex-col items-center">
			forward: {forward}
			<input type="range" bind:value={forward} min={0} max={100} />
		</label>
	</fieldset>
	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}">
		<g stroke-linecap="round" stroke-linejoin="round" fill="none" stroke-width="1%">
			{#each ds as d, i}
				<path stroke={`hsl(${divs * i} 100% 50%)`} {d} />
			{/each}
		</g>
	</svg>
</figure>

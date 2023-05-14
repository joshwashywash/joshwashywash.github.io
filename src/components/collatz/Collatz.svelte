<script lang="ts">
	import { collatzSequence, path } from './util';

	export let n = 1;
	export let size = 10;
	export let scale = 0.7;
	export let angle = Math.PI / 6;
	export let forward = size * scale * (3 / 100);
	export let spread = 0;

	const divs = 360 / n;

	const pather = path(size, forward, angle, spread);

	const ds = Array.from({ length: n }, (_, i) =>
		pather(collatzSequence(n - i))
	);
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}">
	<g
		stroke-linecap="round"
		stroke-linejoin="round"
		fill="none"
		stroke-width="1%"
	>
		{#each ds as d, i}
			<path stroke={`hsl(${divs * i} 100% 50%)`} {d} />
		{/each}
	</g>
</svg>

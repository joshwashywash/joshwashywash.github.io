<script lang="ts">
	import { collatzSequence, turtle } from './util';

	export let n = 1;

	const sequences = Array.from({ length: n }, (_, i) =>
		collatzSequence(i + 1).reverse()
	);

	const size = 1000;
	const scale = 0.8;

	const amount = size * scale * (2 / 100);
	const thickness = size * (1 / 100);
</script>

<canvas
	class="w-full max-w-max"
	use:turtle={{
		angle: Math.PI / 6,
		amount,
		colors(i) {
			return `hsl(${i ?? 0}, 100%, 75%, 25%)`;
		},
		sequences,
		size,
		thickness,
	}}
/>

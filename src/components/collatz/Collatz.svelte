<script lang="ts">
	import { collatzSequence, turtle } from './util';

	export let n = 1;

	const sequences = Array.from({ length: n }, (_, i) =>
		collatzSequence(i + 1).reverse()
	);

	const size = 1000;
	const scale = 0.6;

	const amount = size * scale * (3 / 100);
	const thickness = size * (1 / 100);
</script>

<canvas
	class="w-full"
	use:turtle={{
		angle: Math.PI / 6,
		amount,
		color(i) {
			return `hsl(${i ?? 0}, 100%, 75%, 50%)`;
		},
		sequences,
		size,
		thickness,
	}}
/>

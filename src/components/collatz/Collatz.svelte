<script lang="ts">
	import { collatzSequence } from './util';

	export let n = 1;
	export let size = 10;
	export let scale = 0.7;

	const amount = size * scale * (3 / 100);

	const path = (size: number, amount: number, angle: number) => {
		const center = size / 2;
		const angles = [angle, -angle];
		return (sequence: number[]) => {
			let d = `m${center}, ${center}`;
			let a = 0;
			for (let i = sequence.length - 1; i >= 0; i -= 1) {
				a += angles[sequence[i] & 1];
				d += `l${amount * Math.cos(a)}, ${amount * Math.sin(a)}`;
			}
			return d;
		};
	};

	const pather = path(size, amount, Math.PI / 6);

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
			{@const stroke = `hsl(${i} 100% 50%)`}
			<path {stroke} {d} />
		{/each}
	</g>
</svg>

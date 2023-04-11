<script lang="ts">
	import loadImage from '../../lib/loaders/image';
	import { red, sorter } from './utils';

	export let src: string;
</script>

{#await loadImage(src)}
	<p>loading...</p>
{:then image}
	<canvas
		class="w-full touch-none"
		use:sorter={{
			image,
			sort(a, b) {
				return red(a) - red(b);
			},
			timeout: 1000,
		}}
	/>
{/await}

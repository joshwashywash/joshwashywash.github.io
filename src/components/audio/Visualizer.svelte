<script lang="ts">
	import Button from '../Button.svelte';
	import loadAudio from '../../lib/loaders/audio';
	import { visualizer } from './utils';

	export let fftSize = 256;
	export let fillColor = 'white';
	export let strokeColor = 'white';
	export let borderWidth = 1;
	export let src: string;

	// TODO: make the visualizer action emit an event that you can use to set `playing`
	let playing = false;
</script>

{#await loadAudio(src)}
	<p>loading...</p>
{:then audio}
	<figure class="flex flex-col items-center gap-2">
		<fieldset>
			<Button
				on:click={() => {
					if (playing) {
						audio.pause();
					} else {
						audio.play();
					}
					playing = !playing;
				}}
			>
				{#if playing}
					pause
				{:else}
					play
				{/if}
			</Button>
		</fieldset>
		<canvas
			use:visualizer={{ audio, borderWidth, fillColor, fftSize, strokeColor }}
		/>
	</figure>
{/await}

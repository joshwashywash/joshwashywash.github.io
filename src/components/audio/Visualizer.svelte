<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	export let fftSize = 256;
	export let src: string;

	const WIDTH = 1;

	const ac = window.AudioContext ?? window.webkitAudioContext;
	const context = new ac();
	const audio = new Audio(src);

	let ready = false;
	let frame: number | undefined = undefined;
	audio.addEventListener('ended', () => {
		data.update((d) => {
			d.fill(0);
			return d;
		});
		if (frame !== undefined) {
			cancelAnimationFrame(frame);
			frame = undefined;
		}
	});

	const analyser = context.createAnalyser();

	analyser.fftSize = fftSize;

	const l = analyser.frequencyBinCount;

	const data = writable(new Uint8Array(l));

	const w = WIDTH / l;

	const animate = () => {
		data.update((d) => {
			analyser.getByteFrequencyData(d);
			return d;
		});
		frame = window.requestAnimationFrame(animate);
	};

	let paused = true;

	audio.addEventListener('play', () => {
		animate();
		paused = false;
	});

	audio.addEventListener(
		'canplaythrough',
		() => {
			const source = context.createMediaElementSource(audio);
			source.connect(analyser);
			analyser.connect(context.destination);
			ready = true;
		},
		{ once: true }
	);

	audio.addEventListener('pause', () => {
		paused = true;
	});

	const MAX = (1 << 8) - 1;

	onDestroy(() => {
		if (frame !== undefined) {
			window.cancelAnimationFrame(frame);
		}
	});
</script>

<figure class="flex flex-col gap-2">
	<figcaption>
		<button
			class="rounded-lg bg-gold py-1 px-4 text-base hover:bg-gold/90"
			disabled={!ready}
			on:click={() => {
				if (paused) {
					audio.play();
				} else {
					audio.pause();
				}
			}}
		>
			{#if paused}
				play
			{:else}
				pause
			{/if}
		</button>
	</figcaption>
	<svg viewBox="0 0 {WIDTH} {WIDTH}" xmlns="http://www.w3.org/2000/svg">
		<rect class="stroke-rose" stroke-width="1%" x={0} y={0} width={WIDTH} height={WIDTH} fill="none"/>
		<g class="fill-love" stroke="none">
			{#each $data as h, i}
				<rect x={i * w} y={WIDTH - h / MAX} width={w} height={h / MAX} />
			{/each}
		</g>
	</svg>
</figure>

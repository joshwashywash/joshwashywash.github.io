<script lang="ts">
	import { onDestroy } from 'svelte';
	import { derived, writable } from 'svelte/store';

	export let fftSize = 256;
	export let src: string;

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
	const angle = (4 * Math.PI) / l;

	const data = writable(new Uint8Array(l));
	const positions = derived(data, ($data) =>
		Array.from($data, (d, i) => {
			const s = d / 255;
			const a = i * angle;
			return [s * Math.cos(a), s * Math.sin(a)];
		})
	);

	const animate = () => {
		data.update((d) => {
			analyser.getByteFrequencyData(d);
			return d;
		});
		frame = window.requestAnimationFrame(animate);
	};

	audio.addEventListener('play', animate);

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

	onDestroy(() => {
		if (frame !== undefined) {
			window.cancelAnimationFrame(frame);
		}
	});
</script>

<button
	class="rounded-lg bg-gold py-1 px-4 text-base hover:bg-gold/90"
	disabled={!ready}
	on:click={() => {
		audio.play();
	}}
>
	play
</button>
<svg viewBox="-1 -1 2 2" xmlns="http://www.w3.org/2000/svg">
	<g class="fill-love" stroke="none">
		{#each $positions as [cx, cy]}
			<circle {cx} {cy} r="1%" />
		{/each}
	</g>
</svg>

<script lang="ts">
	import { onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	export let fftSize = 256;
	export let fillStyle = 'white';
	export let strokeStyle = 'white';
	export let src: string;

	const ac = window.AudioContext ?? window.webkitAudioContext;
	const audioContext = new ac();
	const audio = new Audio(src);

	let ready = false;
	let frame: number | undefined = undefined;
	onDestroy(() => {
		if (frame !== undefined) {
			window.cancelAnimationFrame(frame);
		}
	});

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

	const analyser = audioContext.createAnalyser();

	analyser.fftSize = fftSize;

	const l = analyser.frequencyBinCount;

	const data = writable(new Uint8Array(l));

	const animate = () => {
		data.update((d) => {
			analyser.getByteFrequencyData(d);
			return d;
		});
		frame = window.requestAnimationFrame(animate);
	};

	const paused = writable(audio.paused);

	audio.addEventListener('play', () => {
		animate();
		paused.set(audio.paused);
	});

	audio.addEventListener(
		'canplaythrough',
		() => {
			const source = audioContext.createMediaElementSource(audio);
			source.connect(analyser);
			analyser.connect(audioContext.destination);
			ready = true;
		},
		{ once: true }
	);

	audio.addEventListener('pause', () => {
		paused.set(audio.paused);
	});

	const border = 1;
	const MAX = (1 << 8) - 1;

	let canvas: HTMLCanvasElement;
	$: canvasContext = canvas?.getContext('2d');
	$: if (canvasContext) {
		canvasContext.fillStyle = fillStyle;
		canvasContext.strokeStyle = strokeStyle;
		canvasContext.strokeRect(0, 0, canvas?.width, canvas?.height);
	}
	$: innerWidth = canvas?.width - 2 * border;
	$: innerHeight = canvas?.height - 2 * border;
	$: w = innerWidth / l;
	$: if (canvasContext) {
		canvasContext.clearRect(border, border, innerWidth, innerHeight);
		$data.forEach((d, i) => {
			const h = (d / MAX) * innerHeight;
			canvasContext?.save();
			canvasContext?.translate(border + i * w, border + innerHeight - h);
			canvasContext?.fillRect(0, 0, w, h);
			canvasContext?.restore();
		});
	}
</script>

<figure class="flex flex-col items-center gap-2">
	<figcaption>
		<button
			class="rounded-lg bg-gold py-1 px-4 text-base hover:bg-gold/90"
			disabled={!ready}
			on:click={() => {
				if ($paused) {
					audio.play();
				} else {
					audio.pause();
				}
			}}
		>
			{#if $paused}
				play
			{:else}
				pause
			{/if}
		</button>
	</figcaption>
	<canvas bind:this={canvas} />
	<!-- <svg -->
	<!-- 	class="border-2 border-rose" -->
	<!-- 	viewBox="0 0 {WIDTH} {WIDTH}" -->
	<!-- 	xmlns="http://www.w3.org/2000/svg" -->
	<!-- > -->
	<!-- 	<g class="fill-love" stroke="none"> -->
	<!-- 		{#each $data as h, i} -->
	<!-- 			<rect x={i * w} y={WIDTH - h / MAX} width={w} height={h / MAX} /> -->
	<!-- 		{/each} -->
	<!-- 	</g> -->
	<!-- </svg> -->
</figure>

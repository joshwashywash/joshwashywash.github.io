<script lang="ts">
	import { onMount } from 'svelte';
	import { red } from './utils';
	import Button from '../Button.svelte';

	export let src: string;

	let canvas: HTMLCanvasElement;

	let downX = 0;
	let downY = 0;

	let upX = 0;
	let upY = 0;

	let context: CanvasRenderingContext2D | null;

	const loadImage = (path: string) => {
		return new Promise<HTMLImageElement>((resolve) => {
			const image = new Image();
			image.addEventListener(
				'load',
				() => {
					resolve(image);
				},
				{ once: true }
			);
			image.src = path;
		});
	};

	const os = new OffscreenCanvas(0, 0);
	const osc = os.getContext('2d');

	$: context = canvas?.getContext('2d');
	$: if (context) {
		context.fillStyle = 'rgba(255, 255, 255, 0.5)';
	}

	// TODO: i'm sure this could be organized more clearly
	let image: HTMLImageElement;
	onMount(() => {
		loadImage(src).then((i) => {
			canvas.width = i.width;
			canvas.height = i.height;
			os.width = i.width;
			os.height = i.height;
			if (context) {
				context.drawImage(i, 0, 0);
			}
			image = i;
		});
	});

	let down = false;

	// takes an `n` that's in the range [0, from] and maps it to the range [0, to]
	const c = (n: number, from: number, to: number) => Math.floor((n / from) * to);
</script>

<figure class="flex flex-col items-center gap-2">
	<figcaption>
		<Button
			on:click={() => {
				if (image) {
					context?.drawImage(image, 0, 0);
				}
			}}
		>
			reset
		</Button>
	</figcaption>
	<canvas
		class="w-full touch-none"
		on:pointerdown={({ currentTarget, x, y }) => {
			down = true;
			if (context) {
				osc?.putImageData(
					context.getImageData(0, 0, canvas.width, canvas.height),
					0,
					0
				);
			}
			const { left, width, top, height } =
				currentTarget.getBoundingClientRect();
			downX = c(x - left, width, canvas.width);
			downY = c(y - top, height, canvas.height);
		}}
		on:pointermove={(e) => {
			if (down) {
				if (osc) {
					context?.putImageData(
						osc.getImageData(0, 0, os.width, os.height),
						0,
						0
					);
				}
				const { currentTarget, x, y } = e;
				const { left, width, top, height } =
					currentTarget.getBoundingClientRect();
				const moveX = c(x - left, width, canvas.width);
				const moveY = c(y - top, height, canvas.height);
				const diffX = moveX - downX;
				const diffY = moveY - downY;
				context?.fillRect(downX, downY, diffX, diffY);
			}
		}}
		on:pointerup={({ currentTarget, x, y }) => {
			down = false;
			const { left, width, top, height } =
				currentTarget.getBoundingClientRect();
			upX = c(x - left, width, canvas.width);
			upY = c(y - top, height, canvas.height);
			const w = upX - downX;
			const h = upY - downY;
			const data = osc?.getImageData(downX, downY, w, h);
			if (data) {
				const pixels = new Uint32Array(data.data.buffer);
				pixels.sort((a, b) => red(a) - red(b));
				context?.putImageData(data, Math.min(downX, upX), Math.min(downY, upY));
			}
		}}
		bind:this={canvas}
	/>
</figure>

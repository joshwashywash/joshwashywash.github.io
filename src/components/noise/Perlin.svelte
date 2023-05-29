<script lang="ts">
	import type { Action } from 'svelte/action';
	import { perlin as p } from './utils';

	const perlin: Action<HTMLCanvasElement> = (canvas) => {
		const context = canvas.getContext('2d');
		if (context !== null) {
			canvas.width = 300;
			canvas.height = 300;
			const imageData = context.createImageData(canvas.width, canvas.height);
			const pp = p();
			const s = 10;
			for (let y = 0; y < canvas.height; y += 1) {
				for (let x = 0; x < canvas.width; x += 1) {
					const index = 4 * (x + y * canvas.width);
					const v = ((pp(s * (x / canvas.width), s * (y / canvas.height)) + 1) / 2) * 255;
					for (let i = 0; i < 3; i += 1) {
						imageData.data[i + index] = v;
					}
					imageData.data[3 + index] = 255;
				}
			}

			context.putImageData(imageData, 0, 0);
		}
	};
</script>

<canvas use:perlin />

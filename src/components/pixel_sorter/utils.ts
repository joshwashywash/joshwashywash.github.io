import type { Action } from 'svelte/action';

export const red = (n: number) => (n >> (0 * 8)) & ((1 << 8) - 1);
export const green = (n: number) => (n >> (1 * 8)) & ((1 << 8) - 1);
export const blue = (n: number) => (n >> (2 * 8)) & ((1 << 8) - 1);

export const sorter: Action<
	HTMLCanvasElement,
	{
		image: HTMLImageElement;
		sort: (a: number, b: number) => number;
		timeout: number;
	}
> = (canvas, opts) => {
	if (opts) {
		const { image, sort, timeout } = opts;
		const osc = new OffscreenCanvas(image.width, image.height);
		const oscc = osc.getContext('2d');

		canvas.width = image.width;
		canvas.height = image.height;

		const { width, height } = canvas.getBoundingClientRect();

		const cx = (n: number) => Math.floor((n / width) * canvas.width);
		const cy = (n: number) => Math.floor((n / height) * canvas.height);

		const context = canvas.getContext('2d');
		if (context) {
			context.fillStyle = 'rgba(255, 255, 255, 0.5)';
		}

		const reset = () => {
			context?.drawImage(image, 0, 0);
		};

		reset();

		let down = false;
		let downX: null | number = null;
		let downY: null | number = null;

		let timeoutId: NodeJS.Timeout | null = null;

		const onPointerDown = (e: PointerEvent) => {
			down = true;
			timeoutId = setTimeout(reset, timeout);
			downX = cx(e.offsetX);
			downY = cy(e.offsetY);
			if (context) {
				oscc?.putImageData(context.getImageData(0, 0, canvas.width, canvas.height), 0, 0);
			}
		};

		const onPointerMove = (e: PointerEvent) => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}

			if (down) {
				if (oscc) {
					context?.putImageData(oscc.getImageData(0, 0, osc.width, osc.height), 0, 0);
				}
				if (context && downX && downY) {
					const moveX = cx(e.offsetX);
					const moveY = cx(e.offsetY);
					const diffX = moveX - downX;
					const diffY = moveY - downY;
					context.fillRect(downX, downY, diffX, diffY);
				}
			}
		};

		const onPointerUp = (e: PointerEvent) => {
			down = false;

			if (timeout) {
				clearTimeout(timeout);
			}

			if (downX && downY) {
				const upX = cx(e.offsetX);
				const upY = cx(e.offsetY);
				const diffX = upX - downX;
				const diffY = upY - downY;
				const data = oscc?.getImageData(downX, downY, diffX, diffY);
				if (data) {
					if (context) {
						const pixels = new Uint32Array(data.data.buffer);
						pixels.sort(sort);
						context.putImageData(data, Math.min(downX, upX), Math.min(downY, upY));
					}
				}
			}
		};

		canvas.addEventListener('pointerdown', onPointerDown);
		canvas.addEventListener('pointermove', onPointerMove);
		canvas.addEventListener('pointerup', onPointerUp);

		return {
			destroy() {
				canvas.removeEventListener('pointerdown', onPointerDown);
				canvas.removeEventListener('pointermove', onPointerMove);
				canvas.removeEventListener('pointerup', onPointerUp);
			},
		};
	}
};

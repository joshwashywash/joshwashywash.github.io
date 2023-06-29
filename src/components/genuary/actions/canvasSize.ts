import type { Action } from 'svelte/action';

const size: Action<HTMLCanvasElement, { width: number; height: number }> = (canvas, options) => {
	canvas.width = options.width;
	canvas.height = options.height;
};

export default size;

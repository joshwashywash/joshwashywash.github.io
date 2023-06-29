import type { Action } from 'svelte/action';
import { perlin, map } from '../utils';

type Vec2 = {
	x: number;
	y: number;
};

type Mapper = ReturnType<typeof map>;

const perlinWave: Action<HTMLCanvasElement, { colors: string[]; backgroundColor: string }> = (
	canvas,
	options
) => {
	const context = canvas.getContext('2d');
	if (context !== null) {
		const offsets: Vec2[] = [];
		const maps: Mapper[] = [];
		const deltas: Vec2[] = [];
		const scale = 1 / (options.colors.length + 1);
		for (let i = 0; i < options.colors.length; i += 1) {
			const start = (i + 1) * scale;
			const end = (i + 2) * scale;
			maps.push(map(-1, 1, start, end));
			offsets.push({ x: 0, y: 0 });
			deltas.push({ x: 0.05, y: 1 / 10 ** (1 + options.colors.length - i) });
		}

		let frame: number | undefined;
		const p = perlin();
		const animate = () => {
			context.fillStyle = options.backgroundColor;
			context.fillRect(0, 0, canvas.width, canvas.height);
			for (let i = 0; i < options.colors.length; i += 1) {
				offsets[i].x = offsets[i].y;
				const m = maps[i];
				context.beginPath();
				context.moveTo(0, canvas.height);
				for (let x = 0; x <= canvas.width; x += 5) {
					const y = m(p(offsets[i].x, offsets[i].y)) * canvas.height;
					context.lineTo(x, y);
					offsets[i].x += deltas[i].x;
				}
				offsets[i].y += deltas[i].y;
				context.lineTo(canvas.width, canvas.height);
				context.closePath();
				context.fillStyle = options.colors[i];
				context.fill();
			}
			frame = requestAnimationFrame(animate);
		};
		animate();
		return {
			destroy() {
				if (frame !== undefined) {
					cancelAnimationFrame(frame);
					frame = undefined;
				}
			},
		};
	}
};

export default perlinWave;

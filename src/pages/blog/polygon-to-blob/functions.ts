import type { Point, Vector } from './types';

export const aperture = <T>(n: number, ts: T[]) => {
	if (n < 1 || n > ts.length) return [];
	return Array.from({ length: ts.length - n + 1 }, (_, i) =>
		ts.slice(i, i + n)
	);
};

export const clamp = (min: number, max: number, n: number) =>
	Math.min(Math.max(n, min), max);

export const randomInt = (min: number, max: number) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min) + min);
};

export const bezierOffset = (start: Point, end: Point, control: Point) => {
	const [px, py] = start;
	return [control, end].map(([ox, oy]) => [ox - px, oy - py]) as [
		Vector,
		Vector
	];
};

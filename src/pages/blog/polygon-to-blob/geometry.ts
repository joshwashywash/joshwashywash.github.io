import type { Point, Polygon, Vector } from './types';

export const midpoint = (p1: Point, p2: Point): Point => {
	const [x1, y1] = p1;
	const [x2, y2] = p2;
	return [(x1 + x2) / 2, (y1 + y2) / 2];
};

export const dot = (u: Vector, v: Vector) =>
	[0, 1].map((i) => u[i] * v[i]).reduce((prev, curr) => prev + curr);

export const mag = (v: Vector) => Math.hypot(...v);

export const angle = (u: Vector, v: Vector) =>
	Math.acos(dot(u, v) / (mag(u) * mag(v)));

export const degrees = (radians: number) => (360 * radians) / (2 * Math.PI);

const area = (polygon: Polygon) => {
	let sum = 0;
	for (let i = 0; i < polygon.length - 1; i += 1) {
		const [x1, y1] = polygon[i];
		const [x2, y2] = polygon[i + 1];
		sum += x1 * y2 - x2 * y1;
	}
	return sum / 2;
};

export const centroid = (polygon: Polygon) => {
	let cx = 0;
	let cy = 0;
	for (let i = 0; i < polygon.length - 1; i += 1) {
		const [x1, y1] = polygon[i];
		const [x2, y2] = polygon[i + 1];
		const term = x1 * y2 - x2 * y1;
		cx += (x1 + x2) * term;
		cy += (y1 + y2) * term;
	}

	const a = area(polygon);
	return [cx, cy].map((c) => c / (6 * a)) as Point;
};

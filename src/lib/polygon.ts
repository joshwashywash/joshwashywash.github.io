import type { Vec3 } from './vector';

export type Polygon = Vec3[];

const area = (polygon: Polygon): number => {
	let sum = 0;
	for (let i = 0; i < polygon.length - 1; i += 1) {
		const [x1, y1] = polygon[i];
		const [x2, y2] = polygon[i + 1];
		sum += x1 * y2 - x2 * y1;
	}
	return sum / 2;
};

export const centroid = (polygon: Polygon): Vec3 => {
	let cx = 0;
	let cy = 0;
	for (let i = 0; i < polygon.length - 1; i += 1) {
		const [x1, y1] = polygon[i];
		const [x2, y2] = polygon[i + 1];
		const term = x1 * y2 - x2 * y1;
		cx += (x1 + x2) * term;
		cy += (y1 + y2) * term;
	}

	const demoninator = 6 * area(polygon);

	return [cx / demoninator, cy / demoninator, 0];
};

export const example: Polygon = [
	[0.1, 0.3, 0],
	[0.5, 0.1, 0],
	[0.9, 0.4, 0],
	[0.7, 0.8, 0],
	[0.2, 0.7, 0],
];

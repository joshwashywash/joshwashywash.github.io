import type { Polygon } from './types';

export default (polygon: Polygon): number => {
	let sum = 0;
	for (let i = 0; i < polygon.length - 1; i += 1) {
		const [x1, y1] = polygon[i];
		const [x2, y2] = polygon[i + 1];
		sum += x1 * y2 - x2 * y1;
	}
	return sum * 0.5;
};

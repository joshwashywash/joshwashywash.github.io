import area from './area';
import type { Polygon } from './types';
import type { Vec3 } from '../vector';

export default (polygon: Polygon): Vec3 => {
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

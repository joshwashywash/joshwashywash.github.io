import determinant from '../determinant';
import type { Polygon } from './types';

export default (polygon: Polygon): number => {
	let sum = 0;
	for (let i = 0, l = polygon.length; i < l; i += 1) {
		const [x1, y1] = polygon[i];
		const [x2, y2] = polygon[(i + 1) % l];
		sum += determinant(x1, x2, y1, y2);
	}
	return sum * 0.5;
};

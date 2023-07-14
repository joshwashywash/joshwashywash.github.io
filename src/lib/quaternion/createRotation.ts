import type { Quaternion } from './types';
import type { Vec3 } from '../vector';
import { createScale } from '../vector';

export default (unit: Vec3, theta: number): Quaternion => {
	return {
		scalar: Math.cos(theta * 0.5),
		vector: createScale(Math.sin(theta * 0.5))(unit),
	};
};

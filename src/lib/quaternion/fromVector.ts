import type { Quaternion } from './types';
import type { Vec3 } from '../vector';

export default (v: Vec3): Quaternion => {
	return {
		scalar: 0,
		vector: v,
	};
};

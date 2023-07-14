import type { Quaternion } from './types';
import { add, createScale, cross, dot } from '../vector';

export default (r: Quaternion, s: Quaternion): Quaternion => {
	return {
		scalar: r.scalar * s.scalar - dot(r.vector, s.vector),
		vector: [
			createScale(s.scalar)(r.vector),
			createScale(r.scalar)(s.vector),
			cross(r.vector, s.vector),
		].reduce((acc, curr) => add(acc, curr)),
	};
};

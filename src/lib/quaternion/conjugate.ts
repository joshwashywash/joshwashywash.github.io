import type { Quaternion } from './types';
import { negate } from '../vector';

export default (q: Quaternion): Quaternion => {
	return {
		...q,
		vector: negate(q.vector),
	};
};

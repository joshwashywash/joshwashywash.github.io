import type { Quaternion } from './types';
import type { Vec3 } from '../vector';

export default (q: Quaternion): Vec3 => q.vector;

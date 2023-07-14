import dot from './dot';
import mag from './mag';
import type { Vec3 } from './types';

export default (a: Vec3, b: Vec3): number => Math.acos((dot(a, b) / mag(a)) * mag(b));

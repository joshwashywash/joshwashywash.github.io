import add from './add';
import createScale from './createScale';
import type { Vec3 } from './types';

export default (a: Vec3, b: Vec3): Vec3 => createScale(0.5)(add(a, b));

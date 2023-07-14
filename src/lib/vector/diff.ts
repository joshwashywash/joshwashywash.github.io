import add from './add';
import negate from './negate';
import type { Vec3 } from './types';

export default (a: Vec3, b: Vec3): Vec3 => add(a, negate(b));

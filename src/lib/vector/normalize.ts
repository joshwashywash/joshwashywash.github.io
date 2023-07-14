import createScale from './createScale';
import mag from './mag';
import type { Vec3 } from './types';

export default (v: Vec3): Vec3 => createScale(1 / mag(v))(v);

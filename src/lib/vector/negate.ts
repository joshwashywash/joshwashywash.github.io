import createScale from './createScale';
import type { Vec3 } from './types';

export default (v: Vec3): Vec3 => createScale(-1)(v);

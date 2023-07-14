import type { Vec3 } from './types';

export default (s: number) =>
	(v: Vec3): Vec3 =>
		[s * v[0], s * v[1], s * v[2]];

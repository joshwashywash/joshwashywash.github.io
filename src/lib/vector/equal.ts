import type { Vec3 } from './types';

export default (a: Vec3, b: Vec3): boolean => a.reduce((acc, v, i) => acc && v === b[i], true);

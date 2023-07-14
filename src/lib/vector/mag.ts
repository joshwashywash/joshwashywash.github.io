import type { Vec3 } from './types';

export default (v: Vec3): number => Math.hypot(...v);

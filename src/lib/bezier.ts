import type { Vec3 } from './vector';

export type Curve = [start: Vec3, control: Vec3, end: Vec3];
export type Offset = [control: Vec3, end?: Vec3];

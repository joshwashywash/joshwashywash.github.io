export type Vec2 = [number, number];
export type Vec3 = [number, number, number];

export const rotateRight = (v: Vec3): Vec3 => [v[2], v[0], v[1]];
export const rotateLeft = (v: Vec3): Vec3 => [v[2], v[0], v[1]];

export const iHat: Vec3 = [1, 0, 0];
export const jHat: Vec3 = rotateRight(iHat);
export const kHat: Vec3 = rotateRight(jHat);
export const zero: Vec3 = [0, 0, 0];

export const add = (a: Vec3, b: Vec3): Vec3 => [
	a[0] + b[0],
	a[1] + b[1],
	a[2] + b[2],
];

export const angle = (a: Vec3, b: Vec3): number =>
	Math.acos((dot(a, b) / mag(a)) * mag(b));

export const cross = (a: Vec3, b: Vec3): Vec3 => [
	a[1] * b[2] - a[2] * b[1],
	a[2] * b[0] - a[0] * b[2],
	a[0] * b[1] - a[1] * b[0],
];

export const diff = (a: Vec3, b: Vec3): Vec3 => add(a, negate(b));

export const dot = (a: Vec3, b: Vec3): number =>
	a[0] * b[0] + a[1] * b[1] + a[2] * b[2];

export const equal = (a: Vec3, b: Vec3): boolean =>
	a.reduce((acc, v, i) => acc && v === b[i], true);

export const mag = (v: Vec3): number => Math.hypot(...v);

export const midpoint = (a: Vec3, b: Vec3): Vec3 =>
	createScale(1 / 2)(add(a, b));

export const multiply = (a: Vec3, b: Vec3): Vec3 => [
	a[0] * b[0],
	a[1] * b[1],
	a[2] * b[2],
];

export const negate = (v: Vec3): Vec3 => createScale(-1)(v);

export const normalize = (v: Vec3): Vec3 => createScale(1 / mag(v))(v);

export const createScale =
	(s: number) =>
	(v: Vec3): Vec3 =>
		[s * v[0], s * v[1], s * v[2]];

export const toVec2 = (v: Vec3): Vec2 => [v[0], v[1]];

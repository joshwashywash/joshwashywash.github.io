import { rotate } from './functions';
export type Vector = number[];

export const iHat: Vector = [1, 0, 0];
export const jHat: Vector = rotate(iHat);
export const kHat: Vector = rotate(jHat);

export const add = (as: Vector, bs: Vector): Vector =>
	as.map((a, i) => a + bs[i]);

export const cross = (as: Vector, bs: Vector): Vector => {
	const [a1, a2, a3] = as;
	const [b1, b2, b3] = bs;
	return [a2 * b3 - a3 * b2, a3 * b1 - a1 * b3, a1 * b2 - a2 * b1];
};

export const dot = (as: Vector, bs: Vector): number =>
	as.map((_, i) => as[i] * bs[i]).reduce((m, n) => m + n);

const mag = (v: Vector): number => Math.hypot(...v);

export const negate = (vs: Vector): Vector => scale(-1, vs);

export const normalize = (vs: Vector): Vector => scale(1 / mag(vs), vs);

export const scale = (s: number, vs: Vector): Vector => vs.map((v) => s * v);

export const sub = (as: Vector, bs: Vector): Vector => add(as, negate(bs));

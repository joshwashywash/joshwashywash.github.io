import { add, negate, dot, createScale, cross, type Vec3 } from './vector';

export type Quaternion = {
	scalar: number;
	vector: Vec3;
};

export const conjugate = (q: Quaternion): Quaternion => {
	const { scalar, vector } = q;
	return {
		scalar,
		vector: negate(vector),
	};
};

export const createRotation = (unit: Vec3, theta: number): Quaternion => {
	const r = Math.sin(theta / 2);
	const [xHat, yHat, zHat] = unit;
	return {
		scalar: Math.cos(theta / 2),
		vector: [xHat * r, yHat * r, zHat * r],
	};
};

export const multiply = (r: Quaternion, s: Quaternion): Quaternion => {
	const { scalar: rs, vector: rv } = r;
	const { scalar: ss, vector: sv } = s;
	return {
		scalar: rs * ss - dot(rv, sv),
		vector: [createScale(ss)(rv), createScale(rs)(sv), cross(rv, sv)].reduce(
			(acc, curr) => add(acc, curr)
		),
	};
};

export const fromVector = (v: Vec3): Quaternion => {
	return {
		scalar: 0,
		vector: v,
	};
};

export const toVector = (q: Quaternion): Vec3 => q.vector;

export const rotate = (q: Quaternion, p: Quaternion): Quaternion =>
	multiply(multiply(conjugate(q), p), q);

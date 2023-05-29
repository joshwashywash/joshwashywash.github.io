import { add, negate, dot, createScale, cross, type Vec3 } from './vector';

export type Quaternion = {
	scalar: number;
	vector: Vec3;
};

export const conjugate = (q: Quaternion): Quaternion => {
	return {
		...q,
		vector: negate(q.vector),
	};
};

export const createRotation = (unit: Vec3, theta: number): Quaternion => {
	return {
		scalar: Math.cos(theta / 2),
		vector: createScale(Math.sin(theta / 2))(unit),
	};
};

export const multiply = (r: Quaternion, s: Quaternion): Quaternion => {
	return {
		scalar: r.scalar * s.scalar - dot(r.vector, s.vector),
		vector: [
			createScale(s.scalar)(r.vector),
			createScale(r.scalar)(s.vector),
			cross(r.vector, s.vector),
		].reduce((acc, curr) => add(acc, curr)),
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

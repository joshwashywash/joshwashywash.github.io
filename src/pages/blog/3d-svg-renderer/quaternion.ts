import { add, dot, cross, negate, scale, type Vector } from './vector';

import type { Point } from './point';

export type Quaternion = {
	scalar: number;
	vector: Vector;
};

const conjugateQuaternion = (q: Quaternion): Quaternion => {
	const { scalar, vector } = q;
	return {
		scalar,
		vector: negate(vector),
	};
};

export const createRotationQuaternion = (
	unit: Vector,
	theta: number
): Quaternion => {
	const r = Math.sin(theta / 2);
	const [xHat, yHat, zHat] = unit;
	return {
		scalar: Math.cos(theta / 2),
		vector: [xHat * r, yHat * r, zHat * r],
	};
};

export const multiplyQuaternions = (
	r: Quaternion,
	s: Quaternion
): Quaternion => {
	const { scalar: rs, vector: rv } = r;
	const { scalar: ss, vector: sv } = s;
	return {
		scalar: rs * ss - dot(rv, sv),
		vector: [scale(ss, rv), scale(rs, sv), cross(rv, sv)].reduce((acc, curr) =>
			add(acc, curr)
		),
	};
};

export const pointToQuaternion = (p: Point): Quaternion => {
	return {
		scalar: 0,
		vector: p,
	};
};

export const quaternionToPoint = (q: Quaternion): Point => q.vector;

export const rotateByQuaternion = (q: Quaternion, p: Quaternion): Quaternion =>
	multiplyQuaternions(multiplyQuaternions(conjugateQuaternion(q), p), q);

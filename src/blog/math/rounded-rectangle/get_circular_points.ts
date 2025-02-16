import type { Point } from "./types";

export const get_circular_points = ({
	point_count = 32,
	radius = 1,
} = {}): Point[] => {
	const division = (2 * Math.PI) / point_count;

	const points: Point[] = [];

	for (let i = 0; i < point_count; i += 1) {
		const a = division * i;

		const x = radius * Math.cos(a);
		const y = radius * Math.sin(a);

		const point: Point = {
			x,
			y,
		};

		points.push(point);
	}

	return points;
};

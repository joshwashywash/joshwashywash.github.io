import type { Point } from "./types";

export const get_rounded_rectangle_points = ({
	point_count = 32,
	inner_width = 1,
	inner_height = 1,
	corner_radius = 1,
} = {}): Point[] => {
	const division = (2 * Math.PI) / point_count;

	const half_inner_width = 0.5 * inner_width;
	const half_inner_height = 0.5 * inner_height;

	const points: Point[] = [];

	for (let i = 0; i < point_count; i += 1) {
		const a = division * i;

		let x = corner_radius * Math.cos(a);
		x += Math.sign(x) * half_inner_width;

		let y = corner_radius * Math.sin(a);
		y += Math.sign(y) * half_inner_height;

		const point: Point = {
			x,
			y,
		};

		points.push(point);
	}

	return points;
};

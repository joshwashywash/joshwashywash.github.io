import type { Point } from "./types";

export default (points: Point[]): string => {
	const segments: string[] = [];
	for (const point of points) {
		segments.push(`${point.x} ${point.y}`);
	}
	return "M" + segments.join(" ");
};

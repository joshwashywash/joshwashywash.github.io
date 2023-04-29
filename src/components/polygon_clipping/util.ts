import type { Action } from 'svelte/action';
import type { Vec2 } from '../../lib/vector';

export const clip = (clipper: Vec2[]) => {
	const { length: clipperLength } = clipper;
	return (subject: Vec2[]): Vec2[] => {
		let output = [...subject];
		for (let i = 0; i < clipperLength; i += 1) {
			const [edgeStartX, edgeStartY] = clipper[i];
			const [edgeEndX, edgeEndY] = clipper[(i + 1) % clipperLength];
			const inter = intersection(edgeStartX, edgeStartY, edgeEndX, edgeEndY);
			const r = right(edgeStartX, edgeStartY, edgeEndX, edgeEndY);
			const input = [...output];
			output = [];
			for (let j = 0; j < input.length; j += 1) {
				const [ax, ay] = input[j];
				const [bx, by] = input[(j + 1) % input.length];
				if (r(bx, by)) {
					if (!r(ax, ay)) {
						const c = inter(ax, ay, bx, by);
						if (c) {
							output.push(c);
						}
					}
					output.push([bx, by]);
				} else if (r(ax, ay)) {
					const c = inter(ax, ay, bx, by);
					if (c) {
						output.push(c);
					}
				}
			}
		}
		return output;
	};
};

/*
 * 0 <= t <= 1
 */
const lerp = (a: number, b: number) => (t: number) => a + (b - a) * t;

export const contains = (polygon: Vec2[]) => {
	const { length } = polygon;
	return (cx: number, cy: number): boolean => {
		for (let i = 0; i < length; i += 1) {
			const [ax, ay] = polygon[i];
			const [bx, by] = polygon[(i + 1) % length];
			if (!right(ax, ay, bx, by)(cx, cy)) {
				return false;
			}
		}
		return true;
	};
};

export const intersection = (
	ax: number,
	ay: number,
	bx: number,
	by: number,
	segment = false
) => {
	const rx = bx - ax;
	const ry = by - ay;
	return (cx: number, cy: number, dx: number, dy: number): Vec2 | null => {
		const sx = dx - cx;
		const sy = dy - cy;

		const denominator = sy * rx - ry * sx;

		if (denominator === 0) {
			return null;
		}

		const t = (sy * (cx - ax) - sx * (cy - ay)) / denominator;
		const u = (ry * (cx - ax) - rx * (cy - ay)) / denominator;

		if (segment && !(0 <= t && t <= 1 && 0 <= u && u <= 1)) {
			return null;
		}
		return [lerp(ax, bx)(t), lerp(ay, by)(t)];
	};
};

export const lineIntersections = (polygon: Vec2[]) => {
	const { length } = polygon;
	return (x1: number, y1: number, x2: number, y2: number): Vec2[] => {
		const intersections: Vec2[] = [];
		const ins = intersection(x1, y1, x2, y2, true);
		for (let i = 0; i < length; i += 1) {
			const [cx, cy] = polygon[i];
			const [dx, dy] = polygon[(i + 1) % length];
			const hit = ins(cx, cy, dx, dy);
			if (hit) {
				intersections.push(hit);
			}
		}
		return intersections;
	};
};

export const translatable: Action<
	SVGElement,
	{ offset: { x: number; y: number } },
	{ 'on:translate': (e: CustomEvent<{ x: number; y: number }>) => void }
> = (element, options = { offset: { x: 0, y: 0 } }) => {
	const svg = element.ownerSVGElement;
	if (svg) {
		let downX: number | undefined = undefined;
		let downY: number | undefined = undefined;
		let tx = 0;
		let ty = 0;
		let { offset } = options;
		const { width: vbWidth, height: vbHeight } = svg.viewBox.baseVal;
		const onPointerMove = (e: PointerEvent) => {
			if (downX !== undefined && downY !== undefined) {
				const { width, height } = svg.getBoundingClientRect();
				tx = ((e.x - downX) / width) * vbWidth + offset.x;
				ty = ((e.y - downY) / height) * vbHeight + offset.y;
				element.dispatchEvent(
					new CustomEvent('translate', {
						detail: {
							x: tx,
							y: ty,
						},
					})
				);
			}
		};

		const onPointerUp = () => {
			downX = undefined;
			downY = undefined;
			offset.x = tx;
			offset.y = ty;
			svg.removeEventListener('pointermove', onPointerMove);
		};

		const onPointerDown = (e: PointerEvent) => {
			downX = e.x;
			downY = e.y;
			svg.addEventListener('pointermove', onPointerMove);
			svg.addEventListener('pointerup', onPointerUp, { once: true });
		};

		const onTouchStart = (e: TouchEvent) => {
			e.preventDefault();
		};

		element.addEventListener('pointerdown', onPointerDown);
		element.addEventListener('touchstart', onTouchStart);

		return {
			destroy() {
				element.removeEventListener('pointerdown', onPointerDown);
				element.removeEventListener('touchstart', onTouchStart);
			},
		};
	}
};

export const right =
	(ax: number, ay: number, bx: number, by: number) =>
	(cx: number, cy: number): boolean =>
		(cy - ay) * (bx - ax) > (by - ay) * (cx - ax);

import type { Action } from 'svelte/action';
import type { Vec2 } from '../../lib/vector';

/*
 * 0 <= t <= 1
 */
const lerp = (a: number, b: number) => (t: number) => a + (b - a) * t;

export const contains = (polygon: Vec2[]) => {
	const { length } = polygon;
	return (cx: number, cy: number): boolean => {
		const r = right(cx, cy);
		for (let i = 0; i < length; i += 1) {
			const [ax, ay] = polygon[i];
			const [bx, by] = polygon[(i + 1) % length];
			if (!r(ax, ay, bx, by)) {
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
	by: number
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

		if (0 <= t && t <= 1 && 0 <= u && u <= 1) {
			return [lerp(ax, bx)(t), lerp(ay, by)(t)];
		}

		return null;
	};
};

export const lineIntersections = (polygon: Vec2[]) => {
	const { length } = polygon;
	return (x1: number, y1: number, x2: number, y2: number): Vec2[] => {
		const intersections: Vec2[] = [];
		const ins = intersection(x1, y1, x2, y2);
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
	(cx: number, cy: number) =>
	(ax: number, ay: number, bx: number, by: number): boolean =>
		(cy - ay) * (bx - ax) > (by - ay) * (cx - ax);

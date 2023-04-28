import type { Action } from 'svelte/action';
import type { Vec2 } from '../../lib/vector';

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
			if (!right(ax, ay, bx, by, cx, cy)) {
				return false;
			}
		}
		return true;
	};
};

export const intersection = (a: Vec2, b: Vec2) => {
	const [ax, ay] = a;
	const [bx, by] = b;
	const rx = bx - ax;
	const ry = by - ay;
	return (c: Vec2, d: Vec2): Vec2 | null => {
		const [cx, cy] = c;
		const [dx, dy] = d;
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
	return (p1: Vec2, p2: Vec2): Vec2[] => {
		const intersections: Vec2[] = [];
		const ins = intersection(p1, p2);
		for (let i = 0; i < length; i += 1) {
			const c = polygon[i];
			const d = polygon[(i + 1) % length];
			const hit = ins(c, d);
			if (hit) {
				intersections.push(hit);
			}
		}
		return intersections;
	};
};

export const translatable: Action<
	SVGElement,
	{offsetX: number, offsetY: number},
	{ 'on:translate': (e: CustomEvent<{ x: number; y: number }>) => void }
> = (element, options = {offsetX: 0, offsetY:0}) => {
	const svg = element.ownerSVGElement;
	if (svg) {
		let downX: number | undefined = undefined;
		let downY: number | undefined = undefined;
		let tx = 0;
		let ty = 0;
		const { width: vbWidth, height: vbHeight } = svg.viewBox.baseVal;
		const onPointerMove = (e: PointerEvent) => {
			if (downX !== undefined && downY !== undefined) {
				const { width, height } = svg.getBoundingClientRect();
				tx = ((e.x - downX) / width) * vbWidth + options.offsetX;
				ty = ((e.y - downY) / height) * vbHeight + options.offsetY;
				element.dispatchEvent(
					new CustomEvent('translate', {
						detail: {
							x: tx,
							y: ty
						},
					})
				);
			}
		};

		const onPointerUp = () => {
			downX = undefined;
			downY = undefined;
			options.offsetX = tx
			options.offsetY = ty
			svg.removeEventListener('pointermove', onPointerMove);
		};

		const onPointerDown = (e: PointerEvent) => {
			downX = e.x;
			downY = e.y;
			svg.addEventListener('pointermove', onPointerMove);
			svg.addEventListener('pointerup', onPointerUp, {once: true});
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

export const right = (
	ax: number,
	ay: number,
	bx: number,
	by: number,
	cx: number,
	cy: number
): boolean => (cy - ay) * (bx - ax) > (by - ay) * (cx - ax);

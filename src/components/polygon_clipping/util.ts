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

export const moveable: Action<
	SVGElement,
	{},
	{ 'on:move': (e: CustomEvent<{ x: number; y: number }>) => void }
> = (element) => {
	const svg = element.ownerSVGElement;
	if (svg) {
		let down = false;
		const {
			baseVal: { width: viewBoxWidth, height: viewBoxHeight, x, y },
		} = svg.viewBox;
		const onPointerMove = (e: PointerEvent) => {
			const { width, height } = svg.getBoundingClientRect();
			if (down) {
				element.dispatchEvent(
					new CustomEvent('move', {
						detail: {
							x: (e.offsetX / width) * viewBoxWidth + x,
							y: (e.offsetY / height) * viewBoxHeight + y,
						},
					})
				);
			}
		};

		const onPointerUp = () => {
			down = false;
		};

		const onPointerDown = () => {
			down = true;
		};

		const onTouchStart = (e: TouchEvent) => {
			e.preventDefault();
		};

		element.addEventListener('pointerdown', onPointerDown);
		element.addEventListener('touchstart', onTouchStart);
		svg.addEventListener('pointerup', onPointerUp);
		svg.addEventListener('pointermove', onPointerMove);
		return {
			destroy() {
				element.removeEventListener('pointerdown', onPointerDown);
				element.removeEventListener('touchstart', onTouchStart);
				svg.removeEventListener('pointerup', onPointerUp);
				svg.removeEventListener('pointermove', onPointerMove);
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

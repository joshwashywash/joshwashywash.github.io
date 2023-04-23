import type { Action } from 'svelte/action';
import type { Vec2 } from '../../lib/vector';

type Segment = [Vec2, Vec2];

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

export const intersection = (ab: Segment) => {
	const [[ax, ay], [bx, by]] = ab;
	return (cd: Segment): Vec2 | null => {
		const [[cx, cy], [dx, dy]] = cd;
		const denominator = (dy - cy) * (bx - ax) - (dx - cx) * (by - ay);

		if (denominator === 0) {
			return null;
		}

		const t = ((dx - cx) * (ay - cy) - (dy - cy) * (ax - cx)) / denominator;
		const u = ((cy - ay) * (ax - bx) - (cx - ax) * (ay - by)) / denominator;

		if (0 <= t && t <= 1 && 0 <= u && u <= 1) {
			// remove this check if working with infinite lines instead of segments
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
		element.addEventListener('pointerdown', onPointerDown);
		svg.addEventListener('pointerup', onPointerUp);
		svg.addEventListener('pointermove', onPointerMove);
		return {
			destroy() {
				element.removeEventListener('pointerdown', onPointerDown);
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

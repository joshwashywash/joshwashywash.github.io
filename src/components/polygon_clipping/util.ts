import type { Action } from 'svelte/action';
import type { Vec2 } from '../../lib/vector';

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

export const multiply =
	(b: Vec2) =>
		(a: Vec2): Vec2 =>
			[a[0] * b[0], a[1] * b[1]];

export const right = (
	ax: number,
	ay: number,
	bx: number,
	by: number,
	cx: number,
	cy: number
): boolean => (cy - ay) * (bx - ax) - (by - ay) * (cx - ax) > 0;

import type { Action } from 'svelte/action';

const hoverableStroke: Action<SVGElement, { color: string; width: string }> = (
	element,
	options = { color: 'white', width: '1%' }
) => {

	const pointerEnter = () => {
		element.style.stroke = options.color;
		element.style.strokeWidth = options.width;
	};

	const pointerOut = () => {
		element.style.stroke = 'none';
		element.style.strokeWidth = '0';
	};

	pointerOut();

	element.addEventListener('pointerenter', pointerEnter);
	element.addEventListener('pointerout', pointerOut);
	return {
		destroy() {
			element.removeEventListener('pointerenter', pointerEnter);
			element.removeEventListener('pointerout', pointerOut);
		},
	};
};

export default hoverableStroke;

import type { Action } from 'svelte/action';
import type {
	AnimationOptionsWithOverrides,
	InViewOptions,
	MotionKeyframesDefinition,
	ViewChangeHandler,
} from 'motion';
import { animate, inView } from 'motion';

export type AnimActionParams = {
	keyframes: MotionKeyframesDefinition;
	options?: AnimationOptionsWithOverrides;
};

export const animation = (node: Element, params: AnimActionParams) => {
	const { keyframes, options } = params;
	animate(node, keyframes, options).finished.then(() => {
		node.dispatchEvent(new CustomEvent('animfinished'));
	});
};

export const listenerAnimation = (
	node: Element,
	params: AnimActionParams & { type: string }
) => {
	const { keyframes, options, type } = params;
	const listener = () => {
		animation(node, { keyframes, options });
	};
	node.addEventListener(type, listener);
	return {
		destroy() {
			node.removeEventListener(type, listener);
		},
	};
};

export const inViewAnimation: Action = (
	node,
	params: { onStart: ViewChangeHandler; options?: InViewOptions }
) => {
	const { onStart, options } = params;
	inView(node, onStart, options);
};

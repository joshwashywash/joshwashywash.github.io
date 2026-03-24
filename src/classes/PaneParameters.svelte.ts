import type { Bindable, BindingParams } from "@tweakpane/core";
import { createSubscriber } from "svelte/reactivity";
import { Pane } from "tweakpane";
import type { PaneConfig } from "tweakpane/dist/types/pane/pane-config";

export class PaneParameters<O extends Bindable> {
	#object;
	#subscribe;
	#update: (() => void) | null = null;
	#options;
	constructor(
		object: O,
		options: Partial<Record<keyof O, BindingParams>> = {},
	) {
		this.#object = object;
		this.#options = options;

		this.#subscribe = createSubscriber((update) => {
			this.#update = update;
			return () => {
				this.#update = null;
			};
		});
	}

	get options() {
		return this.#options;
	}

	get object() {
		return this.#object;
	}

	get current() {
		this.#subscribe();
		return this.#object;
	}

	update() {
		this.#update?.();
	}
}

export const createPane = <T extends Bindable>(
	paneParameters: PaneParameters<T>,
	config: PaneConfig = {},
) => {
	const pane = new Pane(config);

	for (const prop in paneParameters.object) {
		pane.addBinding(paneParameters.object, prop, paneParameters.options[prop]);
	}

	pane.on("change", () => {
		paneParameters.update();
	});

	return () => {
		pane.dispose();
	};
};

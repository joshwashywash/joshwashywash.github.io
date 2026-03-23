import type { Bindable, BindingParams } from "@tweakpane/core";
import { createSubscriber } from "svelte/reactivity";
import { Pane } from "tweakpane";
import type { PaneConfig } from "tweakpane/dist/types/pane/pane-config";

export default class<Params extends Bindable> {
	#params;
	#subscribe;
	#update: (() => void) | null = null;
	#options;
	constructor(
		params: Params,
		options: Partial<Record<keyof Params, BindingParams>> = {},
	) {
		this.#params = params;
		this.#options = options;

		this.#subscribe = createSubscriber((update) => {
			this.#update = update;
			return () => {
				this.#update = null;
			};
		});
	}
	createPane(config: PaneConfig) {
		const pane = new Pane(config);
		for (const prop in this.#params) {
			pane.addBinding(this.#params, prop, this.#options[prop]);
		}
		pane.on("change", () => {
			this.#update?.();
		});
		return () => {
			pane.dispose();
		};
	}
	get current() {
		this.#subscribe();
		return this.#params;
	}
}

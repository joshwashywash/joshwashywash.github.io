<script lang="ts">
	import { Element, Pane, Slider, ThemeUtils } from "svelte-tweakpane-ui";
	import { Tween } from "svelte/motion";
	import get_points from "./get_points";
	import create_line_path from "../create_line_path";

	let {
		point_count = 17,
		point_count_max = 32,
		point_count_min = 3,
		point_count_step = 1,
		radius = 50,
		radius_max = 100,
		radius_min = 0,
		radius_step = 1,
	} = $props();

	const tween_radius = Tween.of(() => radius);
	const tween_point_count = Tween.of(() => point_count);

	const diameter = $derived(2 * radius_max);
	const viewbox_min = $derived(-1 * radius_max);
	const viewBox = $derived(
		`${viewbox_min} ${viewbox_min} ${diameter} ${diameter}`,
	);

	const points = $derived(
		get_points(tween_point_count.current, tween_radius.current),
	);

	const d = $derived(create_line_path(points));
</script>

<Pane
	position="inline"
	theme={ThemeUtils.presets.iceberg}
	title="circle"
>
	<Slider
		label="radius"
		bind:value={radius}
		min={radius_min}
		max={radius_max}
		step={radius_step}
	/>
	<Slider
		label="point count"
		bind:value={point_count}
		min={point_count_min}
		max={point_count_max}
		step={point_count_step}
	/>
	<Element>
		<svg
			class="dark-bg-neutral-900 fill-neutral-100 text-neutral-900 dark:text-neutral-100"
			xmlns="http://www.w3.org/2000/svg"
			{viewBox}
		>
			<path {d} />
		</svg>
	</Element>
</Pane>

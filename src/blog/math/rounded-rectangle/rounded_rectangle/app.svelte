<script lang="ts">
	import { Element, Pane, Slider, ThemeUtils } from "svelte-tweakpane-ui";
	import { Tween } from "svelte/motion";
	import get_points from "./get_points";
	import create_line_path from "../create_line_path";

	let {
		corner_radius = 25,
		corner_radius_max = 50,
		corner_radius_min = 1,
		corner_radius_step = 1,
		inner_height = 50,
		inner_height_max = 100,
		inner_height_min = 0,
		inner_height_step = 1,
		inner_width = 50,
		inner_width_max = 100,
		inner_width_min = 0,
		inner_width_step = 1,
		point_count = 32,
		point_count_max = 50,
		point_count_min = 3,
		point_count_step = 1,
	} = $props();

	const tween_corner_radius = Tween.of(() => corner_radius);
	const tween_inner_height = Tween.of(() => inner_height);
	const tween_inner_width = Tween.of(() => inner_width);

	const corner_diameter = $derived(2 * tween_corner_radius.current);

	const viewbox_width = $derived(corner_diameter + inner_width_max);
	const viewbox_height = $derived(corner_diameter + inner_height_max);

	const viewbox_min_x = $derived(-1 * 0.5 * viewbox_width);
	const viewbox_min_y = $derived(-1 * 0.5 * viewbox_height);

	const viewBox = $derived(
		`${viewbox_min_x} ${viewbox_min_y} ${viewbox_width} ${viewbox_height}`,
	);

	const points = $derived(
		get_points(
			tween_corner_radius.current,
			tween_inner_width.current,
			tween_inner_height.current,
			point_count,
		),
	);

	const d = $derived(create_line_path(points));
</script>

<Pane
	position="inline"
	theme={ThemeUtils.presets.iceberg}
	title="rounded rectangle"
>
	<Slider
		bind:value={point_count}
		label="point count"
		min={point_count_min}
		max={point_count_max}
		step={point_count_step}
	/>
	<Slider
		bind:value={corner_radius}
		label="corner radius"
		min={corner_radius_min}
		max={corner_radius_max}
		step={corner_radius_step}
	/>
	<Slider
		bind:value={inner_width}
		label="inner width"
		min={inner_width_min}
		max={inner_width_max}
		step={inner_width_step}
	/>
	<Slider
		bind:value={inner_height}
		label="inner height"
		min={inner_height_min}
		max={inner_height_max}
		step={inner_height_step}
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

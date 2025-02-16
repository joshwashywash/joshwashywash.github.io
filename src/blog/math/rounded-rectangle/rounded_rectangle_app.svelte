<script lang="ts">
	import RoundedRectanglePath from "./rounded_rectangle_path.svelte";
	import { Pane, Slider } from "svelte-tweakpane-ui";
	import { Tween } from "svelte/motion";

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

	const view_box_width = $derived(corner_diameter + inner_width_max);
	const view_box_height = $derived(corner_diameter + inner_height_max);

	const half_viewbox_width = $derived(0.5 * view_box_width);
	const half_viewbox_height = $derived(0.5 * view_box_height);

	const viewBox = $derived(`0 0 ${view_box_width} ${view_box_height}`);

	const transform = $derived(
		`translate(${half_viewbox_width}, ${half_viewbox_height})`,
	);
</script>

<Pane
	position="inline"
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
</Pane>

<svg
	class="fill-current"
	xmlns="http://www.w3.org/2000/svg"
	{viewBox}
>
	<g {transform}>
		<RoundedRectanglePath
			corner_radius={tween_corner_radius.current}
			inner_height={tween_inner_height.current}
			inner_width={tween_inner_width.current}
			{point_count}
		/>
	</g>
</svg>

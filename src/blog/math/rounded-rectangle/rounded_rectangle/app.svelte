<script lang="ts">
	import PaneParameters from "$lib/classes/PaneParameters.svelte";
	import PaneContainer from "$lib/components/PaneContainer.svelte";
	import get_points from "./get_points";

	const inner_width_max = 100;
	const inner_height_max = 100;
	const params = new PaneParameters(
		{
			corner_radius: 25,
			inner_height: 50,
			inner_width: 50,
			point_count: 17,
		},
		{
			corner_radius: {
				min: 3,
				max: 50,
				step: 1,
			},
			inner_height: {
				min: 0,
				max: inner_height_max,
				step: 1,
			},
			inner_width: {
				min: 0,
				max: inner_width_max,
				step: 1,
			},
			point_count: {
				min: 3,
				max: 32,
				step: 1,
			},
		},
	);

	const corner_diameter = 2 * params.current.corner_radius;

	const viewbox_width = corner_diameter + inner_width_max;
	const viewbox_height = corner_diameter + inner_height_max;

	const viewbox_min_x = -1 * 0.5 * viewbox_width;
	const viewbox_min_y = -1 * 0.5 * viewbox_height;

	const viewBox = `${viewbox_min_x} ${viewbox_min_y} ${viewbox_width} ${viewbox_height}`;

	const points = $derived(get_points(params.current));

	const d = $derived("M" + points.join(" "));
</script>

<div class="relative">
	<PaneContainer
		class="absolute top-2 right-2"
		{@attach (container) => {
			return params.createPane({
				container,
				title: "rectangle",
			});
		}}
	/>
	<svg
		class="dark-bg-neutral-900 fill-neutral-100 text-neutral-900 dark:text-neutral-100"
		xmlns="http://www.w3.org/2000/svg"
		{viewBox}
	>
		<path {d} />
	</svg>
</div>

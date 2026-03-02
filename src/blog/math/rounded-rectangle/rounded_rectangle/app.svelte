<script lang="ts">
	import get_points from "./get_points";

	let {
		corner_radius = 25,
		inner_height = 50,
		inner_height_max = 100,
		inner_width = 50,
		inner_width_max = 100,
		point_count = 32,
	} = $props();

	const corner_diameter = $derived(2 * corner_radius);

	const viewbox_width = $derived(corner_diameter + inner_width_max);
	const viewbox_height = $derived(corner_diameter + inner_height_max);

	const viewbox_min_x = $derived(-1 * 0.5 * viewbox_width);
	const viewbox_min_y = $derived(-1 * 0.5 * viewbox_height);

	const viewBox = $derived(
		`${viewbox_min_x} ${viewbox_min_y} ${viewbox_width} ${viewbox_height}`,
	);

	const points = $derived(
		get_points(corner_radius, inner_width, inner_height, point_count),
	);

	const d = $derived("M" + points.map((xy) => `${xy}`).join(" "));
</script>

<fieldset class="grid">
	<label>
		point count
		<input
			bind:value={point_count}
			type="range"
			min={3}
			max={50}
			step={1}
		/>
	</label>
	<label>
		corner radius
		<input
			bind:value={corner_radius}
			type="range"
			min={3}
			max={50}
			step={1}
		/>
	</label>
	<label>
		inner height
		<input
			bind:value={inner_height}
			type="range"
			min={0}
			max={inner_height_max}
			step={1}
		/>
	</label>
	<label>
		inner width
		<input
			bind:value={inner_width}
			type="range"
			min={0}
			max={inner_width_max}
			step={1}
		/>
	</label>
</fieldset>

<svg
	class="dark-bg-neutral-900 fill-neutral-100 text-neutral-900 dark:text-neutral-100"
	xmlns="http://www.w3.org/2000/svg"
	{viewBox}
>
	<path {d} />
</svg>

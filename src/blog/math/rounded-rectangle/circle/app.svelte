<script lang="ts">
	import get_points from "./get_points";

	type Props = {
		point_count: number;
		radius: number;
		radius_max: number;
	};

	let {
		point_count = 17,
		radius = 50,
		radius_max = 100,
	}: Partial<Props> = $props();

	const diameter = $derived(2 * radius_max);
	const viewbox_min = $derived(-1 * radius_max);
	const viewBox = $derived(
		`${viewbox_min} ${viewbox_min} ${diameter} ${diameter}`,
	);

	const points = $derived(get_points({ point_count, radius }));

	const d = $derived("M" + points.join(" "));
</script>

<fieldset class="grid">
	<label>
		radius
		<input
			type="range"
			bind:value={radius}
			min={0}
			max={radius_max}
			step={1}
		/>
	</label>
	<label>
		point count
		<input
			type="range"
			bind:value={point_count}
			min={3}
			max={32}
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

<script lang="ts">
	import PaneParameters from "$lib/classes/PaneParameters.svelte";
	import get_points from "./get_points";
	import PaneContainer from "$lib/components/PaneContainer.svelte";

	const radius_max = 100;
	const diameter = 2 * radius_max;
	const viewbox_min = -1 * radius_max;
	const viewBox = `${viewbox_min} ${viewbox_min} ${diameter} ${diameter}`;

	const params = new PaneParameters(
		{
			point_count: 17,
			radius: 0.5 * radius_max,
		},
		{
			point_count: {
				min: 3,
				max: 32,
				step: 1,
			},
			radius: {
				min: 0,
				max: radius_max,
				step: 1,
			},
		},
	);

	const points = $derived(get_points(params.current));
	const d = $derived("M" + points.join(" "));
</script>

<div class="relative">
	<PaneContainer
		class="absolute top-2 right-2"
		{@attach (container) => {
			return params.createPane({
				container,
				title: "circle",
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

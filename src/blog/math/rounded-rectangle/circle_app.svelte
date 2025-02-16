<script lang="ts">
	import CirclePath from "./circle_path.svelte";
	import { Pane, Slider } from "svelte-tweakpane-ui";
	import { Tween } from "svelte/motion";

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

	const tween = Tween.of(() => radius);

	const diameter = $derived(2 * radius_max);
	const left_top = $derived(-1 * radius_max);
	const viewBox = $derived(`${left_top} ${left_top} ${diameter} ${diameter}`);
</script>

<Pane
	position="inline"
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
</Pane>

<svg
	class="fill-current"
	xmlns="http://www.w3.org/2000/svg"
	{viewBox}
>
	<CirclePath
		{point_count}
		radius={tween.current}
	/>
</svg>

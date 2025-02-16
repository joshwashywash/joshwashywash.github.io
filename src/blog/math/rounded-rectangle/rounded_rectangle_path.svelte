<script lang="ts">
	import type { SVGAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { create_line_path } from "./create_line_path";
	import { get_rounded_rectangle_points } from "./get_rounded_rectangle_points";

	let {
		children,
		corner_radius = 50,
		inner_height = 100,
		inner_width = 100,
		point_count = 32,
		...rest_props
	}: {
		children?: Snippet;
		point_count?: number;
		corner_radius?: number;
		inner_width?: number;
		inner_height?: number;
	} & SVGAttributes<SVGPathElement> = $props();

	const points = $derived(
		get_rounded_rectangle_points({
			inner_height,
			inner_width,
			point_count,
			corner_radius,
		}),
	);

	const d = $derived(create_line_path(points));
</script>

<path
	{d}
	{...rest_props}
>
	{@render children?.()}
</path>

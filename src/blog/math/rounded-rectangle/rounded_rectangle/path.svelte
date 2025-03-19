<script lang="ts">
	import create_line_path from "../create_line_path";
	import get_points from "./get_points";
	import type { SVGAttributes } from "svelte/elements";

	let {
		children,
		corner_radius = 50,
		inner_height = 100,
		inner_width = 100,
		point_count = 32,
		...rest_props
	}: {
		point_count?: number;
		corner_radius?: number;
		inner_width?: number;
		inner_height?: number;
	} & Omit<SVGAttributes<SVGPathElement>, "d"> = $props();

	const points = $derived(
		get_points(corner_radius, inner_height, inner_width, point_count),
	);

	const d = $derived(create_line_path(points));
</script>

<path
	{d}
	{...rest_props}
>
	{@render children?.()}
</path>

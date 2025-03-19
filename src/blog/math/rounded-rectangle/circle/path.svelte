<script lang="ts">
	import create_line_path from "../create_line_path";
	import get_points from "./get_points";
	import type { SVGAttributes } from "svelte/elements";

	let {
		children,
		point_count = 32,
		radius = 0.5,
		...rest_props
	}: {
		point_count?: number;
		radius?: number;
	} & Omit<SVGAttributes<SVGPathElement>, "d"> = $props();

	const points = $derived(get_points(point_count, radius));

	const d = $derived(create_line_path(points));
</script>

<path
	{d}
	{...rest_props}
>
	{@render children?.()}
</path>

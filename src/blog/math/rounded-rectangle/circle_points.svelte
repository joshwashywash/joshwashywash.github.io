<script
	lang="ts"
	module
>
	export const default_colors: Quadruple<string> = [
		"red",
		"yellow",
		"green",
		"blue",
	];
</script>

<script lang="ts">
	import type { Point, Quadruple } from "./types";
	import type { SVGAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { get_circular_points } from "./get_circular_points";
	import { Tween } from "svelte/motion";

	let {
		children,
		colors = default_colors,
		point_count = 32,
		point_radius = 0.01,
		radius = 0.5,
		...restProps
	}: {
		children?: Snippet;
		colors?: Quadruple<string>;
		point_count?: number;
		point_radius?: number;
		radius?: number;
	} & SVGAttributes<SVGGElement> = $props();

	const radius_tween = Tween.of(() => radius);

	const points = $derived(
		get_circular_points({
			point_count,
			radius: radius_tween.current,
		}),
	);

	const groups = $derived.by(() => {
		const groups: Quadruple<Point[]> = [[], [], [], []];
		for (const point of points) {
			const sign_x = Math.sign(point.x);
			const sign_y = Math.sign(point.y);
			const index_y = (0.5 * (sign_y + 1)) | 0;
			const index_x = ((0.5 * (sign_x + 1)) | 0) ^ +(index_y < 1);

			const index = (index_y << 1) | index_x;
			groups[index]?.push(point);
		}
		return groups;
	});
</script>

<g {...restProps}>
	{#each groups as group, i}
		<g fill={colors[i]}>
			{#each group as { x, y }}
				<circle
					cx={x}
					cy={y}
					r={point_radius}
				/>
			{/each}
		</g>
	{/each}
	{@render children?.()}
</g>

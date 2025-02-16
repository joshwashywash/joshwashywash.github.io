<script
	lang="ts"
	module
>
	const terms: ListOptionsArray<string> = [
		"inner width",
		"outer width",
		"inner height",
		"outer height",
		"corner radius",
	] as const;
	type Term = (typeof terms)[number];
</script>

<script lang="ts">
	import type { ClassValue } from "svelte/elements";
	import type { ListOptionsArray } from "svelte-tweakpane-ui";
	import { List, Pane } from "svelte-tweakpane-ui";

	let {
		corner_radius = 10,
		inner_height = 200,
		inner_width = 150,
		line_stroke_dash = 1,
		active_stroke_class = "stroke-red-500",
	} = $props();

	let term = $state<Term>("inner width");

	const corner_diameter = $derived(2 * corner_radius);
	const outer_width = $derived(inner_width + corner_diameter);
	const outer_height = $derived(inner_height + corner_diameter);

	const viewBox = $derived(`0 0 ${outer_width} ${outer_height}`);

	const line_stroke_dash_array = $derived(
		`${line_stroke_dash} ${line_stroke_dash}`,
	);
	const line_stroke_dash_offset = $derived(0.5 * line_stroke_dash);

	const end_of_inner_height = $derived(corner_radius + inner_height);
	const end_of_inner_width = $derived(corner_radius + inner_width);
	const end_of_outer_height = $derived(corner_diameter + inner_height);
	const end_of_outer_width = $derived(corner_diameter + inner_width);

	const term_is_corner_radius = $derived(term === "corner radius");
	const term_is_inner_height = $derived(term === "inner height");
	const term_is_inner_width = $derived(term === "inner width");
	const term_is_outer_height = $derived(term === "outer height");
	const term_is_outer_width = $derived(term === "outer width");

	const term_is_corner_radius_or_outer_height = $derived(
		term_is_corner_radius || term_is_outer_height,
	);

	const class_term_is_corner_radius_or_outer_height = $derived<ClassValue>({
		[active_stroke_class]: term_is_corner_radius_or_outer_height,
	});

	const term_is_corner_radius_or_outer_width = $derived(
		term_is_corner_radius || term_is_outer_width,
	);

	const class_term_is_corner_radius_or_outer_width = $derived<ClassValue>({
		[active_stroke_class]: term_is_corner_radius_or_outer_width,
	});

	const term_is_inner_or_outer_width = $derived(
		term_is_inner_width || term_is_outer_width,
	);

	const class_term_is_inner_or_outer_width = $derived<ClassValue>({
		[active_stroke_class]: term_is_inner_or_outer_width,
	});

	const term_is_inner_or_outer_height = $derived(
		term_is_inner_height || term_is_outer_height,
	);

	const class_term_is_inner_or_outer_height = $derived<ClassValue>({
		[active_stroke_class]: term_is_inner_or_outer_height,
	});
</script>

<Pane
	title="terminology"
	position="inline"
>
	<List
		bind:value={term}
		options={terms}
		label="term"
	/>
</Pane>

<svg
	class="fill-current text-sm"
	xmlns="http://www.w3.org/2000/svg"
	{viewBox}
>
	<rect
		rx={corner_radius}
		ry={corner_radius}
		x={0}
		y={0}
		width={outer_width}
		height={outer_height}
	/>
	<g
		class="stroke-neutral-100 dark:stroke-neutral-900"
		stroke-dasharray={line_stroke_dash_array}
		stroke-dashoffset={line_stroke_dash_offset}
	>
		<g transform={`translate(${corner_radius}, 0)`}>
			<line
				class={class_term_is_corner_radius_or_outer_height}
				x1={0}
				y1={0}
				x2={0}
				y2={corner_radius}
			/>
			<line
				class={class_term_is_inner_or_outer_height}
				x1={0}
				y1={corner_radius}
				x2={0}
				y2={end_of_inner_height}
			/>
			<line
				class={class_term_is_corner_radius_or_outer_height}
				x1={0}
				y1={end_of_inner_height}
				x2={0}
				y2={end_of_outer_height}
			/>
		</g>
		<g transform={`translate(${end_of_inner_width}, 0)`}>
			<line
				class={class_term_is_corner_radius_or_outer_height}
				x1={0}
				y1={0}
				x2={0}
				y2={corner_radius}
			/>
			<line
				class={class_term_is_inner_or_outer_height}
				x1={0}
				y1={corner_radius}
				x2={0}
				y2={end_of_inner_height}
			/>
			<line
				class={class_term_is_corner_radius_or_outer_height}
				x1={0}
				y1={end_of_inner_height}
				x2={0}
				y2={end_of_outer_height}
			/>
		</g>
		<g transform={`translate(0, ${corner_radius})`}>
			<line
				class={class_term_is_corner_radius_or_outer_width}
				x1={0}
				y1={0}
				x2={corner_radius}
				y2={0}
			/>
			<line
				class={class_term_is_inner_or_outer_width}
				x1={corner_radius}
				y1={0}
				x2={end_of_inner_width}
				y2={0}
			/>
			<line
				class={class_term_is_corner_radius_or_outer_width}
				x1={end_of_inner_width}
				y1={0}
				x2={end_of_outer_width}
				y2={0}
			/>
		</g>
		<g transform={`translate(0, ${end_of_inner_height})`}>
			<line
				class={class_term_is_corner_radius_or_outer_width}
				x1={0}
				y1={0}
				x2={corner_radius}
				y2={0}
			/>
			<line
				class={class_term_is_inner_or_outer_width}
				x1={corner_radius}
				y1={0}
				x2={end_of_inner_width}
				y2={0}
			/>
			<line
				class={class_term_is_corner_radius_or_outer_width}
				x1={end_of_inner_width}
				y1={0}
				x2={end_of_outer_width}
				y2={0}
			/>
		</g>
	</g>
</svg>

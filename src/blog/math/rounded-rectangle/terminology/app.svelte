<script
	lang="ts"
	module
>
	type Term =
		| "inner width"
		| "outer width"
		| "inner height"
		| "outer height"
		| "corner radius";

	const terms: ListOptionsArray<Term> = [
		"inner width",
		"outer width",
		"inner height",
		"outer height",
		"corner radius",
	] as const;
</script>

<script lang="ts">
	import { Element, type ListOptionsArray } from "svelte-tweakpane-ui";
	import { List, Pane, ThemeUtils } from "svelte-tweakpane-ui";

	let {
		corner_radius = 10,
		inner_height = 200,
		inner_width = 150,
		line_stroke_dash = 1,
	} = $props();

	let term = $state<Term>("inner width");

	const end_of_inner_height = $derived(corner_radius + inner_height);
	const end_of_inner_width = $derived(corner_radius + inner_width);

	const outer_width = $derived(end_of_inner_width + corner_radius);
	const outer_height = $derived(end_of_inner_height + corner_radius);

	const viewbox_min = $derived(-1 * corner_radius);
	const viewbox_width = $derived(outer_width + 2 * corner_radius);
	const viewbox_height = $derived(outer_height + 2 * corner_radius);

	const viewBox = $derived(
		`${viewbox_min} ${viewbox_min} ${viewbox_width} ${viewbox_height}`,
	);

	const line_stroke_dash_array = $derived(
		`${line_stroke_dash} ${line_stroke_dash}`,
	);
	const line_stroke_dash_offset = $derived(0.5 * line_stroke_dash);

	const term_is_corner_radius = $derived(term === "corner radius");
	const term_is_inner_height = $derived(term === "inner height");
	const term_is_inner_width = $derived(term === "inner width");
	const term_is_outer_height = $derived(term === "outer height");
	const term_is_outer_width = $derived(term === "outer width");

	const term_is_corner_radius_or_outer_height = $derived(
		term_is_corner_radius || term_is_outer_height,
	);

	const term_is_corner_radius_or_outer_width = $derived(
		term_is_corner_radius || term_is_outer_width,
	);

	const term_is_inner_or_outer_width = $derived(
		term_is_inner_width || term_is_outer_width,
	);

	const term_is_inner_or_outer_height = $derived(
		term_is_inner_height || term_is_outer_height,
	);
</script>

<Pane
	position="inline"
	theme={ThemeUtils.presets.iceberg}
	title="terminology"
>
	<List
		bind:value={term}
		options={terms}
		label="term"
	/>
	<Element>
		<svg
			class="dark-bg-neutral-900 fill-neutral-100 text-neutral-900 dark:text-neutral-100"
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
					<g
						data-active={term_is_corner_radius_or_outer_height || null}
						class="data-active:stroke-rose-pine-gold"
					>
						<line
							x1={0}
							y1={0}
							x2={0}
							y2={corner_radius}
						/>
						<line
							x1={0}
							y1={end_of_inner_height}
							x2={0}
							y2={outer_height}
						/>
					</g>
					<line
						data-active={term_is_inner_or_outer_height || null}
						class="data-active:stroke-rose-pine-gold"
						x1={0}
						y1={corner_radius}
						x2={0}
						y2={end_of_inner_height}
					/>
				</g>
				<g transform={`translate(${end_of_inner_width}, 0)`}>
					<g
						data-active={term_is_corner_radius_or_outer_height || null}
						class="data-active:stroke-rose-pine-gold"
					>
						<line
							x1={0}
							y1={0}
							x2={0}
							y2={corner_radius}
						/>
						<line
							x1={0}
							y1={end_of_inner_height}
							x2={0}
							y2={outer_height}
						/>
					</g>
					<line
						data-active={term_is_inner_or_outer_height || null}
						class="data-active:stroke-rose-pine-gold"
						x1={0}
						y1={corner_radius}
						x2={0}
						y2={end_of_inner_height}
					/>
				</g>
				<g transform={`translate(0, ${corner_radius})`}>
					<g
						data-active={term_is_corner_radius_or_outer_width || null}
						class="data-active:stroke-rose-pine-gold"
					>
						<line
							x1={0}
							y1={0}
							x2={corner_radius}
							y2={0}
						/>
						<line
							x1={end_of_inner_width}
							y1={0}
							x2={outer_width}
							y2={0}
						/>
					</g>
					<line
						data-active={term_is_inner_or_outer_width || null}
						class="data-active:stroke-rose-pine-gold"
						x1={corner_radius}
						y1={0}
						x2={end_of_inner_width}
						y2={0}
					/>
				</g>
				<g transform={`translate(0, ${end_of_inner_height})`}>
					<g
						data-active={term_is_corner_radius_or_outer_width || null}
						class="data-active:stroke-rose-pine-gold"
					>
						<line
							x1={0}
							y1={0}
							x2={corner_radius}
							y2={0}
						/>
						<line
							x1={end_of_inner_width}
							y1={0}
							x2={outer_width}
							y2={0}
						/>
					</g>
					<line
						data-active={term_is_inner_or_outer_width || null}
						class="data-active:stroke-rose-pine-gold"
						x1={corner_radius}
						y1={0}
						x2={end_of_inner_width}
						y2={0}
					/>
				</g>
			</g>
		</svg>
	</Element>
</Pane>

<script lang="ts">
	import PaneParameters from "$lib/classes/PaneParameters.svelte";
	import PaneContainer from "$lib/components/PaneContainer.svelte";

	type Props = {
		corner_radius: number;
		inner_height: number;
		inner_width: number;
		line_stroke_dash: number;
	};
	let {
		corner_radius = 10,
		inner_height = 200,
		inner_width = 150,
		line_stroke_dash = 1,
	}: Partial<Props> = $props();

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

	const params = new PaneParameters(
		{
			term: "corner radius",
		},
		{
			term: {
				options: {
					"corner radius": "corner radius",
					"inner height": "inner height",
					"inner width": "inner width",
					"outer height": "outer height",
					"outer width": "outer width",
				},
			},
		},
	);

	const term_is_corner_radius = $derived(
		params.current.term === "corner radius",
	);
	const term_is_inner_height = $derived(params.current.term === "inner height");
	const term_is_inner_width = $derived(params.current.term === "inner width");
	const term_is_outer_height = $derived(params.current.term === "outer height");
	const term_is_outer_width = $derived(params.current.term === "outer width");

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

<div class="relative">
	<PaneContainer
		class="absolute top-2 right-2"
		{@attach (container) => {
			return params.createPane({ container, title: "terminology" });
		}}
	/>

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
</div>

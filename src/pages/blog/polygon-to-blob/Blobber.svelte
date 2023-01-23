<script lang="ts">
	import type { Polygon, Vector } from './types';
	import { aperture, bezierOffset } from './functions';
	import { derived } from 'svelte/store';
	import { midpoint } from './geometry';
	import { tweened } from 'svelte/motion';

	export let polygon: Polygon = [];
	export let width: number;
	export let height: number;

	const [p0] = polygon;

	const pairs = aperture(2, [...polygon, p0]);

	const midpoints = pairs.map(([p1, p2]) => midpoint(p1, p2));
	const [m0] = midpoints;
	midpoints.push(m0);

	const blobOffsets = aperture(2, midpoints).map(([s, e], i) =>
		bezierOffset(s, e, polygon[(i + 1) % polygon.length])
	);

	const polygonOffsets = pairs.map(([s, e]) => bezierOffset(s, e, e));

	let index = 0;

	// starts and _offsets must be the same length
	const starts = [p0, m0];
	const _offsets = [polygonOffsets, blobOffsets];

	const start = tweened(starts[index]);
	const offsets = tweened(_offsets[index]);

	const createPath = (start: Vector, offsets: [Vector, Vector][]) =>
		`M${start}q${offsets.join(' ')}`;

	const d = derived([start, offsets], ([$sp, $os]) => createPath($sp, $os));

	const transform = () => {
		index = (index + 1) % starts.length;
		start.set(starts[index]);
		offsets.set(_offsets[index]);
	};
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
	<path
		class="cursor-pointer fill-pine stroke-0 hover:fill-foam"
		d={$d}
		on:keydown={transform}
		on:click={transform}
	/>
</svg>

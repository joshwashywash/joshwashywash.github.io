<script lang="ts">
	import type { Offset } from '../../lib/bezier';
	import type { Polygon } from '../../lib/polygon';
	import type { Vec3 } from '../../lib/vector';
	import { aperture } from '../../lib/array';
	import { createIgnoreTab } from '../../lib/keys';
	import { derived } from 'svelte/store';
	import { diff, midpoint, multiply, toVec2 } from '../../lib/vector';
	import { tweened } from 'svelte/motion';

	export let polygon: Polygon;
	export let width = 10;
	export let height = 10;

	const [p0] = polygon;

	const pairs = aperture(2, [...polygon, p0]);

	const midpoints = pairs.map(([p1, p2]) => midpoint(p1, p2));
	const [m0] = midpoints;
	midpoints.push(m0);

	const blobOffsets: Offset[] = aperture(2, midpoints).map(([end, control], i) => [
		diff(polygon[(i + 1) % polygon.length], end),
		diff(control, end),
	]);

	const polygonOffsets: Offset[] = pairs.map(([end, control]) => [
		diff(control, end),
		diff(control, end),
	]);

	let index = 0;

	// starts and _offsets must be the same length
	const starts = [p0, m0];
	const offsets = [polygonOffsets, blobOffsets];

	const start$ = tweened(starts[index]);
	const offsets$ = tweened(offsets[index]);

	const scale: Vec3 = [width, height, 0];

	const createPath = (start: Vec3, offsets: Offset[]): string =>
		`M${toVec2(multiply(scale, start))}q${offsets
			.map((o) =>
				o.map((v) => {
					return v ? toVec2(multiply(scale, v)) : '';
				})
			)
			.join(' ')}`;

	const d = derived([start$, offsets$], ([$start, $offsets]) => createPath($start, $offsets));

	const transform = () => {
		index = (index + 1) % starts.length;
		start$.set(starts[index]);
		offsets$.set(offsets[index]);
	};
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
	<path
		class="cursor-pointer fill-pine stroke-0 outline-none hover:fill-foam focus:fill-foam"
		d={$d}
		on:keydown={createIgnoreTab(transform)}
		on:click={transform}
		tabIndex={0}
	/>
</svg>

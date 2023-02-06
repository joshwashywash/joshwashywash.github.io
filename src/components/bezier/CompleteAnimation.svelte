<script lang="ts">
	import type { Offset } from '../../lib/bezier';
	import { aperture } from '../../lib/array';
	import {
		diff,
		midpoint,
		multiply,
		toVec2,
		type Vec3,
	} from '../../lib/vector';
	import { example, type Polygon } from '../../lib/polygon';
	import { onMount } from 'svelte';
	import { timeline } from 'motion';

	export let width = 10;
	export let height = 10;
	export let polygon: Polygon = example;

	const scale: Vec3 = [width, height, 0];

	const strokeWidth = width / 100;

	const [m0, ...ms] = aperture(2, [...polygon, polygon[0]]).map(([p1, p2]) =>
		midpoint(p1, p2)
	);

	const offsets: Offset[] = aperture(2, [m0, ...ms, m0]).map(([m1, m2], i) => {
		const controlPoint = polygon[(i + 1) % polygon.length];
		return [diff(controlPoint, m1), diff(m2, m1)];
	});

	const d = `M${toVec2(multiply(scale, m0))} q${offsets.map((o) =>
		o.map((v) => {
			return v ? toVec2(multiply(scale, v)) : '';
		})
	)}`;

	let blob: SVGPathElement;
	let _polygon: SVGPolygonElement;

	onMount(() => {
		timeline(
			[
				[blob, { strokeDashoffset: 0 }, { duration: 2 }], // draw curve
				[blob, { fillOpacity: 1 }, { duration: 2 }], // fade in blob
				[_polygon, { fillOpacity: 0 }, { at: '<', duration: 2 }], // fade out
				[_polygon, { fillOpacity: 1 }, { duration: 2 }], // fade out
				[
					blob,
					{ fillOpacity: [1, 0], strokeOpacity: [1, 0] },
					{ at: '<', duration: 2 },
				],
			],
			{ repeat: Infinity }
		);
	});
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox={`0 0 ${width} ${height}`}
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<polygon
		bind:this={_polygon}
		points={polygon.map((p) => toVec2(multiply(scale, p))).join()}
		class="fill-pine"
	/>
	<path
		bind:this={blob}
		{d}
		stroke-dasharray={1}
		stroke-dashoffset={1}
		stroke-width={strokeWidth}
		fill-opacity={0}
		class="fill-gold stroke-gold"
		pathLength={1}
	/>
</svg>

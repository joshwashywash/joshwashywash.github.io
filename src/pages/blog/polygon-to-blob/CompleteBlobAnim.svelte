<script lang="ts">
	import type { Polygon } from './types';
	import { aperture, bezierOffset } from './functions';
	import { midpoint } from './geometry';
	import { onMount } from 'svelte';
	import { timeline } from 'motion';

	export let width: number;
	export let height: number;
	export let polygon: Polygon;
	const strokeWidth = width / 100;

	const [m0, ...ms] = aperture(2, [...polygon, polygon[0]]).map(([p1, p2]) =>
		midpoint(p1, p2)
	);

	const offsets = aperture(2, [m0, ...ms, m0]).map(([m1, m2], i) => {
		const controlPoint = polygon[(i + 1) % polygon.length];
		return bezierOffset(m1, m2, controlPoint);
	});

	const d = `M${m0} q${offsets}`;

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
	<polygon bind:this={_polygon} points={polygon.join()} class="fill-pine" />
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

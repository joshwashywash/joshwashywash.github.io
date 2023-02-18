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
	import { tweened } from 'svelte/motion';

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

	const strokeDashOffset = tweened(1, { duration: 2000 });
	const strokeOpacity = tweened(1, { duration: 2000 });
	const blobFillOpacity = tweened(0, { duration: 2000 });
	const polygonFillOpacity = tweened(1, { duration: 2000 });

	const animate = () =>
		strokeDashOffset.set(0).then(() =>
			Promise.all([blobFillOpacity.set(1), polygonFillOpacity.set(0)]).then(
				() =>
					Promise.resolve().then(() => {
						const options = { delay: 1000 };
						Promise.all([
							blobFillOpacity.set(0, options),
							strokeOpacity.set(0, options),
							polygonFillOpacity.set(1, options),
						])
							.then(() =>
								Promise.all([
									strokeDashOffset.set(1, { duration: 0 }),
									strokeOpacity.set(1, { duration: 0 }),
								])
							)
							.then(animate);
					})
			)
		);

	animate();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox={`0 0 ${width} ${height}`}
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<polygon
		fill-opacity={$polygonFillOpacity}
		points={polygon.map((p) => toVec2(multiply(scale, p))).join()}
		class="fill-pine"
	/>
	<path
		{d}
		stroke-dasharray={1}
		stroke-dashoffset={$strokeDashOffset}
		stroke-width={strokeWidth}
		stroke-opacity={$strokeOpacity}
		fill-opacity={$blobFillOpacity}
		class="fill-gold stroke-gold"
		pathLength={1}
	/>
</svg>

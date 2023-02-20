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

	const points = polygon.map((p) => toVec2(multiply(scale, p))).join();
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox={`0 0 ${width} ${height}`}
	stroke-linecap="round"
	stroke-linejoin="round"
>
	<polygon {points} class="delay-fade-in-out fill-pine" />
	<path
		{d}
		stroke-dasharray={1}
		stroke-width={strokeWidth}
		class="draw fill-gold stroke-gold"
		pathLength={1}
	/>
</svg>

<style>
	@keyframes draw {
		0% {
			fill-opacity: 0;
			stroke-dashoffset: 1;
		}
		25% {
			fill-opacity: 0;
			stroke-dashoffset: 0;
		}
		50%,75% {
			fill-opacity: 1;
			stroke-dashoffset: 0;
		}
		100% {
			fill-opacity: 0;
			stroke-opacity: 0;
		}
	}

	.draw {
		animation: 5s draw linear forwards infinite;
	}

	@keyframes fade-in-out {
		0%,
		25%,
		100% {
			fill-opacity: 1;
		}
		50%,
		75% {
			fill-opacity: 0;
		}
	}

	.delay-fade-in-out {
		animation: 5s fade-in-out linear infinite;
	}
</style>

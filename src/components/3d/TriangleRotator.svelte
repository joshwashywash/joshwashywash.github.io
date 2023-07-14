<script lang="ts">
	import type { Vec3, Vec2 } from '../../lib/vector';
	import { createRotation, fromVector, multiply, rotate, toVector } from '../../lib/quaternion';
	import { createScale, iHat, jHat } from '../../lib/vector';
	import { onMount } from 'svelte';

	type Triangle = {
		indices: Vec3;
		color: string;
	};

	export let width: number;
	export let height: number;
	export let distance = 3;
	export let points: Vec3[];
	export let triangles: Triangle[];
	export let dPhi = 0.01;
	export let dTheta = 0.03;

	const scale = createScale(1 / distance);

	let theta = 0;
	let phi = 0;

	let frame: number | undefined = undefined;

	const animate = () => {
		theta += dTheta;
		phi += dPhi;
		frame = requestAnimationFrame(animate);
	};

	const [xs, ys] = [0, 1].map((i) => points.map((p) => p[i]));

	const [xDiff, yDiff] = [xs, ys].map((s) =>
		[Math.min(...s), Math.max(...s)].reduce((min, max) => max - min)
	);

	const createToSVGCoordinates =
		(xDiff: number, yDiff: number, svgWidth: number, svgHeight: number) =>
		(p: Vec3): Vec2 => {
			const [x, y] = p;
			const [xCoordinate, yCoordinate] = [
				[x, xDiff, svgWidth],
				[y, yDiff, svgHeight],
			].map(([xy, diff, dimension]) => (xy / diff) * dimension + dimension * 0.5);
			return [xCoordinate, svgHeight - yCoordinate];
		};

	const toSVGCoordinates = createToSVGCoordinates(xDiff, yDiff, width, height);

	$: rotation = multiply(createRotation(iHat, theta), createRotation(jHat, phi));

	$: rotated = points.map((point) => toVector(rotate(rotation, fromVector(point))));

	$: sorted = triangles.sort((a, b) => rotated[b.indices[0]][2] - rotated[a.indices[0]][2]);

	$: svgPoints = rotated.map((point) => toSVGCoordinates(scale(point)));

	onMount(() => {
		animate();
		return () => {
			if (frame !== undefined) {
				cancelAnimationFrame(frame);
			}
		};
	});
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox={`0 0 ${width} ${height}`}
	stroke-linejoin="round"
	stroke-linecap="round"
>
	{#each sorted as { indices, color }}
		<polygon stroke={color} fill={color} points={`${indices.map((i) => svgPoints[i])}`} />
	{/each}
</svg>

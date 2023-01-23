<script lang="ts">
	import type { Point } from './point';
	import type { Range, Triangle } from './types';
	import { iHat, jHat, scale } from './vector';
	import {
		createRotationQuaternion,
		multiplyQuaternions,
		pointToQuaternion,
		quaternionToPoint,
		rotateByQuaternion,
	} from './quaternion';

	export let width: number;
	export let height: number;

	const distance = 3;

	const MODEL_X_RANGE: Range = [-5, 5];
	const MODEL_Y_RANGE: Range = [-5, 5];

	const points: Point[] = [
		[-3, -3, 3],
		[5, -3, 3],
		[1, 5, 3],
		[-5, -5, -3],
		[3, -5, -3],
		[-1, 3, -3],
	];

	const triangles: Triangle[] = [
		{
			indices: [0, 1, 2],
			stroke: '#f6c177',
		},
		{
			indices: [3, 4, 5],
			stroke: '#907aa9',
		},
	];

	const createToSVGCoordinates =
		(
			modelXRange: Range,
			modelYRange: Range,
			svgWidth: number,
			svgHeight: number
		) =>
		(p: Point) => {
			const [x, y] = p;
			const [xmin, xmax] = modelXRange;
			const [ymin, ymax] = modelYRange;
			return [
				(x / (xmax - xmin)) * svgWidth + svgWidth / 2,
				svgHeight - ((y / (ymax - ymin)) * svgHeight + svgHeight / 2),
			];
		};

	const toSVGCoordinates = createToSVGCoordinates(
		MODEL_X_RANGE,
		MODEL_Y_RANGE,
		width,
		height
	);

	// 0 <= ratio <= 1
	const toAngle = (ratio: number) => Math.PI * (2 * ratio - 1);

	let grabbing = false;

	let theta = 0;
	let phi = 0;

	$: xRotation = createRotationQuaternion(jHat, theta);
	$: yRotation = createRotationQuaternion(iHat, phi);
	$: rotation = multiplyQuaternions(xRotation, yRotation);

	// TODO: fix orbit controls
	let diffX = 0;
	let diffY = 0;
	let upX = 0;
	let upY = 0;

	// pipeline is -> rotate, scale, then convert to svg coordinates
	$: xformed = points.map((point) =>
		scale(
			1 / distance,
			quaternionToPoint(rotateByQuaternion(rotation, pointToQuaternion(point)))
		)
	);

	$: sorted = triangles.sort(
		(a, b) => xformed[b.indices[0]][2] - xformed[a.indices[0]][2]
	);

	$: svgPoints = xformed.map((p) => toSVGCoordinates(p));
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	viewBox={`0 0 ${width} ${height}`}
	stroke-linejoin="round"
	stroke-linecap="round"
	class="cursor-move"
	on:touchstart|preventDefault
	on:pointerdown={(e) => {
		grabbing = true;
		diffX = e.x - upX;
		diffY = e.y - upY;
	}}
	on:pointermove={(e) => {
		if (grabbing) {
			const { currentTarget, pointerId, x, y } = e;
			currentTarget.setPointerCapture(pointerId);
			const rect = currentTarget.getBoundingClientRect();
			theta = toAngle((x + diffX - rect.x) / rect.width);
			phi = toAngle((y + diffY - rect.y) / rect.height);
		}
	}}
	on:pointerup={(e) => {
		grabbing = false;
		upX = e.x;
		upY = e.y;
	}}
>
	<rect
		{width}
		{height}
		stroke-width={0.1}
		stroke="white"
		fill="none"
		class="stroke-text"
	/>
	{#each sorted as { indices, stroke }}
		<polygon
			stroke-width={1}
			{stroke}
			fill={stroke}
			points={`${indices.map((i) => svgPoints[i])}`}
		/>
	{/each}
</svg>

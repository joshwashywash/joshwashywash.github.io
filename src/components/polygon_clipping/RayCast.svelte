<script lang="ts">
	import type { Vec2 } from '../../lib/vector';
	import { moveable } from './util';

	export let insideColor: string;
	export let outsideColor: string;
	export let polygonColor: string;

	export let polygon: Vec2[];

	export let width: number;
	export let height: number;

	let cx = width / 2;
	let cy = height / 2;

	const contains = (polygon: Vec2[]) => {
		const { length } = polygon;
		return (xp: number, yp: number): boolean => {
			let count = 0;
			for (let i = 0; i < length; i += 1) {
				const [x1, y1] = polygon[i];
				const [x2, y2] = polygon[(i + 1) % length];
				count += Number(
					yp < y1 !== yp < y2 && xp < x1 + ((yp - y1) / (y2 - y1)) * (x2 - x1)
				);
			}
			return count % 2 === 1;
		};
	};

	const c = contains(polygon);

	$: i = c(cx, cy);
	$: color = i ? insideColor : outsideColor;
</script>

<svg viewBox="0 0 {width} {height}" xmlns="http://www.w3.org/2000/svg">
	<polygon
		stroke={polygonColor}
		stroke-width="1%"
		fill="none"
		points={polygon.join(' ')}
	/>
	<line x1={cx} y1={cy} x2={width} y2={cy} stroke={color} stroke-width="1%" />
	<circle
		class="cursor-move"
		fill={color}
		use:moveable
		on:move={({ detail }) => {
			cx = detail.x;
			cy = detail.y;
		}}
		{cx}
		{cy}
		r="3%"
	/>
</svg>

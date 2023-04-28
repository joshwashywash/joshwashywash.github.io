<script lang="ts">
	import type { Vec2 } from '../../lib/vector';
	import { translatable } from './util';

	const L = 2;

	let polygon: Vec2[] = [
		[-0.5, -0.5],
		[0.5, -0.5],
		[0.5, 0.5],
		[-0.5, 0.5],
	];

	let t: Vec2 = [0, 0];

	const add =
		(a: Vec2) =>
		(b: Vec2): Vec2 =>
			[a[0] + b[0], a[1] + b[1]];

	$: translated = polygon.map(add(t));
</script>

<svg viewBox="-1 -1 {L} {L}">
	<polygon
		class="cursor-move"
		use:translatable
		on:translate={({ detail }) => {
			t[0] = detail.x
			t[1] = detail.y
		}}
		fill="red"
		points={translated.join(' ')}
	/>
</svg>

<script lang="ts">
	import type { Vector } from './types';
	import { listenerAnimation } from '../../../actions/animation';
	import { spring } from 'motion';

	export let width: number;
	export let height: number;
	export let scale: number;

	const start: Vector = [width / 2, height / 4];

	// TODO: give this a better typing
	const offsets = [
		[
			[1, -1],
			[2, 0],
		],
		[[-2, 3]],
		[
			[-3, -2],
			[-2, -3],
		],
		[[2, 0]],
	].map((s) => s.map((o) => o.map((p) => scale * p)));

	const createPath = (start: Vector, offsets: number[][][]) =>
		`M${start} ${offsets
			.map((qt, i) => `${['q', 't'][i % 2]}${qt}`)
			.join(' ')}`;

	const d = createPath(start, offsets);
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
	<path
		use:listenerAnimation={{
			keyframes: { scale: [1.1, 1] },
			options: { duration: 2, easing: spring() },
			type: 'click',
		}}
		class="origin-center cursor-pointer fill-love"
		{d}
	/>
</svg>

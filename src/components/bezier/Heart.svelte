<script lang="ts">
	import type { Offset } from '../../lib/bezier';
	import type { Vec3 } from '../../lib/vector';
	import { createIgnoreTab } from '../../lib/keys';
	import { createScale, multiply, toVec2 } from '../../lib/vector';

	export let width: number;
	export let height: number;
	export let scalar = 2;

	const scale = createScale(scalar);

	const start: Vec3 = [0.5, 0.25, 0];

	const offsets: Offset[] = [
		[
			[0.1, -0.1, 0],
			[0.2, 0, 0],
		],
		[[-0.2, 0.3, 0]],
		[
			[-0.3, -0.2, 0],
			[-0.2, -0.3, 0],
		],
		[[0.2, 0, 0]],
	];

	const s: Vec3 = [width, height, 0];

	const curves = offsets.map(([control, end]) => {
		const c = toVec2(scale(multiply(s, control)));
		return end ? `q${c} ${toVec2(scale(multiply(s, end)))}` : `t${c}`;
	});

	const d = `m${toVec2(multiply(s, start))}${curves.join(' ')}`;

	let beating = false;
	const beat = () => {
		beating = true;
	};
</script>

<svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${width} ${height}`}>
	<path
		on:click={beat}
		on:keypress={createIgnoreTab(beat)}
		class:beating
		class="origin-center cursor-pointer fill-rose outline-none hover:fill-love focus:fill-love"
		{d}
		on:animationend={() => {
			beating = false;
		}}
		tabIndex={0}
	/>
</svg>

<style>
	@keyframes beat {
		0%,
		100% {
			transform: scale(1);
		}
		50% {
			transform: scale(1.1);
		}
	}

	.beating {
		animation: 0.5s cubic-bezier(0.25, 0.1, 0.25, 1.5) beat;
	}
</style>

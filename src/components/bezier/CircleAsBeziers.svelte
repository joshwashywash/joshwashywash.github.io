<script lang="ts">
	export let circleColor: string;

	const radius = 1;
	const diameter = 2;

	const k = (4 / 3) * (Math.SQRT2 - 1);
	const p = radius - k;

	const [c, ...rest] = [
		[0, k, -p, radius, -radius, radius],
		[-radius, -p, -radius, -radius],
		[p, -radius, radius, -radius],
		[radius, p, radius, radius],
	].map((piece) => piece.join(' '));
	const d = `m ${radius} 0 c${c} s${rest.join(' ')}`;

	// m 1 0
	// c 0 0.5523 -0.4477 1 -1 1
	// s -1 -0.4477 -1 -1
	// s 0.4477 -1 1 -1
	// s 1 0.4477 1 1
</script>

<svg
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
	viewBox="-{radius} -{radius} {diameter} {diameter}"
>
	<path fill={circleColor} {d} />
</svg>

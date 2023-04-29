<script lang="ts">
	import type { Vec2 } from '../../lib/vector';
	import { clip , translatable } from './util';

	const L = 2;

	const clipper: Vec2[] = [
		[-0.5, -0.5],
		[0.5, -0.5],
		[0.5, 0.5],
		[-0.5, 0.5],
	];

	const subject: Vec2[] = [
		[-0.5, -0.5],
		[0.5, -0.5],
		[0.5, 0.5],
		[-0.5, 0.5],
	];

	let subjectTranslation: Vec2 = [0, 0];
	let clipperTranslation: Vec2 = [-0.25, -0.25];

	const add =
		(a: Vec2) =>
		(b: Vec2): Vec2 =>
			[a[0] + b[0], a[1] + b[1]];

	$: translatedSubject = subject.map(add(subjectTranslation));
	$: translatedClipper = clipper.map(add(clipperTranslation));

	$: clipped = clip(translatedClipper)(translatedSubject);
</script>

<svg viewBox="-1 -1 {L} {L}">
	<polygon
		class="cursor-move"
		fill="white"
		stroke-width="1%"
		points={clipped.join(' ')}
	/>
	<polygon
		class="cursor-move"
		use:translatable={{
			offset: { x: clipperTranslation[0], y: clipperTranslation[1] },
		}}
		on:translate={({ detail }) => {
			clipperTranslation[0] = detail.x;
			clipperTranslation[1] = detail.y;
		}}
		fill="red"
		fill-opacity=".5"
		stroke-width="1%"
		points={translatedClipper.join(' ')}
	/>
</svg>

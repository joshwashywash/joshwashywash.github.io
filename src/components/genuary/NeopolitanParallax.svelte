<script lang="ts">
	import perlinWave from './actions/perlinWave';
	import size from './actions/canvasSize';

	export let backgroundColor: string;
</script>

<canvas
	use:size={{ width: 400, height: 400 }}
	use:perlinWave={{ colors: ['white', 'hotpink', 'saddlebrown'], backgroundColor }}
/>

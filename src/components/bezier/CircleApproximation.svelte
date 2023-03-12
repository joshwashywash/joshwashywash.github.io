<script lang="ts">
	export let circleColor: string;
	export let bezierColor: string;
</script>

<svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1">
	<path fill={circleColor} d="m 0 0 a 1 1 0 0 1 1 1h-1v-1" />
	<path fill={bezierColor} d="m 0 0 c 0.5523 0 1 0.5523 1 1h-1v-1" />
</svg>

<script lang="ts">
	export let kind: string;
</script>

<svg
	aria-hidden={true}
	xmlns="http://www.w3.org/2000/svg"
	viewBox="0 0 24 24"
	fill="none"
	stroke-linecap="round"
	stroke-linejoin="round"
	stroke-width={2}
	stroke="currentColor"
>
	<use href={`/icons.svg#${kind}`} />
</svg>

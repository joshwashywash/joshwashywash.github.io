<script lang="ts">
	import { Snippet } from "svelte";

	let {
		children,
	}: {
		children?: Snippet;
	} = $props();
</script>

<div class="m-4 grid items-center gap-4 md:grid-cols-2">
	{@render children?.()}
</div>

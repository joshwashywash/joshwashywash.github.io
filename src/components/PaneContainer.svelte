<script lang="ts">
	import type { SvelteHTMLElements } from "svelte/elements";

	const { children, ...rest }: SvelteHTMLElements["div"] = $props();
</script>

<div
	{...rest}
	class={["not-content w-3xs", rest.class]}
>
	{@render children?.()}
</div>

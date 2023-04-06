<script lang="ts">
	export let disabled = false;
</script>

<button
	{disabled}
	class="rounded-lg bg-gold py-1 px-4 text-base hover:bg-gold/90"
	on:click
>
	<slot />
</button>

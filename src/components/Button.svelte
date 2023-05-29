<script lang="ts">
	export let disabled = false;
</script>

<button {disabled} class="rounded-lg bg-gold px-4 py-1 text-base hover:bg-gold/90" on:click>
	<slot />
</button>

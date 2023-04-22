<script lang="ts">
	export let href: string;
</script>

<a
	class="outline-none transition-colors duration-300 ease-out hover:text-gold focus:text-gold"
	{href}
>
	<slot />
</a>

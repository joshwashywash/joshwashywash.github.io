<script lang="ts">
	import Icon from './Icon.svelte';
	import type { Link } from '../types';

	type $$Props = Link;
	export let name: $$Props['name'];
	export let href: $$Props['href'];
</script>

<a
	class="w-24 outline-none transition-colors duration-300 ease-out hover:text-gold focus:text-gold md:w-28"
	rel="external"
	{href}
>
	<span class="sr-only">{name}</span>
	<Icon kind={name} />
</a>

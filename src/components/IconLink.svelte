<script lang="ts">
	import Icon from './Icon.svelte';
	import type { Link } from '../types';

	export let link: Link;

	const { href, to } = link;
</script>

<a class="link w-24 md:w-28" rel="external" {href}>
	<span class="sr-only">{to}</span>
	<Icon kind={to} />
</a>

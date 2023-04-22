<script lang="ts">
	import type { Link as TLink } from '../types';
	import Link from '../components/Link.svelte';

	export let links: TLink[];

	let scrollY = 0;
	let lastScroll = 0;

	let show = true;
</script>

<svelte:window
	bind:scrollY
	on:scroll={() => {
		show = lastScroll - scrollY > 0;
		lastScroll = scrollY;
	}}
/>

<nav
	class="fixed bottom-0 w-full bg-base py-2 transition-transform"
	class:translate-y-full={!show}
	aria-label="navigation"
>
	<ul class="flex justify-around md:justify-evenly">
		{#each links as { href, text }}
			<li>
				<Link {href}>
					<span class="font-bold">{text}</span>
				</Link>
			</li>
		{/each}
	</ul>
</nav>

<script lang="ts">
	import type { Link } from '../types';

	export let links: Link[] = [
		{ href: '/', to: 'home' },
		{ href: '/blog', to: 'blog' },
	];

	let scrollY = 0;
	let lastScroll = 0;
	let clientHeight: number;

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
	bind:clientHeight
	class="fixed bottom-0 w-full bg-base py-2 transition-transform"
	class:translate-y-full={!show}
	aria-label="navigation"
>
	<ul class="flex justify-around md:justify-evenly">
		{#each links as { href, to }}
			<li>
				<a class="link" {href}>
					<span class="sr-only">{to}</span>
					<span class="font-bold">{to}</span>
				</a>
			</li>
		{/each}
	</ul>
</nav>

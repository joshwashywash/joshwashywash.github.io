<script lang="ts">
	import type { Link } from '../types';
	import { fly } from 'svelte/transition';

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

{#if show}
	<nav
		bind:clientHeight
		transition:fly={{ y: clientHeight }}
		class="fixed bottom-0 w-full bg-base py-2"
	>
		<ul class="flex justify-around md:justify-evenly">
			{#each links as { href, to }}
				<li>
					<a class="link bold" {href}>
						<span class="sr-only">{to}</span>
						<span class="font-bold">{to}</span>
					</a>
				</li>
			{/each}
		</ul>
	</nav>
{/if}

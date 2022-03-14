<script lang="ts">
	import { page } from '$app/stores';

	const links = [
		{
			href: '/categories',
			name: 'Kategorie'
		},
		{
			href: '/',
			name: 'To Do List'
		},
		{
			href: '/states',
			name: 'Plnění'
		}
	];

	const setConditionalLinksClasses = (linkHref: string, currPageLink: string) => {
		const isLinkActive = linkHref === currPageLink;
		return isLinkActive ? 'from-red-500 text-black bg-gradient-to-b' : 'text-white bg-red-500';
	};
</script>

<nav>
	<ul class="flex w-full">
		{#each links as link}
			<li class="flex-1">
				<a
					class="flex justify-center items-center w-full h-20 text-2xl font-semibold {setConditionalLinksClasses(
						link.href,
						$page.url.pathname
					)}"
					href={link.href}>{link.name}</a
				>
			</li>
		{/each}
	</ul>
</nav>

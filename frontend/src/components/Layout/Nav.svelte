<script lang="ts">
	import Item from './Item.svelte';

	import Link from './Link.svelte';

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
</script>

<div>
	<nav>
		<ul class="flex w-full">
			{#each links as link}
				<Item isHeading={link.href === '/'}>
					<Link {link} isHeading={link.href === '/'} />
				</Item>
			{/each}
		</ul>
	</nav>
</div>

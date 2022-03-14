<script lang="ts">
	import { page } from '$app/stores';

	export let link: { href: string; name: string };
	export let isHeading: boolean;

	const setActiveLinkClasses = (linkHref: string, currPageLink: string) => {
		const isLinkActive = linkHref === currPageLink;
		return isLinkActive ? 'from-red-500 text-black bg-gradient-to-b' : 'text-white bg-red-500';
	};
</script>

<a
	class="flex justify-center items-center h-20 font-semibold {isHeading
		? 'text-4xl'
		: 'text-2xl'} {setActiveLinkClasses(link.href, $page.url.pathname)}"
	href={link.href}>{link.name}</a
>

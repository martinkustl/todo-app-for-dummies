<script>
	import { flip } from 'svelte/animate';
	import { fly } from 'svelte/transition';
	import { notifications } from '../../../stores/notifications';

	// Possible notification color options by notification type if needed
	// export let themes = {
	// 	danger: '#E26D69',
	// 	success: '#84C991',
	// 	warning: '#f0ad4e',
	// 	info: '#5bc0de',
	// 	default: '#aaaaaa'
	// };
</script>

<div class="fixed top-24 z-50  left-2 right-3/4  flex flex-col justify-start items-center">
	{#each $notifications as notification (notification.id)}
		<div animate:flip class="flex mb-2 bg-red-400 text-black" transition:fly={{ y: 100 }}>
			<div class="block p-3 text-white font-medium">{notification.message}</div>
		</div>
	{/each}
</div>

<script lang="ts">
	import Column from './Column.svelte';

	let isOpen = false;
	const handleEditButtonClick = () => {
		isOpen = !isOpen;
	};
</script>

<Column>
	{#if isOpen}
		<slot />
	{/if}
	<button on:click={handleEditButtonClick}>Edit</button>
</Column>

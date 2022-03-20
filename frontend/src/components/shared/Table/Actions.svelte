<script lang="ts">
	let isOpen = false;
	const handleEditButtonClick = () => {
		isOpen = !isOpen;
	};
</script>

<div>
	{#if isOpen}
		<slot />
	{/if}
	<button on:click={handleEditButtonClick}>Edit</button>
</div>

<script lang="ts">
	import Modal from '../Modal/Modal.svelte';

	import Column from './Column.svelte';

	let isOpen = false;
	const handleEditButtonClick = () => {
		isOpen = !isOpen;
	};
</script>

<Column>
	{#if isOpen}
		<Modal bind:isOpen>
			<slot />
		</Modal>
	{/if}
	<button on:click={handleEditButtonClick}>Edit</button>
</Column>

<script lang="ts">
	import DeleteIcon from '../Icons/DeleteIcon.svelte';
	import EditIcon from '../Icons/EditIcon.svelte';
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
	<div class="w-full flex space-x-3">
		<button on:click={handleEditButtonClick}>
			<EditIcon />
		</button>
		<button>
			<DeleteIcon />
		</button>
	</div>
</Column>

<script lang="ts">
	import SubmitButton from '../shared/Buttons/SubmitButton.svelte';
	import { editableCategory } from '../../stores/categories';

	import Input from '../shared/Inputs/Input.svelte';
	import Modal from '../shared/Modal/Modal.svelte';

	export let onSubmit: (e: SubmitEvent) => Promise<void>;
</script>

{#if $editableCategory}
	<Modal>
		<form class="flex flex-col space-y-3" on:submit|preventDefault={onSubmit}>
			<h2 class="text-center text-xl font-medium">Editace kategorie</h2>
			<Input label="Název kategorie" name="category" value={$editableCategory.name} />
			<footer class="flex space-x-3 items-center justify-center">
				<SubmitButton btnText="Uložit" />
				<input
					type="button"
					value="Zavřít"
					class="rounded-md pl-10 pr-10 pb-2 pt-2 bg-gray-500 text-white cursor-pointer"
					on:click={() => {
						editableCategory.set(undefined);
					}}
				/>
			</footer>
		</form>
	</Modal>
{/if}

<!-- <EditCategoryForm onSubmit={handleSubmitEditCategory} onModalClose={handleModalClose} /> -->

<script lang="ts">
	import { editableCategory } from '../../stores/categories';
	import Input from '../shared/Inputs/Input.svelte';
	import UpdateRecordForm from '../shared/Forms/UpdateRecordForm.svelte';
	import type { Category } from '../../types';
	import { apiBaseUrl, http } from '../../common';

	export let onUpdateCategories: (category: Category) => void;

	const handleSubmitUpdateCategory = async (e: CustomEvent<SubmitEvent>) => {
		if (!e.detail.target || !$editableCategory) return;

		const formEl = e.detail.target as HTMLFormElement;

		const { parsedBody } = await http<Category>({
			input: `${apiBaseUrl}/categories/${$editableCategory.id}`,
			body: { name: formEl.category.value },
			method: 'PUT'
		});

		if (parsedBody) {
			onUpdateCategories(parsedBody);
		}
		editableCategory.set(undefined);
	};
</script>

{#if $editableCategory}
	<UpdateRecordForm
		headingText="Editace kategorie"
		on:cancelClick={() => editableCategory.set(undefined)}
		on:submit={handleSubmitUpdateCategory}
	>
		<Input label="Název kategorie" name="category" value={$editableCategory.name} required />
	</UpdateRecordForm>
{/if}

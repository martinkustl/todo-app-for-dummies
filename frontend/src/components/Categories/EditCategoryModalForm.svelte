<script lang="ts">
	import { editableCategory } from '../../stores/categories';
	import Input from '../shared/Inputs/Input.svelte';
	import UpdateRecordForm from '../shared/Forms/UpdateRecordForm.svelte';
	import type { Category, HttpResponseBody } from '../../types';
	import { apiBaseUrl } from '../../common';

	export let onUpdateCategories: (category: Category) => void;

	const handleCategoryUpdated = (parsedBody: HttpResponseBody) => {
		const parsedCategory = parsedBody as Category;
		onUpdateCategories(parsedCategory);
		editableCategory.set(undefined);
	};
</script>

{#if $editableCategory}
	<UpdateRecordForm
		headingText="Editace kategorie"
		on:cancelClick={() => editableCategory.set(undefined)}
		url="{apiBaseUrl}/categories/{$editableCategory.id}"
		onRecordUpdated={handleCategoryUpdated}
		setHttpBody={(formEl) => ({
			name: formEl.category.value
		})}
	>
		<Input label="Název kategorie" name="category" value={$editableCategory.name} required />
	</UpdateRecordForm>
{/if}

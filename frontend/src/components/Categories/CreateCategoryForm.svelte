<script lang="ts">
	import type { Category } from '../../types';
	import { apiBaseUrl, http } from '../../common';
	import Input from '../shared/Inputs/Input.svelte';
	import CreateRecordForm from '../shared/Forms/CreateRecordForm.svelte';

	export let onAddToCategories: (category: Category) => void;

	const handleSubmitNewCategory = async (e: CustomEvent<SubmitEvent>) => {
		if (!e.detail.target) return;

		const formEl = e.detail.target as HTMLFormElement;
		const { parsedBody } = await http<Category>({
			input: `${apiBaseUrl}/categories`,
			body: { name: formEl.category.value },
			method: 'POST'
		});

		if (parsedBody) {
			onAddToCategories(parsedBody);
		}
	};
</script>

<CreateRecordForm headingText="Nová kategorie" on:submit={handleSubmitNewCategory}>
	<Input label="Kategorie" name="category" />
</CreateRecordForm>

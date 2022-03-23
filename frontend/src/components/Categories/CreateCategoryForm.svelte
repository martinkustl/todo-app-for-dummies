<script lang="ts">
	import type { Category, HttpResponseBody } from '../../types';
	import { apiBaseUrl } from '../../common';
	import Input from '../shared/Inputs/Input.svelte';
	import CreateRecordForm from '../shared/Forms/CreateRecordForm.svelte';

	export let onAddToCategories: (category: Category) => void;

	const handleCategoryCreated = (parsedBody: HttpResponseBody) => {
		const parsedCategory = parsedBody as Category;
		onAddToCategories(parsedCategory);
	};
</script>

<CreateRecordForm
	headingText="Nová kategorie"
	url="{apiBaseUrl}/categories"
	setHttpBody={(formEl) => ({
		name: formEl.category.value
	})}
	onRecordCreated={handleCategoryCreated}
>
	<Input label="Kategorie" name="category" required />
</CreateRecordForm>

<script lang="ts">
	import Table from '../components/shared/Table/Table.svelte';
	import { editableCategory } from '../stores/categories';
	import { createRecord, deleteRecord, http, updateRecord } from '../common';
	import EditCategoryModalForm from '../components/Categories/EditCategoryModalForm.svelte';
	import { onMount } from 'svelte';
	import type { Category, TableBodyRow } from '../types';
	import { apiBaseUrl } from '../common';
	import CreateCategoryForm from '../components/Categories/CreateCategoryForm.svelte';

	const headers = {
		name: {
			name: 'Kategorie'
		},
		actions: {
			name: 'Akce'
		}
	};

	let categories: Category[] = [];

	// Life cycle method
	onMount(async () => {
		const { parsedBody } = await http<Category[]>({
			input: `${apiBaseUrl}/categories`,
			method: 'GET'
		});

		if (parsedBody) {
			categories = parsedBody;
		}
	});

	const handleEditClick = (row: TableBodyRow) => {
		editableCategory.set(row as Category);
	};

	const handleDeleteClick = async (row: TableBodyRow) => {
		const category = row as Category;

		const { parsedBody } = await http<Category>({
			input: `${apiBaseUrl}/categories/${category.id}`,
			method: 'DELETE'
		});

		if (parsedBody) {
			categories = deleteRecord(categories, parsedBody);
		}
	};
</script>

<CreateCategoryForm
	onAddToCategories={(newCategory) => {
		categories = createRecord(categories, newCategory);
	}}
/>
<Table
	{headers}
	rows={categories}
	onEditClick={handleEditClick}
	onDeleteClick={handleDeleteClick}
/>

<EditCategoryModalForm
	onUpdateCategories={(updatedCategory) => {
		categories = updateRecord(categories, updatedCategory);
	}}
/>

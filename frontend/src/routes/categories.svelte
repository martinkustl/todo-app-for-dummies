<script lang="ts">
	import Table from '../components/shared/Table/Table.svelte';
	import { editableCategory } from '../stores/categories';
	import { createRecord, deleteRecord, http, updateRecord } from '../common';
	import SubmitButton from '../components/shared/Buttons/SubmitButton.svelte';
	import Input from '../components/shared/Inputs/Input.svelte';
	import EditCategoryModalForm from '../components/Categories/EditCategoryModalForm.svelte';
	import { onMount } from 'svelte';
	import type { Category, TableBodyRow } from '../types';

	const headers = {
		name: {
			name: 'Kategorie'
		},
		actions: {
			name: 'Akce'
		}
	};

	let categories: Category[] = [];

	onMount(async () => {
		try {
			const { parsedBody } = await await http<Category[]>(`http://localhost:5000/api/categories`);

			if (parsedBody) {
				categories = parsedBody;
			}
		} catch (err) {
			// TODO - add error handling
			console.log(err);
		}
	});

	// TODO - refactor all async methods

	const handleSubmitNewCategory = async (e: SubmitEvent) => {
		if (!e.target) return;

		const formEl = e.target as HTMLFormElement;

		try {
			const { parsedBody } = await http<Category>(`http://localhost:5000/api/categories`, {
				method: 'POST',
				body: JSON.stringify({ name: formEl.category.value })
			});

			if (parsedBody) {
				// categories = [...categories, { ...parsedBody }];
				categories = createRecord(categories, parsedBody);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleSubmitEditCategory = async (e: SubmitEvent) => {
		if (!e.target || !$editableCategory) return;

		const formEl = e.target as HTMLFormElement;

		try {
			const { parsedBody } = await http<Category>(
				`http://localhost:5000/api/categories/${$editableCategory.id}`,
				{
					method: 'PUT',
					body: JSON.stringify({ name: formEl.category.value })
				}
			);

			if (parsedBody) {
				categories = updateRecord(categories, parsedBody);
			}
			editableCategory.set(undefined);
		} catch (err) {
			console.log(err);
		}
	};

	const handleEditClick = (row: TableBodyRow) => {
		editableCategory.set(row as Category);
	};

	const handleDeleteClick = async (row: TableBodyRow) => {
		const category = row as Category;

		try {
			const { parsedBody } = await http<Category>(
				`http://localhost:5000/api/categories/${category.id}`,
				{
					method: 'DELETE'
				}
			);

			if (parsedBody) {
				categories = deleteRecord(categories, parsedBody);
			}
		} catch (err) {
			console.log(err);
		}
	};
</script>

<section>
	<form
		class="pl-10 pr-10 flex ml-auto mr-auto space-y-4 flex-col w-8/12"
		on:submit|preventDefault={handleSubmitNewCategory}
	>
		<h2 class="text-center text-lg font-semibold">Nová kategorie</h2>
		<div>
			<Input label="Kategorie" name="category" />
		</div>
		<footer class="flex items-center justify-center">
			<SubmitButton btnText="Vytvořit kategorii" />
		</footer>
	</form>
</section>
<Table
	{headers}
	rows={categories}
	onEditClick={handleEditClick}
	onDeleteClick={handleDeleteClick}
/>

<EditCategoryModalForm onSubmit={handleSubmitEditCategory} />

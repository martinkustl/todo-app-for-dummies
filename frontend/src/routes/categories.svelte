<script lang="ts">
	import Table from '../components/shared/Table/Table.svelte';
	import { http } from '../common';
	import SubmitButton from '../components/shared/Buttons/SubmitButton.svelte';
	import Input from '../components/shared/Inputs/Input.svelte';
	import EditCategoryForm from '../components/Categories/EditCategoryForm.svelte';
	import { onMount } from 'svelte';

	const headers = {
		name: {
			name: 'Kategorie'
		},
		actions: {
			name: 'Akce'
		}
	};

	type Category = {
		id: number;
		name: string;
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

	const handleSubmitNewCategory = async (e: SubmitEvent) => {
		if (!e.target) return;

		const formEl = e.target as HTMLFormElement;

		try {
			const { parsedBody } = await http<Category>(`http://localhost:5000/api/categories`, {
				method: 'POST',
				body: JSON.stringify({ name: formEl.category.value })
			});

			if (parsedBody) {
				categories = [...categories, { ...parsedBody }];
			}

			categories = [...categories];
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
<Table {headers} rows={categories} let:row={category}>
	<EditCategoryForm {category} />
</Table>

<script lang="ts">
	import { onMount } from 'svelte';
	import { editableCategory } from '../stores/categories';
	import { createRecord, deleteRecord, http, updateRecord } from '../common';
	import type { Category, TableBodyRow, State, Todo } from '../types';
	import { apiBaseUrl } from '../common';
	import CreateTodoForm from '../components/Todos/CreateTodoForm.svelte';

	// $table->id();
	//         $table->timestamps();
	//         $table->string('activity', 45);
	//         $table->timestamp('deadline');
	//         $table->foreignId('category_id')->constrained('categories');
	//         $table->foreignId('state_id')->constrained('states');
	let states: State[];
	let categories: Category[];
	let todos: Todo[];

	onMount(async () => {
		const { parsedBody: parsedStatesBody } = await http<State[]>({
			input: `${apiBaseUrl}/states`,
			method: 'GET'
		});

		const { parsedBody: parsedCategoriesBody } = await http<Category[]>({
			input: `${apiBaseUrl}/categories`,
			method: 'GET'
		});

		const { parsedBody: parsedTodosBody } = await http<Todo[]>({
			input: `${apiBaseUrl}/categories`,
			method: 'GET'
		});

		if (parsedStatesBody && parsedCategoriesBody && parsedTodosBody) {
			states = parsedStatesBody;
			categories = parsedCategoriesBody;
			todos = parsedTodosBody;
		}

		// if (parsedBody) {
		// 	categories = parsedBody;
		// }

		// if (parsedBody) {
		// 	states = parsedBody;
		// }
	});
</script>

<CreateTodoForm onAddToTodos={(todo) => console.log(todo)} />

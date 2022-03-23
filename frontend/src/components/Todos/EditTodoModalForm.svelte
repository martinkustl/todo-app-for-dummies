<script lang="ts">
	import { onMount } from 'svelte';
	import { editableTodo } from '../../stores/todos';
	import Input from '../shared/Inputs/Input.svelte';
	import Select from '../shared/Inputs/Select.svelte';
	import UpdateRecordForm from '../shared/Forms/UpdateRecordForm.svelte';
	import type { Todo, State, Category, RawTodo, HttpResponseBody } from '../../types';
	import { apiBaseUrl, http } from '../../common';
	import { format } from 'date-fns';
	import { transformTodoForTable } from '../../common';

	export let onUpdateTodos: (todo: Todo) => void;

	let states: State[];
	let categories: Category[];

	onMount(async () => {
		const { parsedBody: parsedStatesBody } = await http<State[]>({
			input: `${apiBaseUrl}/states`,
			method: 'GET'
		});

		const { parsedBody: parsedCategoriesBody } = await http<Category[]>({
			input: `${apiBaseUrl}/categories`,
			method: 'GET'
		});

		if (parsedStatesBody && parsedCategoriesBody) {
			states = parsedStatesBody;
			categories = parsedCategoriesBody;
		}
	});

	const addIsSelectedToItems = (items: Category[] | State[], keyName: keyof Todo, todo: Todo) => {
		return items.map((item) => {
			if (item.id === todo[keyName]) return { ...item, selected: true };
			return item;
		});
	};

	const handleTodoUpdated = (parsedBody: HttpResponseBody) => {
		const parsedTodo = parsedBody as RawTodo;
		onUpdateTodos(transformTodoForTable(parsedTodo));
		editableTodo.set(undefined);
	};

	const formatDefaultIsoDate = (date: Date) => format(date, "yyyy-MM-dd'T'HH:mm");
</script>

{#if $editableTodo}
	<UpdateRecordForm
		headingText="Editace todo"
		on:cancelClick={() => editableTodo.set(undefined)}
		onRecordUpdated={handleTodoUpdated}
		url="{apiBaseUrl}/todos/{$editableTodo.id}"
		setHttpBody={(formEl) => ({
			activity: formEl.activity.value,
			deadline: formEl.deadline.value,
			categoryId: formEl.category.value,
			stateId: formEl.state.value
		})}
	>
		<Input label="Činnost" name="activity" value={$editableTodo.activity} required />
		<Input
			label="Deadline"
			name="deadline"
			value={formatDefaultIsoDate($editableTodo.deadline)}
			type="datetime-local"
			required
		/>
		<Select
			label="Kategorie"
			items={addIsSelectedToItems(categories, 'category_id', $editableTodo)}
			name="category"
			required
		/>
		<Select
			label="Plnění"
			items={addIsSelectedToItems(states, 'state_id', $editableTodo)}
			name="state"
			required
		/>
	</UpdateRecordForm>
{/if}

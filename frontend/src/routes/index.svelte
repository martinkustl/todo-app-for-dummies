<script lang="ts">
    import {onMount} from 'svelte';
    import {editableTodo} from '../stores/todos';
    import {createRecord, deleteRecord, http, updateRecord, transformTodoForTable} from '../common';
    import type {TableBodyRow, Todo, RawTodo} from '../types';
    import {apiBaseUrl} from '../common';
    import CreateTodoForm from '../components/Todos/CreateTodoForm.svelte';
    import Table from '../components/shared/Table/Table.svelte';
    import EditTodoModalForm from '../components/Todos/EditTodoModalForm.svelte';

    const headers = {
        category: {
            name: 'Kategorie'
        },
        activity: {
            name: 'Činnost'
        },
        deadline: {
            name: 'Deadline',
            type: 'date'
        },
        state: {
            name: 'Plnění'
        },
        actions: {
            name: 'Akce'
        }
    };

    let todos: Todo[];

    onMount(async () => {
        const {parsedBody} = await http<RawTodo[]>({
            input: `${apiBaseUrl}/todos`,
            method: 'GET'
        });

        if (parsedBody) {
            todos = transformTodosForTable(parsedBody);
        }
    });

    const transformTodosForTable = (fetchedTodos: RawTodo[]) => {
        return fetchedTodos.map(transformTodoForTable);
    };

    const handleEditClick = (row: TableBodyRow) => {
        editableTodo.set(row as Todo);
    };

    const handleDeleteClick = async (row: TableBodyRow) => {
        const todo = row as Todo;

        const {parsedBody} = await http<Todo>({
            input: `${apiBaseUrl}/todos/${todo.id}`,
            method: 'DELETE'
        });

        if (parsedBody) {
            todos = deleteRecord<Todo>(todos, parsedBody);
        }
    };
</script>

<CreateTodoForm
        onAddToTodos={(newTodo) => {
		console.log(newTodo);
		todos = createRecord(todos, transformTodoForTable(newTodo));
		console.log(todos);
	}}
/>
<Table {headers} rows={todos} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick}/>
<EditTodoModalForm
        onUpdateTodos={(updatedTodo) => {
		todos = updateRecord(todos, updatedTodo);
	}}
/>

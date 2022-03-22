<script lang="ts">
	import Table from '../components/shared/Table/Table.svelte';
	import { editableState } from '../stores/states';
	import { createRecord, deleteRecord, http, updateRecord } from '../common';
	import { onMount } from 'svelte';
	import type { State, TableBodyRow } from '../types';
	import { apiBaseUrl } from '../common';
	import CreateStateForm from '../components/States/CreateStateForm.svelte';
	import EditStateModalForm from '../components/States/EditStateModalForm.svelte';

	const headers = {
		name: {
			name: 'Plnění'
		},
		actions: {
			name: 'Akce'
		}
	};

	let states: State[] = [];

	// Life cycle method
	onMount(async () => {
		const { parsedBody } = await http<State[]>({
			input: `${apiBaseUrl}/states`,
			method: 'GET'
		});

		if (parsedBody) {
			states = parsedBody;
		}
	});

	const handleEditClick = (row: TableBodyRow) => {
		editableState.set(row as State);
	};

	const handleDeleteClick = async (row: TableBodyRow) => {
		const state = row as State;

		const { parsedBody } = await http<State>({
			input: `${apiBaseUrl}/states/${state.id}`,
			method: 'DELETE'
		});

		if (parsedBody) {
			states = deleteRecord(states, parsedBody);
		}
	};
</script>

<CreateStateForm
	onAddToStates={(newState) => {
		states = createRecord(states, newState);
	}}
/>

<Table {headers} rows={states} onEditClick={handleEditClick} onDeleteClick={handleDeleteClick} />
<EditStateModalForm
	onUpdateStates={(updatedState) => {
		states = updateRecord(states, updatedState);
	}}
/>

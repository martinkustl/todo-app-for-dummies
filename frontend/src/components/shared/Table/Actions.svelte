<script lang="ts">
	import type { TableBodyRow } from 'src/types';

	import DeleteIcon from '../Icons/DeleteIcon.svelte';
	import EditIcon from '../Icons/EditIcon.svelte';

	import Column from './Column.svelte';

	export let onEditClick: (row: TableBodyRow) => void;
	export let onDeleteClick: (row: TableBodyRow) => void;
	export let row: TableBodyRow;
</script>

<Column>
	<div class="w-full flex space-x-3">
		<button on:click={() => onEditClick(row)}>
			<EditIcon />
		</button>
		<button on:click={() => onDeleteClick(row)}>
			<DeleteIcon />
		</button>
	</div>
</Column>

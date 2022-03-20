<script lang="ts">
	import type { TableHeaderColumns } from 'src/types';

	export let headers: TableHeaderColumns;
</script>

<thead>
	<tr class="border-b-2">
		{#each Object.entries(headers) as [_, header]}
			<th class="p-2">{header.name}</th>
		{/each}
	</tr>
</thead>

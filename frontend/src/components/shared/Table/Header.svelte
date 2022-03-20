<script lang="ts">
	import type { TableHeaderColumns } from 'src/types';

	export let headers: TableHeaderColumns;
</script>

<thead>
	<tr>
		{#each Object.entries(headers) as [_, header]}
			<th class="p-1">{header.name}</th>
		{/each}
	</tr>
</thead>

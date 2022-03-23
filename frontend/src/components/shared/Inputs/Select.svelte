<script lang="ts">
	export let label: string;
	export let name: string;
	export let items: { id: number; name: string; selected?: boolean }[];
	export let required: boolean;
</script>

<div class="w-full flex">
	<label class="mr-8 w-20" for="select_{name}">{label}</label>
	<select {name} id="select_{name}" class="border border-slate-500 flex-1 pl-1 pr-1" {required}>
		{#each items as item}
			<option value={item.id} selected={item.selected}>{item.name}</option>
		{/each}
	</select>
</div>

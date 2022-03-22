<script lang="ts">
	export let label: string;
	export let name: string;
	export let items: { id: number; name: string }[];

	export let { ...selectProps } = $$restProps;
</script>

<div class="w-full flex">
	<label class="mr-8 w-20" for="select_{name}">{label}</label>
	<select
		{name}
		id="select_{name}"
		class="border border-slate-500 flex-1 pl-1 pr-1"
		{...selectProps}
	>
		{#each items as item}
			<option value={item.id}>{item.name}</option>
		{/each}
	</select>
</div>

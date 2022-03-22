<script lang="ts">
	export let label: string;
	export let name: string;
	export let value: string = '';
	// It's any, as I can't specify HTML Input prop, because Svelte VSCode extensions weirdly types Input props
	export let { ...inputProps } = $$restProps;
</script>

<div class="w-full flex">
	<label class="mr-8 w-20" for="input_{name}">{label}</label>
	<input
		class="border border-slate-500 flex-1 pl-1 pr-1"
		{value}
		{name}
		id="input_{name}"
		{...inputProps}
	/>
</div>

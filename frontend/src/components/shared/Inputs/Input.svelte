<script lang="ts">
	export let label: string;
	export let name: string;
	export let value: string | number;
</script>

<div class="w-full flex">
	<label class="mr-8" for="input_{name}">{label}</label>
	<input class="border border-slate-500 flex-1" {name} id="input_{name}" bind:value />
</div>

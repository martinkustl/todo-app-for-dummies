<script lang="ts">
	export let btnText: string | undefined;
</script>

<input
	class="flex bg-emerald-400 rounded-md pl-10 pr-10 pb-2 pt-2"
	type="submit"
	value={btnText ?? 'Uložit'}
/>

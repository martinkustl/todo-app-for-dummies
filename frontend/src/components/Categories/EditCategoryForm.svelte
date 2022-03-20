<script lang="ts">
	import type { Category } from 'src/types';

	import Input from '../shared/Inputs/Input.svelte';

	export let category: Category;
</script>

<form class="flex flex-col space-y-3">
	<h2 class="text-center text-xl font-medium">Editace kategorie</h2>
	<Input label="Název kategorie" name="name" value={category.name} />
</form>

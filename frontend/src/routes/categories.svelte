<script>
	import SubmitButton from '../components/shared/Buttons/SubmitButton.svelte';
	import Input from '../components/shared/Inputs/Input.svelte';

	let categoryInput = '';

	const handleSubmitNewCategory = () => {
		console.log(categoryInput);
	};
</script>

<form
	class="pl-10 pr-10 flex ml-auto mr-auto space-x-4 space-y-4 flex-col w-8/12"
	on:submit|preventDefault={handleSubmitNewCategory}
>
	<h2 class="text-center text-lg font-semibold">Nová kategorie</h2>
	<div>
		<Input label="Kategorie" name="category" bind:value={categoryInput} />
	</div>
	<footer class="flex items-center justify-center">
		<SubmitButton btnText="Vytvořit kategorii" />
	</footer>
</form>

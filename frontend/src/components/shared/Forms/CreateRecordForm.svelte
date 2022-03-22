<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import SubmitButton from '../Buttons/SubmitButton.svelte';

	export let headingText: string;
	const dispatch = createEventDispatcher();

	const handleSubmit = (e: SubmitEvent) => {
		dispatch('submit', e);
	};
</script>

<section>
	<form
		class="pl-10 pr-10 flex ml-auto mr-auto space-y-4 flex-col w-8/12"
		on:submit|preventDefault={handleSubmit}
	>
		<h2 class="text-center text-lg font-semibold">{headingText}</h2>
		<div>
			<slot />
		</div>
		<footer class="flex items-center justify-center">
			<SubmitButton btnText="Vytvořit" />
		</footer>
	</form>
</section>

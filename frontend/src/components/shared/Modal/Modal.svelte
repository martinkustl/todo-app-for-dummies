<script lang="ts">
	import SubmitButton from '../Buttons/SubmitButton.svelte';

	export let isOpen: boolean;

	const handleModalClose = () => {
		isOpen = false;
	};
</script>

<div class="fixed left-0 top-0 w-full h-full bg-black/30 flex justify-center items-center z-20">
	<section class="bg-white relative z-30 rounded p-3 flex flex-col space-y-4">
		<slot />
		<footer class="flex space-x-3 items-center justify-center">
			<SubmitButton btnText="Uložit" />
			<input
				type="button"
				value="Zavřít"
				class="rounded-md pl-10 pr-10 pb-2 pt-2 bg-gray-500 text-white cursor-pointer"
				on:click={handleModalClose}
			/>
		</footer>
	</section>
</div>

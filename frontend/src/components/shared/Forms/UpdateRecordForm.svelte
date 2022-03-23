<script lang="ts">
	import Modal from '../Modal/Modal.svelte';
	import SubmitButton from '../Buttons/SubmitButton.svelte';
	import type { HttpResponseBody } from '../../../types';
	import { http } from '../../../common';

	export let headingText: string;
	export let url: string;
	export let setHttpBody: (
		formEl: HTMLFormElement
	) => Record<string, string | Date | number | boolean>;
	export let onRecordUpdated: (parsedBody: HttpResponseBody) => void;

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	const handleCancelClick = () => {
		dispatch('cancelClick');
	};

	const handleSubmit = async (e: SubmitEvent) => {
		if (!e.target) return;
		const formEl = e.target as HTMLFormElement;

		const { parsedBody } = await http<any>({
			input: url,
			body: setHttpBody(formEl),
			method: 'PUT'
		});

		if (parsedBody) {
			onRecordUpdated(parsedBody);
		}
	};
</script>

<Modal>
	<form class="flex flex-col space-y-3" on:submit|preventDefault={handleSubmit}>
		<h2 class="text-center text-xl font-medium">{headingText}</h2>
		<slot />
		<footer class="flex space-x-3 items-center justify-center">
			<SubmitButton btnText="Uložit" />
			<input
				type="button"
				value="Zavřít"
				class="rounded-md pl-10 pr-10 pb-2 pt-2 bg-gray-500 text-white cursor-pointer"
				on:click={handleCancelClick}
			/>
		</footer>
	</form>
</Modal>

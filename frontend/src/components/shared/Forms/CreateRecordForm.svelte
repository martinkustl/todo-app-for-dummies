<script lang="ts">
	import { http } from '../../../common';
	import SubmitButton from '../Buttons/SubmitButton.svelte';
	import type { HttpResponseBody } from '../../../types';

	export let headingText: string;
	export let url: string;
	export let setHttpBody: (
		formEl: HTMLFormElement
	) => Record<string, string | Date | number | boolean>;
	export let onRecordCreated: (parsedBody: HttpResponseBody) => void;

	const handleSubmit = async (e: SubmitEvent) => {
		if (!e.target) return;
		const formEl = e.target as HTMLFormElement;

		const { parsedBody } = await http<any>({
			input: url,
			body: setHttpBody(formEl),
			method: 'POST'
		});

		if (parsedBody) {
			onRecordCreated(parsedBody);
		}
	};
</script>

<section>
	<form
		class="pl-10 pr-10 flex ml-auto mr-auto space-y-4 flex-col w-8/12"
		on:submit|preventDefault={handleSubmit}
	>
		<h2 class="text-center text-lg font-semibold">{headingText}</h2>
		<div class="flex flex-col space-y-4">
			<slot />
		</div>
		<footer class="flex items-center justify-center">
			<SubmitButton btnText="Vytvořit" />
		</footer>
	</form>
</section>

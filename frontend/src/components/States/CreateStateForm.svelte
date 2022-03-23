<script lang="ts">
	import type { State } from '../../types';
	import { apiBaseUrl, http } from '../../common';
	import Input from '../shared/Inputs/Input.svelte';
	import CreateRecordForm from '../shared/Forms/CreateRecordForm.svelte';

	export let onAddToStates: (state: State) => void;

	const handleSubmitNewState = async (e: CustomEvent<SubmitEvent>) => {
		if (!e.detail.target) return;

		const formEl = e.detail.target as HTMLFormElement;
		const { parsedBody } = await http<State>({
			input: `${apiBaseUrl}/states`,
			body: { name: formEl.state.value },
			method: 'POST'
		});

		if (parsedBody) {
			onAddToStates(parsedBody);
		}
	};
</script>

<CreateRecordForm headingText="Nový stav plnění" on:submit={handleSubmitNewState}>
	<Input label="Stav plnění" name="state" required />
</CreateRecordForm>

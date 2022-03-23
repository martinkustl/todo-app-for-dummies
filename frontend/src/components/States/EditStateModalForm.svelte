<script lang="ts">
	import { editableState } from '../../stores/states';
	import Input from '../shared/Inputs/Input.svelte';
	import UpdateRecordForm from '../shared/Forms/UpdateRecordForm.svelte';
	import type { State } from '../../types';
	import { apiBaseUrl, http } from '../../common';

	export let onUpdateStates: (todo: State) => void;

	const handleSubmitUpdateState = async (e: CustomEvent<SubmitEvent>) => {
		if (!e.detail.target || !$editableState) return;

		const formEl = e.detail.target as HTMLFormElement;

		const { parsedBody } = await http<State>({
			input: `${apiBaseUrl}/states/${$editableState.id}`,
			body: { name: formEl.state.value },
			method: 'PUT'
		});

		if (parsedBody) {
			onUpdateStates(parsedBody);
		}
		editableState.set(undefined);
	};
</script>

{#if $editableState}
	<UpdateRecordForm
		headingText="Editace stavu plnění"
		on:cancelClick={() => editableState.set(undefined)}
		on:submit={handleSubmitUpdateState}
	>
		<Input label="Název stavu plnění" name="state" value={$editableState.name} />
	</UpdateRecordForm>
{/if}

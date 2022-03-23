<script lang="ts">
	import { editableState } from '../../stores/states';
	import Input from '../shared/Inputs/Input.svelte';
	import UpdateRecordForm from '../shared/Forms/UpdateRecordForm.svelte';
	import type { HttpResponseBody, State } from '../../types';
	import { apiBaseUrl } from '../../common';

	export let onUpdateStates: (todo: State) => void;

	const handleStateUpdated = (parsedBody: HttpResponseBody) => {
		const parsedState = parsedBody as State;
		onUpdateStates(parsedState);
		editableState.set(undefined);
	};
</script>

{#if $editableState}
	<UpdateRecordForm
		headingText="Editace stavu plnění"
		on:cancelClick={() => editableState.set(undefined)}
		url="{apiBaseUrl}/states/{$editableState.id}"
		onRecordUpdated={handleStateUpdated}
		setHttpBody={(formEl) => ({
			name: formEl.state.value
		})}
	>
		<Input label="Název stavu plnění" name="state" value={$editableState.name} required />
	</UpdateRecordForm>
{/if}

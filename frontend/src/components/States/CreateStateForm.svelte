<script lang="ts">
	import type { HttpResponseBody, State } from '../../types';
	import { apiBaseUrl } from '../../common';
	import Input from '../shared/Inputs/Input.svelte';
	import CreateRecordForm from '../shared/Forms/CreateRecordForm.svelte';

	export let onAddToStates: (state: State) => void;

	const handleStateCreated = (parsedBody: HttpResponseBody) => {
		const parsedState = parsedBody as State;
		onAddToStates(parsedState);
	};
</script>

<CreateRecordForm
	headingText="Nový stav plnění"
	url="{apiBaseUrl}/states"
	setHttpBody={(formEl) => ({
		name: formEl.state.value
	})}
	onRecordCreated={handleStateCreated}
>
	<Input label="Stav plnění" name="state" required />
</CreateRecordForm>

<script lang="ts">
	import { editableCategory } from '../../stores/categories';
	import Input from '../shared/Inputs/Input.svelte';
	import UpdateRecordForm from '../shared/Forms/UpdateRecordForm.svelte';

	export let onSubmit: (e: CustomEvent<SubmitEvent>) => Promise<void>;
</script>

{#if $editableCategory}
	<UpdateRecordForm
		headingText="Editace kategorie"
		on:cancelClick={() => editableCategory.set(undefined)}
		on:submit={onSubmit}
	>
		<Input label="Název kategorie" name="category" value={$editableCategory.name} />
	</UpdateRecordForm>
{/if}

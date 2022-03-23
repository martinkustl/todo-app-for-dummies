<script lang="ts">
    import {onMount} from 'svelte';
    import type {State, Category, RawTodo} from '../../types';
    import {apiBaseUrl, http} from '../../common';
    import Input from '../shared/Inputs/Input.svelte';
    import CreateRecordForm from '../shared/Forms/CreateRecordForm.svelte';
    import Select from '../shared/Inputs/Select.svelte';

    export let onAddToTodos: (todo: RawTodo) => void;

    let states: State[];
    let categories: Category[];

    onMount(async () => {
        const {parsedBody: parsedStatesBody} = await http<State[]>({
            input: `${apiBaseUrl}/states`,
            method: 'GET'
        });

        const {parsedBody: parsedCategoriesBody} = await http<Category[]>({
            input: `${apiBaseUrl}/categories`,
            method: 'GET'
        });

        if (parsedStatesBody && parsedCategoriesBody) {
            states = parsedStatesBody;
            categories = parsedCategoriesBody;
        }
    });

    const handleSubmitNewTodo = async (e: CustomEvent<SubmitEvent>) => {
        if (!e.detail.target) return;

        const formEl = e.detail.target as HTMLFormElement;
        const {parsedBody} = await http<RawTodo>({
            input: `${apiBaseUrl}/todos`,
            body: {
                activity: formEl.activity.value,
                deadline: formEl.deadline.value,
                categoryId: formEl.category.value,
                stateId: formEl.state.value
            },
            method: 'POST'
        });

        if (parsedBody) {
            onAddToTodos(parsedBody);
        }
    };
</script>

{#if states && categories}
    {#if states.length > 0 && categories.length > 0}
        <CreateRecordForm headingText="Nové Todo" on:submit={handleSubmitNewTodo}>
            <Input label="Činnost" name="activity" required/>
            <Input label="Deadline" name="deadline" type="datetime-local" required/>
            <Select label="Kategorie" items={categories} name="category" required/>
            <Select label="Plnění" items={states} name="state" required/>
        </CreateRecordForm>
    {:else}
        <p>
            Nelze vytvořit todo, protože stavy plnění nebo kategorie se buďto ještě načítají, nebo jsou
            prázdné.
        </p>
    {/if}
{/if}

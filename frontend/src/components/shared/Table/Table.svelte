<script lang="ts">
    import type {TableBodyRow, TableBodyRows, TableHeaderColumns} from '../../../types';
    import Header from './Header.svelte';
    import Actions from './Actions.svelte';
    import Column from './Column.svelte';

    export let headers: TableHeaderColumns;
    export let rows: TableBodyRows | undefined;
    export let onEditClick: (row: TableBodyRow) => void;
    export let onDeleteClick: (row: TableBodyRow) => void;
</script>

<section class="flex justify-center mt-8">
    {#if !rows || rows.length === 0}
        <p>Žádná data k zobrazení</p>
    {:else}
        <table>
            <Header {headers}/>
            {#each rows as row}
                <tr>
                    {#each Object.entries(headers) as [key]}
                        {#if key === 'actions'}
                            <Actions {onEditClick} {onDeleteClick} {row}/>
                        {:else}
                            <Column>{row[key]}</Column>
                        {/if}
                    {/each}
                </tr>
            {/each}
        </table>
    {/if}
</section>

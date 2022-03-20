<script lang="ts">
	import type { TableBodyRows, TableHeaderColumns } from '../../../types';
	import Header from './Header.svelte';
	import Actions from './Actions.svelte';

	// export let label: string;
	// 	export let name: string;
	// 	export let value: string | number;

	export let headers: TableHeaderColumns;
	export let rows: TableBodyRows | undefined;
</script>

{#if !rows || rows.length === 0}
	<p>no data</p>
{:else}
	<table>
		<Header {headers} />
		{#each rows as row}
			<tr>
				{#each Object.entries(headers) as [key]}
					{#if key === 'actions'}
						<Actions>
							<slot {row} />
						</Actions>
					{:else}
						<td>{row[key]}</td>
					{/if}
				{/each}
			</tr>
		{/each}
	</table>
{/if}

<!-- 
let content = <p>Žádná data k zobrazení</p>;

if (rows?.length >= 0) {
  content = (
    <StyledTable cellSpacing={0}>
      <Header headers={headers} />
      <Body
        headers={headers}
        rows={rows}
        deleteBtn={deleteBtn}
        editBtn={editBtn}
      />
    </StyledTable>
  );
}

return <div>{content}</div>; -->

<!-- import { FC } from 'react';

type Props = {
  headers: TableHeaderColumns;
  deleteBtn: DeleteBtn;
  editBtn: EditBtn;
  // eslint-disable-next-line react/require-default-props
  rows?: TableBodyRows;
};



import { Header } from '@/components/UI/Table/Header';
import { Body } from '@/components/UI/Table/Body';
import { DeleteBtn, EditBtn, TableBodyRows, TableHeaderColumns } from '@/types';
import styled from 'styled-components';

const StyledTable = styled.table`
  // & tr:last-child td:first-child {
  //   border-bottom-left-radius: ${({ theme }) => theme.radius.normal};
  // }
  // & tr:last-child td:last-child {
  //   border-bottom-right-radius: ${({ theme }) => theme.radius.normal};
  // }
  border-radius: ${({ theme }) => theme.radius.normal};
  border: 1px solid black;
  width: 100%;
  & tr:last-child td:first-child {
    border-bottom-left-radius: ${({ theme }) => theme.radius.normal};
  }
  & tr:last-child td:last-child {
    border-bottom-right-radius: ${({ theme }) => theme.radius.normal};
  }

  & td,
  th {
    border-bottom: 1px solid ${({ theme }) => theme.colors.medium.hex};
  }

  & tr:last-child td {
    border-bottom: none;
  }
`;

type Props = {
  headers: TableHeaderColumns;
  deleteBtn: DeleteBtn;
  editBtn: EditBtn;
  // eslint-disable-next-line react/require-default-props
  rows?: TableBodyRows;
};

// eslint-disable-next-line react/display-name
export const Table: FC<Props> = ({
  headers,
  rows = [],
  deleteBtn,
  editBtn,
}) => {
  let content = <p>Žádná data k zobrazení</p>;

  if (rows?.length >= 0) {
    content = (
      <StyledTable cellSpacing={0}>
        <Header headers={headers} />
        <Body
          headers={headers}
          rows={rows}
          deleteBtn={deleteBtn}
          editBtn={editBtn}
        />
      </StyledTable>
    );
  }

  return <div>{content}</div>;
}; -->

export type TableHeaderColumn = {
	name: string;
};

export type TableHeaderColumns = { [key: string | number]: TableHeaderColumn };

type KeyType = keyof TableHeaderColumns;

export type AnyAppRecord = {
	// eslint-disable-next-line no-unused-vars
	[key in KeyType]: string | number | boolean | Date;
};

export type TableBodyRow = AnyAppRecord;

export type TableBodyRows = TableBodyRow[];

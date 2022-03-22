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

export type Category = {
	id: number;
	name: string;
};

export type State = {
	id: number;
	name: string;
};

export type Todo = {
	id: number;
	activity: string;
	deadline: string;
	category: Category;
	state: State;
};

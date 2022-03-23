export type TableHeaderColumn = {
	name: string;
};

export type TableHeaderColumns = { [key: string | number]: TableHeaderColumn };

type KeyType = keyof TableHeaderColumns;

export type TableColumn = string | number | boolean | Date | Record<string, unknown>;

export type AnyAppRecord = {
	// eslint-disable-next-line no-unused-vars
	[key in KeyType]: TableColumn;
};

export type TableBodyRow = AnyAppRecord;

export type TableBodyRows = TableBodyRow[];

export type Category = {
	id: number;
	name: string;
	selected?: boolean;
};

export type State = {
	id: number;
	name: string;
	selected?: boolean;
};

export type Todo = {
	id: number;
	activity: string;
	deadline: Date;
	category_id: number;
	state_id: number;
	category: string;
	state: string;
};

export type RawTodo = {
	id: number;
	activity: string;
	deadline: Date;
	category_id: number;
	state_id: number;
	category: Category;
	state: State;
};

import type { RawTodo } from '../types';

export const transformTodoForTable = (todo: RawTodo) => ({
	...todo,
	deadline: new Date(todo.deadline),
	category: todo.category.name,
	state: todo.state.name
});

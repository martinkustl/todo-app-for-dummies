import { writable } from 'svelte/store';
import type { Todo } from '../types';

export const editableTodo = writable<Todo | undefined>();

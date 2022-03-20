import { writable } from 'svelte/store';
import type { Category } from '../types';

export const editableCategory = writable<Category | undefined>();

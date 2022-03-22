import { writable } from 'svelte/store';
import type { State } from '../types';

export const editableState = writable<State | undefined>();

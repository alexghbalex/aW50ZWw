import { createReducer, on } from '@ngrx/store';

export const initialState = {};

const cReducer = createReducer(
  initialState,
);

export function reducer(state, action): any {
  return cReducer(state, action);
}

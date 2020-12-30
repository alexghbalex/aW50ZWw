import { createReducer } from '@ngrx/store';

export const initialState = {
  annotations: []
};

const cReducer = createReducer(
  initialState,
  // on(MapActions.searchResult, (state, { searchResult }) => ({ ...state, lastSearch: searchResult }))
);

export function reducer(state, action): any {
  return cReducer(state, action);
}

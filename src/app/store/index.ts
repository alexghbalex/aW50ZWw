import { Annotations } from '../models';
import { createSelector } from '@ngrx/store';

export interface AppState {
  annotations: Annotations;
}

export const select = (state: AppState) => state;

export const selectAnnotations = createSelector(
  select,
  (state) => state.annotations
);

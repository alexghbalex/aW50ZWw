import { createReducer, on } from '@ngrx/store';
import { Annotations } from '../models';
import { MapActions } from './store.actions';

export const initialState: Annotations = {};

const cReducer = createReducer(
  initialState,
  on(MapActions.addAnnotation, (state, { annotation }) => ({
    ...state,
    [annotation.id]: annotation
  })),
  on(MapActions.removedAnnotation, (state, { annotationId }) => {
    const newState = Object.assign({}, state);
    delete newState[annotationId];
    return newState;
  })
);

export function reducer(state, action): any {
  return cReducer(state, action);
}

import { createReducer, on } from '@ngrx/store';
import { MapActions } from './store.actions';

export const initialState = {
  annotations: {},
  selectedAnnotation: null
};

const cReducer = createReducer(
  initialState,
  on(MapActions.createAnnotation, (state, { annotation }) => ({
    ...state,
    annotations: {
      ...state.annotations,
      [annotation.id]: annotation
    }
  })),
  on(MapActions.removeAnnotation, (state, { annotationId }) => {
    const annotations = Object.assign({}, state.annotations);
    delete annotations[annotationId];
    return {
      ...state,
      annotations
    };
  }),
  on(MapActions.selectAnnotation, (state, { annotation }) => ({
    ...state,
    selectedAnnotation: annotation
  }))
);

export function reducer(state, action): any {
  return cReducer(state, action);
}

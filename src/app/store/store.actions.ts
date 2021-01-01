import { createAction, props } from '@ngrx/store';
import { Annotations, FeatureWithCenter } from '../models';

const searchRequest = createAction('[API] Map Search Request', props<{ searchRequest: string }>());
const initDraw = createAction('[Annotations] Init draw', props<{ annotations: Annotations }>());
const createAnnotation = createAction('[Annotations] Add annotation', props<{ annotation: FeatureWithCenter }>());
const addAnnotation = createAction('[Annotations] Set annotation', props<{ annotation: string }>());
const removeAnnotation = createAction('[Annotations] Remove annotation', props<{ annotationId: string }>());
const selectAnnotation = createAction('[Annotations] Select annotation', props<{ annotation: FeatureWithCenter, toMap: boolean }>());

export const MapActions = {
  searchRequest,
  initDraw,
  createAnnotation,
  addAnnotation,
  removeAnnotation,
  selectAnnotation
};

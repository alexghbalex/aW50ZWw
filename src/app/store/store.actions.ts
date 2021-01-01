import { createAction, props } from '@ngrx/store';
import { FeatureWithCenter } from '../models';

const searchRequest = createAction('[API] Map Search Request', props<{ searchRequest: string }>());
const addAnnotation = createAction('[Annotations] Add annotation', props<{ annotation: FeatureWithCenter }>());
const removeAnnotation = createAction('[Annotations] Remove annotation', props<{ annotationId: string }>());

export const MapActions = {
  searchRequest,
  addAnnotation,
  removeAnnotation
};

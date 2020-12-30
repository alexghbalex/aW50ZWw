import { createAction, props } from '@ngrx/store';

const searchRequest = createAction('[API] Map Search Request', props<{ searchRequest: string }>());

export const MapActions = {
  searchRequest
};

import { Annotations, FeatureWithCenter } from '../models';

export interface AppState {
  data: {
    annotations: Annotations;
    selectedAnnotation: FeatureWithCenter;
  };
}

export const selectAnnotations = (state: AppState) => state.data.annotations;
export const selectedAnnotation = (state: AppState) => state.data.selectedAnnotation;

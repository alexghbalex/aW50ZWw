import { Feature } from 'geojson';
import { LngLatLike } from 'mapbox-gl';

export interface FeatureWithCenter extends Feature {
  center?: LngLatLike;
}

export type Annotations = { [id: string]: FeatureWithCenter };

export enum Shapes {
  point = 'Point',
  lineString = 'LineString',
  polygon = 'Polygon'
}

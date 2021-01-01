import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FeatureCollection } from 'geojson';
import { Annotations, FeatureWithCenter, Shapes } from '../models';
import { MapActions } from '../store/store.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../store';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public map: mapboxgl.Map;
  private draw: MapboxDraw;
  private lat = 31.771959;
  private lng = 35.217018;
  private zoom = 7;
  private selectedAnnotation: string | number;
  private readonly mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

  constructor(private http: HttpClient, private store: Store<AppState>) {
  }

  buildMap(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: this.zoom,
      center: [this.lng, this.lat],
      accessToken: environment.mapbox.accessToken
    });
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  searchMapLocation(searchRequest: string): Observable<FeatureCollection> {
    return this.http.get<FeatureCollection>(`${this.mapboxUrl}${encodeURI(searchRequest)}.json?access_token=${environment.mapbox.accessToken}`);
  }

  setMapLocation(location: FeatureWithCenter): void {
    this.map.setCenter(location.center);
    const zoom = location.bbox ? this.getZoom(location.bbox) : this.map.getZoom();
    this.map.setZoom(zoom);
  }

  initDraw(annotations: Annotations): void {
    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      modes: MapboxDraw.modes
    });

    if (this.map) {
      this.map
        .on('load', () => {
          for (const annotation in annotations) {
            if (annotations.hasOwnProperty(annotation)) {
              this.draw.add(annotations[annotation]);
            }
          }
        })
        .on('draw.create', e => this.store.dispatch(MapActions.createAnnotation({ annotation: e.features[0] })))
        .on('draw.selectionchange',
            e => e.features.length !== 0 && this.store.dispatch(MapActions.selectAnnotation({ annotation: e.features[0], toMap: false })))
        .on('draw.delete', e => e.features.forEach(annotation => this.removeAnnotation(annotation.id)));

      this.map.addControl(this.draw);
    }
  }

  addAnnotation(annotation: string): void {
    this.draw.changeMode(annotation);
  }

  removeAnnotation(id: string): void {
    this.draw.delete(id);
  }

  selectAnnotation(currentFeature: FeatureWithCenter): void {
    switch (currentFeature.geometry.type) {
      case Shapes.point:
        this.map.flyTo({
          center: currentFeature.geometry.coordinates,
          zoom: this.map.getZoom()
        } as mapboxgl.FlyToOptions);
        break;
      case Shapes.lineString:
        this.map.fitBounds(this.getBounds(currentFeature.geometry.coordinates));
        break;
      case Shapes.polygon:
        this.map.fitBounds(this.getBounds(currentFeature.geometry.coordinates[0]));
        break;
      default:
    }
  }

  private getZoom(bbox: number[]): number {
    const bounds = this.map.getBounds();
    const screenLonDelta = bounds.getEast() - bounds.getWest();
    const screenLatDelta = bounds.getNorth() - bounds.getSouth();

    const targetLonDelta = Math.abs(bbox[0] - bbox[2]);
    const targetLatDelta = Math.abs(bbox[1] - bbox[3]);

    const zoomLatMultiplier = screenLatDelta / targetLatDelta;
    const zoomLonMultiplier = screenLonDelta / targetLonDelta;

    const latZoom = Math.log2(zoomLatMultiplier);
    const lonZoom = Math.log2(zoomLonMultiplier);

    return this.map.getZoom() + Math.min(latZoom, lonZoom);
  }

  private getBounds(coordinates): mapboxgl.LngLatBoundsLike {
    return coordinates.reduce((bbox, coord) => bbox.extend(coord), new mapboxgl.LngLatBounds(coordinates[0], coordinates[1]));
  }
}

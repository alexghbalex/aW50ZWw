import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FeatureCollection } from 'geojson';
import { FeatureWithCenter } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map: mapboxgl.Map;
  private lat = 31.771959;
  private lng = 35.217018;
  private zoom = 7;
  private readonly mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

  constructor(private http: HttpClient) {
  }

  getMap(): mapboxgl.Map {
    return this.map;
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
}

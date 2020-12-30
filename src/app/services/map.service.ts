import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: mapboxgl.Map;
  lat = 31.771959;
  lng = 35.217018;
  zoom = 7;
  readonly mapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

  constructor(private http: HttpClient) {
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

  searchMapLocation(searchRequest: string): Observable<any> {
    return this.http.get(`${this.mapboxUrl}${encodeURI(searchRequest)}.json?access_token=${environment.mapbox.accessToken}`);
  }

  setMapLocation(location): void {
    this.map.setMaxBounds(location.bbox);
    this.map.setCenter(location.center);
  }
}

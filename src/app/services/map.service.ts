import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import * as mapboxgl from 'mapbox-gl';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  map: mapboxgl.Map;
  lat = 31.771959;
  lng = 35.217018;
  zoom = 7;

  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }

  buildMap(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      zoom: this.zoom,
      center: [this.lng, this.lat]
    });
    this.map.addControl(new mapboxgl.NavigationControl());
    console.log('>>> ', this.map, mapboxgl);
  }
}

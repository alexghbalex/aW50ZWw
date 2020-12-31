import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw';
import * as mapboxgl from 'mapbox-gl';
import { Store } from '@ngrx/store';
import { MapService } from '../../services/map.service';
import { Subscription } from 'rxjs';
import { Annotations, FeatureWithCenter, Shapes } from '../../models';
import { Position } from 'geojson';
import { MapActions } from '../../store/store.actions';
import { AppState, selectAnnotations } from '../../store';

@Component({
  selector: 'app-annotations',
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.scss']
})
export class AnnotationsComponent implements OnInit, OnDestroy, AfterContentInit {
  readonly buttons = [
    { name: Shapes.point, annotation: 'draw_point' },
    { name: Shapes.lineString, annotation: 'draw_line_string' },
    { name: Shapes.polygon, annotation: 'draw_polygon' }
  ];
  private map: mapboxgl.Map;
  private draw: MapboxDraw;
  private subscription: Subscription;
  annotations: Annotations;
  selectedAnnotation: string | number;

  constructor(private store: Store<AppState>, private mapService: MapService) {
  }

  ngOnInit(): void {
    this.map = this.mapService.getMap();
    this.subscription = this.store.select(selectAnnotations).subscribe(annotations => this.annotations = annotations);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterContentInit(): void {
    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      modes: MapboxDraw.modes
    });

    this.map
      .on('load', () => {
        for (const annotation in this.annotations) {
          if (this.annotations.hasOwnProperty(annotation)) {
            this.draw.add(this.annotations[annotation]);
          }
        }
      })
      .on('draw.create', e => this.store.dispatch(MapActions.addAnnotation(e.features[0])))
      .on('draw.selectionchange', e => e.features.length !== 0 && (this.selectedAnnotation = e.features[0].id))
      .on('draw.delete', e => e.features.forEach(annotation => this.removeAnnotation(annotation.id)));

    this.map.addControl(this.draw);
  }

  setAnnotation(annotation: string): void {
    this.draw.changeMode(annotation);
  }

  removeAnnotation(id: string): void {
    this.store.dispatch(MapActions.removedAnnotation({ annotationId: id }));
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
        const coordinates: Position[] = currentFeature.geometry.coordinates;
        const bounds = coordinates.reduce(
          (result: mapboxgl.LngLatBounds, curr: Position) => result.extend(curr as mapboxgl.LngLatBoundsLike),
          new mapboxgl.LngLatBounds(coordinates[0] as mapboxgl.LngLatLike, coordinates[1] as mapboxgl.LngLatLike));
        this.map.fitBounds(bounds, { padding: 20 });
        break;
      case Shapes.polygon:
        this.map.fitBounds(currentFeature.bbox as mapboxgl.LngLatBoundsLike, { padding: 20 });
        break;
      default:
    }
    this.selectedAnnotation = currentFeature.id;
  }
}

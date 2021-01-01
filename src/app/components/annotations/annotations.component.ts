import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MapService } from '../../services/map.service';
import { Subscription } from 'rxjs';
import { Annotations, FeatureWithCenter, Shapes } from '../../models';
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
  private subscription: Subscription;
  annotations: Annotations;

  constructor(private store: Store<AppState>, public mapService: MapService) {
  }

  ngOnInit(): void {
    this.subscription = this.store.select(selectAnnotations).subscribe(annotations => this.annotations = annotations);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterContentInit(): void {
    this.mapService.drawInit(this.annotations);
  }

  setAnnotation(annotation: string): void {
    this.mapService.setAnnotation(annotation);
  }

  removeAnnotation(id: string): void {
    this.mapService.removeAnnotation(id);
  }

  selectAnnotation(currentFeature: FeatureWithCenter): void {
    this.mapService.selectAnnotation(currentFeature);
  }
}

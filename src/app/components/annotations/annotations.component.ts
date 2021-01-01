import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Annotations, FeatureWithCenter, Shapes } from '../../models';
import { AppState, selectAnnotations, selectedAnnotation } from '../../store';
import { MapActions } from '../../store/store.actions';

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
  selectedAnnotation: Observable<FeatureWithCenter>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.subscription = this.store.select(selectAnnotations)
      .subscribe((annotations: Annotations) => this.annotations = annotations);
    this.selectedAnnotation = this.store.select(selectedAnnotation);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterContentInit(): void {
    this.store.dispatch(MapActions.initDraw({ annotations: this.annotations }));
  }

  addAnnotation(annotation: string): void {
    this.store.dispatch(MapActions.addAnnotation({ annotation }));
  }

  removeAnnotation(id: string): void {
    this.store.dispatch(MapActions.removeAnnotation({ annotationId: id }));
  }

  selectAnnotation(currentFeature: FeatureWithCenter): void {
    this.store.dispatch(MapActions.selectAnnotation({ annotation: currentFeature, toMap: true }));
  }
}

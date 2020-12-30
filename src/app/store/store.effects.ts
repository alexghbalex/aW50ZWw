import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MapService } from '../services/map.service';
import { catchError, filter, map, switchMap } from 'rxjs/operators';
import { MapActions } from './store.actions';

@Injectable()
export class StoreEffects {

  search$ = createEffect(() => this.actions$.pipe(
    ofType(MapActions.searchRequest),
    switchMap((action) => this.mapService.searchMapLocation(action.searchRequest)
      .pipe(
        filter(searchResult => searchResult && searchResult.features && searchResult.features.length),
        map(searchResult => this.mapService.setMapLocation(searchResult.features[0])),
        catchError(() => null)
      ))
    ), { dispatch: false }
  );

  constructor(private actions$: Actions, private mapService: MapService) {
  }
}

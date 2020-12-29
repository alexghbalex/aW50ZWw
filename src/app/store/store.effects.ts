import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { MapService } from '../services/map.service';

@Injectable()
export class StoreEffects {

  constructor(
    private actions$: Actions,
    private mapService: MapService
  ) {
  }
}

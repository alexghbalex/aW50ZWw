import { TestBed } from '@angular/core/testing';
import { MapService } from './map.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
import { initialState } from '../store/store.reducer';

describe('MapService', () => {
  let service: MapService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, StoreModule],
      providers: [
        { provide: Store, useValue: { data: initialState }  }
      ],
    });
    service = TestBed.inject(MapService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

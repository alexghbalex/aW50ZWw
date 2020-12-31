import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { MapActions } from '../../store/store.actions';

type Status = 'VALID' | 'INVALID';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchRequest = new FormControl('', [Validators.required, Validators.maxLength(256)]);
  status$: Observable<Status>;

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.status$ = this.searchRequest.statusChanges;
  }

  search(): void {
    this.store.dispatch(MapActions.searchRequest({ searchRequest: this.searchRequest.value }));
  }
}

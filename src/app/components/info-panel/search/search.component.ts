import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

type Status = 'VALID' | 'INVALID';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchString = new FormControl('', Validators.required);
  status$: Observable<Status>;

  constructor() {
  }

  ngOnInit(): void {
    this.status$ = this.searchString.statusChanges;
  }

  search() {

  }
}

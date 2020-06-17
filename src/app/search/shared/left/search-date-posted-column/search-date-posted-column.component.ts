import { Component, OnInit, Input } from '@angular/core';
import { DATE_POSTED } from 'src/app/_shared/models/shared/shared.models';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-date-posted-column',
  templateUrl: './search-date-posted-column.component.html',
  styleUrls: ['./search-date-posted-column.component.scss']
})
export class SearchDatePostedColumnComponent implements OnInit {

  postedDates = DATE_POSTED;

  form:FormGroup;

  constructor() {
    this.form = new FormGroup({});
   }

  ngOnInit() {
  }

}

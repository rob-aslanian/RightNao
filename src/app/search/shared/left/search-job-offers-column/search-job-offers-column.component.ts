import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SearchService } from 'src/app/search/search.service';

@Component({
  selector: 'app-search-job-offers-column',
  templateUrl: './search-job-offers-column.component.html',
  styleUrls: ['./search-job-offers-column.component.scss']
})
export class SearchJobOffersColumnComponent implements OnInit {

  form:FormGroup;
  constructor(
    public searchService:SearchService
  ) {
    this.form = new FormGroup({});
   }

  ngOnInit() {
  }

}

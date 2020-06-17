import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SearchService } from 'src/app/search/search.service';

@Component({
  selector: 'app-search-age-column',
  templateUrl: './search-age-column.component.html',
  styleUrls: ['./search-age-column.component.scss']
})
export class SearchAgeColumnComponent implements OnInit {

  form:FormGroup;

  constructor(
    private searchService:SearchService,
    private f:FormBuilder,
  ) {
    this.form = f.group({});
   }

  ngOnInit() {
  }

}

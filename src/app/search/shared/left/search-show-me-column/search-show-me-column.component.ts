import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-show-me-column',
  templateUrl: './search-show-me-column.component.html',
  styleUrls: ['./search-show-me-column.component.scss']
})
export class SearchShowMeColumnComponent implements OnInit {

  form:FormGroup;

  constructor() {
    this.form = new FormGroup({});
   }

  ngOnInit() {
  }

  resetAll(){
    this.form
        .get('search_for_organizations').reset();

    this.form
        .get('search_for_companies').reset();
  }

}

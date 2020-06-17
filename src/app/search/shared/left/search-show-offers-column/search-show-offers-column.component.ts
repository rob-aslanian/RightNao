import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search-show-offers-column',
  templateUrl: './search-show-offers-column.component.html',
  styleUrls: ['./search-show-offers-column.component.scss']
})
export class SearchShowOffersColumnComponent implements OnInit {

  form:FormGroup;

  constructor() { 
    this.form = new FormGroup({});
  }

  ngOnInit() {
  }

}

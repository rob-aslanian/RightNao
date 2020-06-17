import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SERVICE_LOCATION } from 'src/app/search/models/search.model';

@Component({
  selector: 'app-search-location',
  templateUrl: './search-location.component.html',
  styleUrls: ['./search-location.component.scss']
})
export class SearchLocationComponent implements OnInit {

  form:FormGroup;
  LocationTypes = SERVICE_LOCATION;

  constructor( ) { 
    this.form = new FormGroup({});
  }

  ngOnInit() {

  }




}

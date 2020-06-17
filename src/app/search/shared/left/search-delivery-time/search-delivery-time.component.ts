import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DELIVERY_TIME } from 'src/app/search/models/search.model';

@Component({
  selector: 'app-search-delivery-time',
  templateUrl: './search-delivery-time.component.html',
  styleUrls: ['./search-delivery-time.component.scss']
})
export class SearchDeliveryTimeComponent implements OnInit {

  form:FormGroup;
  DeliveryTimes = DELIVERY_TIME;
  constructor() { 
    this.form = new FormGroup({});
  }

  ngOnInit() {
  }

}

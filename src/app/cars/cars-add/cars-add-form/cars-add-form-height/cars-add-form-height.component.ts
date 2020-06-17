import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cars-add-form-height',
  templateUrl: './cars-add-form-height.component.html',
  styleUrls: ['./cars-add-form-height.component.scss']
})
export class CarsAddFormHeightComponent implements OnInit {
  form:FormGroup;
  CarsHeight = [
    {
      text: 'mt',
      type: 'METER'
    },
    {
      text: 'ft',
      type: 'FOOT'
    }
  ]

  constructor() { 
    this.form = new FormGroup({});
  }

  ngOnInit() {
  }

}

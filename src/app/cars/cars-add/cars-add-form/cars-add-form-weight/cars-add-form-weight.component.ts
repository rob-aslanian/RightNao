import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CarsWeghtUnit } from 'src/app/cars/models/cars.type';

@Component({
  selector: 'app-cars-add-form-weight',
  templateUrl: './cars-add-form-weight.component.html',
  styleUrls: ['./cars-add-form-weight.component.scss']
})
export class CarsAddFormWeightComponent implements OnInit {
  form:FormGroup;
  carsWeight:CarsWeghtUnit [] = [ 'KG', 'LP' ];

  constructor() {
    this.form = new FormGroup({});
   }

  ngOnInit() {
  }

}

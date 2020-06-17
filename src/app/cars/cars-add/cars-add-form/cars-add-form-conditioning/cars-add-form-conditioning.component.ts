import { Component, OnInit } from '@angular/core';
import { CarsConditioningModel } from 'src/app/cars/models/cars.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cars-add-form-conditioning',
  templateUrl: './cars-add-form-conditioning.component.html',
  styleUrls: ['./cars-add-form-conditioning.component.scss']
})
export class CarsAddFormConditioningComponent implements OnInit {
  form:FormGroup
  airConditioning = CarsConditioningModel;

  constructor() {
    this.form = new FormGroup({});
  }

  ngOnInit() {
  }

}

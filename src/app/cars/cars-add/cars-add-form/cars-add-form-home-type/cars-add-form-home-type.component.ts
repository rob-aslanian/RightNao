import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MotorHomeModel } from 'src/app/cars/models/cars.model';

@Component({
  selector: 'app-cars-add-form-home-type',
  templateUrl: './cars-add-form-home-type.component.html',
  styleUrls: ['./cars-add-form-home-type.component.scss']
})
export class CarsAddFormHomeTypeComponent implements OnInit {
  form:FormGroup;
  homeTypes = MotorHomeModel;

  constructor() {
    this.form = new FormGroup({});
   }

  ngOnInit() {
  }

}

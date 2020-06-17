import { Component, OnInit } from '@angular/core';
import { CarsLifeStyleModel } from 'src/app/cars/models/cars.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cars-add-form-life',
  templateUrl: './cars-add-form-life.component.html',
  styleUrls: ['./cars-add-form-life.component.scss']
})
export class CarsAddFormLifeComponent implements OnInit {
  form:FormGroup;
  lifeStyles = CarsLifeStyleModel;

  constructor() {
    this.form = new FormGroup({});
  }

  ngOnInit() {
  }

}

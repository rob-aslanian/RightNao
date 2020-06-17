import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cars-add-form-consumption',
  templateUrl: './cars-add-form-consumption.component.html',
  styleUrls: ['./cars-add-form-consumption.component.scss']
})
export class CarsAddFormConsumptionComponent implements OnInit {
  form:FormGroup;
  fuelConsumptions = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

  constructor() {
    this.form = new FormGroup({});
   }

  ngOnInit() {
  }
  parseToInt(e, controlName) {
    let value = e.target.value;
     this.form.get(controlName).setValue(+value);
    }

}

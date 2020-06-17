import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cars-add-form-power',
  templateUrl: './cars-add-form-power.component.html',
  styleUrls: ['./cars-add-form-power.component.scss']
})
export class CarsAddFormPowerComponent implements OnInit {
  form:FormGroup;

  powerUnits = [ 'KW', 'PS' ];

  constructor() {
    this.form = new FormGroup({});
   }

  ngOnInit() {
  }

}

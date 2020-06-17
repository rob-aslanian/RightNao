import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cars-add-form-cylinders',
  templateUrl: './cars-add-form-cylinders.component.html',
  styleUrls: ['./cars-add-form-cylinders.component.scss']
})
export class CarsAddFormCylindersComponent implements OnInit {
  form:FormGroup;
  cylindersAmount = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]

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

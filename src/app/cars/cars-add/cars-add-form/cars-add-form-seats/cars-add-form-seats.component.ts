import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cars-add-form-seats',
  templateUrl: './cars-add-form-seats.component.html',
  styleUrls: ['./cars-add-form-seats.component.scss']
})
export class CarsAddFormSeatsComponent implements OnInit {
  form:FormGroup;
  seats = [ 2, 4, 6, 8, ];

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

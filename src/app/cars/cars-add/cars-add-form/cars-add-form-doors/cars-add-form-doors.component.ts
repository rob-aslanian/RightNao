import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cars-add-form-doors',
  templateUrl: './cars-add-form-doors.component.html',
  styleUrls: ['./cars-add-form-doors.component.scss']
})
export class CarsAddFormDoorsComponent implements OnInit {
  form:FormGroup;
  doors = [ 2, 3, 4, 5 ];

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

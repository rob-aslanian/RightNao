import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cars-add-form-engine',
  templateUrl: './cars-add-form-engine.component.html',
  styleUrls: ['./cars-add-form-engine.component.scss']
})
export class CarsAddFormEngineComponent implements OnInit {
  form:FormGroup;
  engineSize = [ 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5 ]
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

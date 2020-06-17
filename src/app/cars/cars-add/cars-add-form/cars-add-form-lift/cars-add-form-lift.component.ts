import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cars-add-form-lift',
  templateUrl: './cars-add-form-lift.component.html',
  styleUrls: ['./cars-add-form-lift.component.scss']
})
export class CarsAddFormLiftComponent implements OnInit {

  form:FormGroup;
  CarsLiftHeight = [ 'LP', 'KG'];

  constructor() { 
    this.form = new FormGroup({});
  }

  ngOnInit() {
  }
}

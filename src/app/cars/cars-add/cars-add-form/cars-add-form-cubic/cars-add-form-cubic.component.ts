import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cars-add-form-cubic',
  templateUrl: './cars-add-form-cubic.component.html',
  styleUrls: ['./cars-add-form-cubic.component.scss']
})
export class CarsAddFormCubicComponent implements OnInit {
  form:FormGroup;
  cubics = [ 50, 80, 125, 250, 500, 750, 1000, 15000 ];

  constructor() {
    this.form = new FormGroup({});
   }

  ngOnInit() {
  }

}

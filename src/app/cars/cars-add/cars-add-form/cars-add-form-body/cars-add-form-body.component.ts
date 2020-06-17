import { Component, OnInit } from '@angular/core';
import { CarsBodyModel } from 'src/app/cars/models/cars.model';
import { FormGroup } from '@angular/forms';
import { CarsAddService } from '../../cars-add.service';

@Component({
  selector: 'app-cars-add-form-body',
  templateUrl: './cars-add-form-body.component.html',
  styleUrls: ['./cars-add-form-body.component.scss']
})
export class CarsAddFormBodyComponent implements OnInit {
  form:FormGroup;
  carsBodyTypes = CarsBodyModel;
  type;
  isSubmitted:boolean = false;

  constructor(
    private addServoce:CarsAddService
  ) {
    this.form = new FormGroup({});
    this.type = this.addServoce.type.value;
   }

  ngOnInit() {
    this.addServoce.isSubmitted.subscribe( data => this.isSubmitted = data )
  }

}

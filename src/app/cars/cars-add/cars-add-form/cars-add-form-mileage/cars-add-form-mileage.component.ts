import { Component, OnInit } from '@angular/core';
import { CarsMileageModel } from 'src/app/cars/models/cars.model';
import { FormGroup } from '@angular/forms';
import { CarsAddService } from '../../cars-add.service';

@Component({
  selector: 'app-cars-add-form-mileage',
  templateUrl: './cars-add-form-mileage.component.html',
  styleUrls: ['./cars-add-form-mileage.component.scss']
})
export class CarsAddFormMileageComponent implements OnInit {
  form:FormGroup;
  carsMileage = CarsMileageModel;
  isSubmitted:boolean = false;
  constructor(
    private addService:CarsAddService
  ) {
    this.form = new FormGroup({});
  }

  ngOnInit() {
    this.addService.isSubmitted.subscribe( data => this.isSubmitted = data )
  }

}

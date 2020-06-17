import { Component, OnInit } from '@angular/core';
import { CarsFuelModel } from 'src/app/cars/models/cars.model';
import { FormGroup } from '@angular/forms';
import { CarsAddService } from '../../cars-add.service';

@Component({
  selector: 'app-cars-add-form-fuel',
  templateUrl: './cars-add-form-fuel.component.html',
  styleUrls: ['./cars-add-form-fuel.component.scss']
})
export class CarsAddFormFuelComponent implements OnInit {
  form:FormGroup;
  fuelTypes = CarsFuelModel;
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

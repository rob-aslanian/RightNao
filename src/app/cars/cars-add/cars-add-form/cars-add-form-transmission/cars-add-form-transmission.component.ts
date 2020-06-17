import { Component, OnInit } from '@angular/core';
import { CarsTransmissionModel } from 'src/app/cars/models/cars.model';
import { FormGroup } from '@angular/forms';
import { CarsAddService } from '../../cars-add.service';

@Component({
  selector: 'app-cars-add-form-transmission',
  templateUrl: './cars-add-form-transmission.component.html',
  styleUrls: ['./cars-add-form-transmission.component.scss']
})
export class CarsAddFormTransmissionComponent implements OnInit {
  form:FormGroup
  transmissions =  CarsTransmissionModel;
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

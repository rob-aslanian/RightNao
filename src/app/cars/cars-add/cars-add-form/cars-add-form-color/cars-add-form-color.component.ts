import { Component, OnInit } from '@angular/core';
import { CarsColorModel } from 'src/app/cars/models/cars.model';
import { FormGroup } from '@angular/forms';
import { CarsAddService } from '../../cars-add.service';

@Component({
  selector: 'app-cars-add-form-color',
  templateUrl: './cars-add-form-color.component.html',
  styleUrls: ['./cars-add-form-color.component.scss']
})
export class CarsAddFormColorComponent implements OnInit {
  form:FormGroup;
  isSubmitted:boolean = false;

  colors = CarsColorModel;
  constructor(
    private addService:CarsAddService
  ) {
    this.form = new FormGroup({});
   }

  ngOnInit() {
    this.addService.isSubmitted.subscribe( data => this.isSubmitted = data )
  }

}

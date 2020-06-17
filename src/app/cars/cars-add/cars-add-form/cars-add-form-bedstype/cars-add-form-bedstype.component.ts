import { Component, OnInit } from '@angular/core';
import { CarsAddService } from '../../cars-add.service';
import { FormGroup } from '@angular/forms';
import { CarsBedModal } from 'src/app/cars/models/cars.model';

@Component({
  selector: 'app-cars-add-form-bedstype',
  templateUrl: './cars-add-form-bedstype.component.html',
  styleUrls: ['./cars-add-form-bedstype.component.scss']
})
export class CarsAddFormBedstypeComponent implements OnInit {
  form:FormGroup;
  isSubmitted:boolean = false;
  bedsTypes = CarsBedModal;

  constructor(
    private addService:CarsAddService
  ) {
    this.form = new FormGroup({});
   }

  ngOnInit() {
    this.addService.isSubmitted.subscribe( data => this.isSubmitted = data )
  }

}

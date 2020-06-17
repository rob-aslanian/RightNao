import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CarsAddService } from '../../cars-add.service';

@Component({
  selector: 'app-cars-add-form-price',
  templateUrl: './cars-add-form-price.component.html',
  styleUrls: ['./cars-add-form-price.component.scss']
})
export class CarsAddFormPriceComponent implements OnInit {
  form:FormGroup;
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

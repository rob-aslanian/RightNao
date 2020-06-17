import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CarsAddService } from '../../cars-add.service';

@Component({
  selector: 'app-cars-add-form-bedsnumber',
  templateUrl: './cars-add-form-bedsnumber.component.html',
  styleUrls: ['./cars-add-form-bedsnumber.component.scss']
})
export class CarsAddFormBedsnumberComponent implements OnInit {
  form:FormGroup;
  isSubmitted:boolean = false;

  constructor(
    private addService:CarsAddService
  ) { 
    this.form = new FormGroup({})
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CarsAddService } from '../../cars-add.service';

@Component({
  selector: 'app-cars-add-form-repossessed',
  templateUrl: './cars-add-form-repossessed.component.html',
  styleUrls: ['./cars-add-form-repossessed.component.scss']
})
export class CarsAddFormRepossessedComponent implements OnInit {
  form:FormGroup;
  isSubmitted:boolean = false;

  constructor(
    private addService:CarsAddService
  ) {
    this.form = new FormGroup({})
   }

  ngOnInit() {
    this.addService.isSubmitted.subscribe( data => this.isSubmitted = data )
  }

}

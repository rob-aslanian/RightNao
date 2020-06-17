import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Years } from 'src/app/_shared/models/date.model';
import { CarsAddService } from '../../cars-add.service';

@Component({
  selector: 'app-cars-add-form-years',
  templateUrl: './cars-add-form-years.component.html',
  styleUrls: ['./cars-add-form-years.component.scss']
})
export class CarsAddFormYearsComponent implements OnInit {
  form:FormGroup;
  isSubmitted:boolean = false;
  years = Years;

  constructor(
    private addService:CarsAddService
  ) {
    this.form = new FormGroup({});
   }

  ngOnInit() {
    this.addService.isSubmitted.subscribe( data => this.isSubmitted = data )
  }
  parseToInt(e, controlName) {
    let value = e.target.value;
     this.form.get(controlName).setValue(+value);
    }

}

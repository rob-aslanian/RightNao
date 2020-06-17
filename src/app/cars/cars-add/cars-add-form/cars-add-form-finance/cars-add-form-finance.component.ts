import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CarsAddService } from '../../cars-add.service';

@Component({
  selector: 'app-cars-add-form-finance',
  templateUrl: './cars-add-form-finance.component.html',
  styleUrls: ['./cars-add-form-finance.component.scss']
})
export class CarsAddFormFinanceComponent implements OnInit {
  form:FormGroup;
  mthList = this.getMth();
  isSubmitted:boolean = false;

  constructor(
    private addService:CarsAddService
  ) {
    this.form = new FormGroup({});
   }

  ngOnInit() {
    this.addService.isSubmitted.subscribe( data => this.isSubmitted = data )
  }

  getMth() {
    let mth = [];
    for(let i=1; i<=48;i++)
    mth.push(i)
    return mth;
  }

  parseToInt(e, controlName) {
    let value = e.target.value;
     this.form.get('finance').get(controlName).setValue(+value);
    }

}

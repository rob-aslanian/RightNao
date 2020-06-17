import { Component, OnInit } from '@angular/core';
import { CarsModels } from 'src/app/cars/models/cars.model';
import { CarsBrands } from 'src/app/cars/models/brands.model';
import { CarsAddService } from '../../cars-add.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cars-add-main-type',
  templateUrl: './cars-add-main-type.component.html',
  styleUrls: ['./cars-add-main-type.component.scss']
})
export class CarsAddMainTypeComponent implements OnInit {
  form:FormGroup;
  types = CarsModels;
  brandList;
  isTruck:boolean = false;
  isSubmitted:boolean = false;
  action:string = 'add';

  constructor(
    private addServoce:CarsAddService,
    private activeRoute:ActivatedRoute
  ) {
    this.form = this.addServoce.carAddForm.value;
   }

  ngOnInit() {
    this.addServoce.isSubmitted.subscribe( data => this.isSubmitted = data )
    this.addServoce.carAddForm.subscribe( data => this.form = data)
    this.activeRoute.parent.params.subscribe( data =>  {
      this.action = data['action'];
      if(this.action == 'edit' && this.addServoce.type.value == 'TRUCK') {
        this.isTruck = true;
      }
    } )
    
  }

  selectType(e){
    let value = e.target.value;
    this.isTruck = value == 'TRUCK' ? true : false;
    this.addServoce.type.next(value);
    this.addServoce.isSubmitted.next(false);
    
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { TruckTypeModel } from 'src/app/cars/models/cars.model';
import { FormGroup, FormControl } from '@angular/forms';
import { CarsAddService } from '../../cars-add.service';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-cars-add-main-truck',
  templateUrl: './cars-add-main-truck.component.html',
  styleUrls: ['./cars-add-main-truck.component.scss']
})
export class CarsAddMainTruckComponent implements OnInit {
  @Input() action:string;
  form:FormGroup;
  truckTypes = TruckTypeModel;
  isSubmitted:boolean = false;

  constructor(
    private addService:CarsAddService
  ) { 
    this.form = new FormGroup({
      truckType: new FormControl()
    });
  }

  ngOnInit() {
    this.addService.isSubmitted.subscribe( data => this.isSubmitted = data )
  }

  selectTruckType(e){
    let value = e.target.value;
    this.addService.truckType.next(value);
    this.form = this.addService.carAddForm.value;
  }
}

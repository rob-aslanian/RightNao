import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CarsAddService } from '../../cars-add.service';

@Component({
  selector: 'app-cars-add-form-capacity',
  templateUrl: './cars-add-form-capacity.component.html',
  styleUrls: ['./cars-add-form-capacity.component.scss']
})
export class CarsAddFormCapacityComponent implements OnInit {
  form:FormGroup;
  capacityUnits = [ 'KG', 'LP' ];
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

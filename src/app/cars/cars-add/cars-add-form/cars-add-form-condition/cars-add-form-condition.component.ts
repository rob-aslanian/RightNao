import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CarsAddService } from '../../cars-add.service';

@Component({
  selector: 'app-cars-add-form-condition',
  templateUrl: './cars-add-form-condition.component.html',
  styleUrls: ['./cars-add-form-condition.component.scss']
})
export class CarsAddFormConditionComponent implements OnInit {

  form:FormGroup;
  isSubmitted:boolean;

  conditions = [ 
    {
      text: 'New',
      type:'NEW'
    },
    {
      text: 'Demo',
      type:'DEMO'
    },
    {
      text: 'Used',
      type:'USED'
    } ];

  constructor(
    private addService:CarsAddService
  ) {
    this.form = new FormGroup({});
   }

  ngOnInit() {
    this.addService.isSubmitted.subscribe( data => this.isSubmitted = data )
    
  }

}

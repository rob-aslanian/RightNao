import { Component, OnInit } from '@angular/core';
import { CarsHistoryModel } from 'src/app/cars/models/cars.model';
import { FormGroup } from '@angular/forms';
import { CarsAddService } from '../../cars-add.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cars-add-form-history',
  templateUrl: './cars-add-form-history.component.html',
  styleUrls: ['./cars-add-form-history.component.scss']
})
export class CarsAddFormHistoryComponent implements OnInit {

  form:FormGroup;
  carsHistory = CarsHistoryModel.map( (el) => { return {...el, isSelected: false} } );
  historyList = [];
  isSubmitted:boolean = false;
  constructor(
    private addService:CarsAddService,
    private activatedRouter:ActivatedRoute
  ) {
    this.form = new FormGroup({});
   }

  ngOnInit() {
    this.addService.isSubmitted.subscribe( data => this.isSubmitted = data )
    this.activatedRouter.parent.params.subscribe( ({ action }) => { 
      if( action == 'edit' ) {
        console.log('sss', this.form.get('vehicleHistory').value);
        console.log('aa', this.carsHistory);
        
        
        for(let i = 0; i<this.carsHistory.length;i++) {
          for(let j = 0; j<this.form.get('vehicleHistory').value.length; j++) {
            if(this.carsHistory[i]['type'] == this.form.get('vehicleHistory').value[j] ){
              this.carsHistory[i]['isSelected'] = true;
            }
          }
        }
        this.historyList = this.form.get('vehicleHistory').value;
      }
      
  } )
}


  changeHistory(e) {
    let value = e.target.value;
    let checked = e.target.checked;
    if(checked) {
      this.historyList.push(value)
    } else {
      this.historyList = this.historyList.filter( elem => elem != value )
    }
    this.form.get('vehicleHistory').setValue(this.historyList);
    
  }

}

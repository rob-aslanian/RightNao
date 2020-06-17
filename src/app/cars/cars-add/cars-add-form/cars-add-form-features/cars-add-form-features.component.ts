import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CarsAddService } from '../../cars-add.service';
import { CarsFeaturesModel, CarsEnvinromentModel } from 'src/app/cars/models/cars.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cars-add-form-features',
  templateUrl: './cars-add-form-features.component.html',
  styleUrls: ['./cars-add-form-features.component.scss']
})
export class CarsAddFormFeaturesComponent implements OnInit {
  type;
  form:FormGroup;
  envinronmentList = [];
  featuresList = [];
  selectedList = [];
  isSubmitted:boolean = false;
  constructor(
    private addService:CarsAddService,
    private activatedRouter:ActivatedRoute
  ) { 
    this.form = new FormGroup({});
    this.type = this.addService.type.value == 'TRUCK' ?
                this.addService.truckType.value : 
                this.addService.type.value;
    this.featuresList = CarsFeaturesModel[this.type] ? 
                        CarsFeaturesModel[this.type]
                        .map( (el) => { return {...el, isSelected: false} } ) : 
                        [];
    this.envinronmentList = CarsEnvinromentModel[this.type] ? 
                            CarsEnvinromentModel[this.type]
                            .map( (el) => { return {...el, isSelected: false} } ) : 
                            [];
  }

  ngOnInit() {
    this.addService.isSubmitted.subscribe( data => this.isSubmitted = data )

    this.activatedRouter.parent.params.subscribe( ({ action }) => {
      if( action == 'edit' ) {
        this.patchValueForEdit(this.featuresList);
        this.patchValueForEdit(this.envinronmentList);
      }
    } )


    
  }
  selectBox(e){
    let value = e.target.value;
    let checked = e.target.checked;
    if(checked) {
      this.selectedList.push(value)
    } else {
      this.selectedList = this.selectedList.filter( elem => elem != value )
    }
    this.form.get('feature').setValue(this.selectedList);
  }

  patchValueForEdit(list) {
    let value = this.form.get('feature').value;
    for(let i = 0; i<list.length;i++) {
      for(let j = 0; j<value.length; j++) {
        if(list[i]['type'] == value[j] ){
          list[i]['isSelected'] = true;
        }
      }
    }
    this.selectedList = value;

  }
}

import { Component, OnInit } from '@angular/core';
import { CarsBrands } from 'src/app/cars/models/brands.model';
import { FormGroup } from '@angular/forms';
import { CarsAddService } from '../../cars-add.service';

@Component({
  selector: 'app-cars-add-main-brand',
  templateUrl: './cars-add-main-brand.component.html',
  styleUrls: ['./cars-add-main-brand.component.scss']
})
export class CarsAddMainBrandComponent implements OnInit {
  form:FormGroup;
  brandList;
  type;
  isSubmitted:boolean = false;


  constructor(
    private addService:CarsAddService
  ) { 
    this.form = new FormGroup({});
  }

  ngOnInit() {
    this.addService.isSubmitted.subscribe( data => this.isSubmitted = data )
    
    this.addService.type.subscribe( type => { this.type = type == 'TRUCK' ? 
                                              '' : this.addService.type.value;
                                              this.brandList = CarsBrands[this.type];
                                            })
     this.addService.truckType.subscribe( type => {this.brandList = type ? CarsBrands[type] : this.brandList;} )
  }
  selectBrand(e) {
    let value = e.target.value;
    console.log(value);
  }

}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdsServicesService } from '../ads-services.service';
import { Category, SubCategory } from '../models/models';
import { AddAdsService } from './add-ads.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-add-ads-services',
  templateUrl: './add-ads-services.component.html',
  styleUrls: ['./add-ads-services.component.scss']
})
export class AddAdsServicesComponent implements OnInit {
  servicesForm:FormGroup;
  isSubmitted:boolean = false;
  categoryList = Category;
  subCategoryList = [];
  files = [];
  editServiceId:string;
  constructor(
    private fb:FormBuilder,
    private adsService:AdsServicesService,
    private addService:AddAdsService,
    private activeRoute:ActivatedRoute,
    private route:Router
  ) {
    this.servicesForm = this.addService.addForm
  }

  ngOnInit() {
    this.addService.isSubmitted.subscribe( data => this.isSubmitted = data );
    this.activeRoute.params
        .subscribe( ( {id} ) =>  { this.editServiceId = id;
                                   this.subCategoryList = SubCategory[this.servicesForm.get('service').value] } );
  }

  selectService(e){
    this.subCategoryList = SubCategory[e.target.value];
  }
  


  getFiles( e: any ) {
    this.addService.files.next(e.slider);
    if(e['_case'] == 'delete' && this.editServiceId && e['deletedId']) {
      this.adsService.RemoveAdServiceFile(this.editServiceId,[e['deletedId']])
                      .subscribe( data => console.log(data) )
    }
  }

  next(){
    this.addService.isSubmitted.next(true);
    if(this.addService.addForm.valid){
      if(this.editServiceId){
        let input = {
          service_id: this.editServiceId,
          company_id:this.adsService.companyId,
          ...this.servicesForm.value
        }
        input['phones'].forEach(el => el['country_code_id'] = +el['country_code_id']);
        this.adsService.EditAdService(input)
                        .subscribe( data => console.log(data) );
      } else {
        this.route.navigate(['ads-services/add/payment'])
      }
      
    }
    window.scrollTo({behavior: 'smooth', top: 0});
  }
}

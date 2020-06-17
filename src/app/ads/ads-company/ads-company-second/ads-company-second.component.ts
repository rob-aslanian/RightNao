import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdsService } from 'src/app/_shared/services/ads/ads.service';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { IAdsReview } from 'src/app/_shared/models/ads/shared.interface';

@Component({
  selector: 'app-ads-company-second',
  templateUrl: './ads-company-second.component.html',
  styleUrls: ['./ads-company-second.component.scss']
})
export class AdsCompanySecondComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;

  @Output() back:EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() form:FormGroup;

  name:FormControl;
  modalType: string;
  profile: any;
  adsReview:IAdsReview;
  utils = utilities;

  constructor(
    private adsService:AdsService
  ) { 
    this.name = new FormControl('')
  }

  ngOnInit() {
    this.getProfile();
  }

  setAdsReview() : IAdsReview {
    let form = this.form.value,
        address = this.getCompanyAddress(),
        industry = this.profile.industry;

    return this.adsReview =  {
      preview:{
        name:this.profile.name,
        image:this.profile.avatar ? '/file/' + this.profile.avatar :  'assets/img/default-company.svg',
        top_title:industry ? utilities.getInudsryName(industry.id) : undefined ,
        bottom_title:address,
      },
      location:form.location ? utilities.getCountryName(form.location) : undefined,
      currency:form.currency,
      start_date:form.start_date
    }
  }

  getCompanyAddress() : string {
    let address:any[] = this.profile.addresses;

  
    

    if(address.length > 0){
      let addr = address.find(addr => addr.primary);
      return `${addr.city.city} , ${ utilities.getCountryName(addr.country_id) }`;
    }

    return '';
  }

  getProfile() {
    this.adsService
        .getCompanyProfile()
        .subscribe(
          (data) => { this.profile = data},
        )
  }

  open(type:string){
    this.setAdsReview();
    this.modal.open();
    this.modal.title = 'Review';
    this.modalType = type;

  }

  getReview(type:string){
    this.modal.close();
    if(type === 'publish') return this.publish();
  }

  publish(){
    if(this.name.valid){
      this.adsService
        .CreateAdvertJob({
          ...this.form.value,
          name:this.name.value,
          location:[
            {city:{},
             country_id:this.form.value.location
            }
          ],
        })
        .subscribe()
    }
  }

}

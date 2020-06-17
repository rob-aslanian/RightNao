import { Component, OnInit } from '@angular/core';
import { BannerAdvirtismentType } from '../models/ads.model';
import { FormGroup, FormBuilder, FormArray, Form } from '@angular/forms';
import { AdsService } from 'src/app/_shared/services/ads/ads.service';
import { Observable } from 'rxjs';
import { IAdsBanner } from 'src/app/_shared/models/ads';
import { AdsBannerService } from './ads-banner.service';
import { utilities } from 'src/app/_shared/utilities/utilities';

@Component({
  selector: 'app-ads-banner',
  templateUrl: './ads-banner.component.html',
  styleUrls: ['./ads-banner.component.scss']
})
export class AdsBannerComponent implements OnInit {

  amount:Observable<any>;
  bannerTypes = BannerAdvirtismentType;
  bannerForm:FormGroup;
  _places = [
    {
      name:'User',
      type:'user',
      selected:false
    },
    {
      name:'Company & Organization',
      type:'company',
      selected:false
    }
  ]

  advert:IAdsBanner = {};
  showTotal:boolean = false;
  page:number = 1;
  utils = utilities;


  constructor(
    private f:FormBuilder,
    private adsService:AdsService,
    private adsBannerService:AdsBannerService
  ) {
    this.bannerForm = f.group({

          location:[''],
          currency:[''],
          places:f.array([]),
          start_date:['']
    })

    this.initaliazePlaces()
   }
   

  ngOnInit() {
    this.formChanges();
    /// Get Audience number 
    this.getAudienceNumber();
  }


  get form() {
    return this.bannerForm.controls;
  }

  get places() : FormArray {
    return this.bannerForm.get('places') as FormArray;
  }

  initaliazePlaces(){
    this._places.map(pls => {
      let control = this.f.control(false);
      this.places.push(control)
    });
  }

  formChanges(){
    this.bannerForm
        .valueChanges
        .subscribe(
          (data) => { this.showTotal = true; }
        )
  }

  getAudienceNumber(){
    this.places
        .valueChanges
        .subscribe(
          (chks:any[]) => {
            let amount = [];

            chks.map((el , i ) => {

              if(el) { amount.push(this._places[i].type) }
              else { amount.splice(i , 1) }
            })

            this.advert['places'] = amount;
            
            // let all = chks.every(el => el);

            // if(all) { this.amount = this.adsService.getProfilesAmount() }
            // else{
            //   this.amount = chks[0] ? this.adsService.getUserAmount() :
            //                           this.adsService.getCompanyAmount();
            // }
          }
        )
  }

  next(){
     if(this.bannerForm.valid) { 
      let form = this.bannerForm.value;

      this.adsBannerService.bannerFirstForm = {
        ...form,
        location:{
          city:{},
          country_id:form.location
        },
        places:this.advert['places']
      }

      this.page = 2; 
      
      window.scroll({top:0 , behavior:'smooth'});
    }
    
  }

  back(){
    window.scroll({top:0 , behavior:'smooth'})

    this.page = 1;
  }

  trackByFn =  (index) => index;


}

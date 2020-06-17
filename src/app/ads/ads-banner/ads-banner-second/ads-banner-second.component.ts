import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { IAdsContent, IAdsBanner } from 'src/app/_shared/models/ads';
import { AdsBannerService } from '../ads-banner.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdsService } from 'src/app/_shared/services/ads/ads.service';
import { IAdsReview } from 'src/app/_shared/models/ads/shared.interface';
import { utilities } from 'src/app/_shared/utilities/utilities';

@Component({
  selector: 'app-ads-banner-second',
  templateUrl: './ads-banner-second.component.html',
  styleUrls: ['./ads-banner-second.component.scss']
})
export class AdsBannerSecondComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;

  @Output() back:EventEmitter<boolean> = new EventEmitter<boolean>();

  modalType:string;
  advert:IAdsBanner = {};
  bannerForm:FormGroup;
  content:IAdsContent;

  constructor(
    private adsBannerService:AdsBannerService,
    private adsService:AdsService,
    private f:FormBuilder
  ) { 
    this.bannerForm = f.group({
        name:[''],
        destination_url:[''],
        is_responsive:[false],
    })
  }

  ngOnInit() {
    
  }

  get form(){
    return this.bannerForm.controls;
  }

  get isResponsive() : boolean{
    return this.form.is_responsive.value
  }

  get advertBanner() : IAdsBanner {
    return this.advert = {
      contents:[this.content],
      ...this.adsBannerService.bannerFirstForm,
      ...this.bannerForm.value
    }
  }

  get adsForReview()  : IAdsReview {
    let firstBanner = this.adsBannerService.bannerFirstForm;

    return {
      ...firstBanner,
      preview:{
        image:this.content ? this.content._image : undefined,
        top_title:this.isResponsive && this.content? this.content.title : undefined,
        description:this.isResponsive && this.content ? this.content.description : undefined
      },
      url:this.bannerForm.get('destination_url').value,
      location:utilities.getCountryName(firstBanner.location['country_id'])
    }
  }

  getGalleryAmount(){
    this.adsService
        .GetAdvertGallery('1' , '0')
        .subscribe((data) => this.adsBannerService.amount = data['amount'])
  }
  
  open(type:string){
    this.modalType = type;
    this.modal.open();

    this.adsBannerService.modal = this.modal;

    if(type !== 'review'){
      this.getGalleryAmount();
      this.modal.title = 'Create Content';
    }
    else{
      this.modal.title = 'Review';
    }

  }

  getContent(content:IAdsContent) {
    this.modal.close();
    this.content = content;
  }

  getReview(type:string){
    this.modal.close();

    return type === 'draft' ?
           this.saveDraft() :
           this.publish();
  }

  publish(){
    if(this.bannerForm.valid){
      this.adsService
          .CreateBannerAdvert(this.advertBanner)
          .subscribe(
            (data) => {
              
            }
          )
    }
    
  }
  

  saveDraft(){
     this.adsService
         .CreateBannerDraftAdvert(this.advertBanner)
         .subscribe(
           (data) => {
  
             
           }
         )
  }

}

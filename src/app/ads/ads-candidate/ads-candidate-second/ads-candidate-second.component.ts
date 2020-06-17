import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { AdsService } from 'src/app/_shared/services/ads/ads.service';
import { Observable } from 'rxjs';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { IAdsReview } from 'src/app/_shared/models/ads/shared.interface';
import { AdsBannerService } from '../../ads-banner/ads-banner.service';
import { AdsCandidateService } from '../ads-candidate.service';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-ads-candidate-second',
  templateUrl: './ads-candidate-second.component.html',
  styleUrls: ['./ads-candidate-second.component.scss']
})
export class AdsCandidateSecondComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;

  @Output() back:EventEmitter<boolean> = new EventEmitter<any>();

  profile;
  modalType: string;
  name:FormControl;
 // adsReview:IAdsReview;

  constructor(
    private adsService:AdsService,
    private adsCandidateService:AdsCandidateService
  ) { 
    this.name = new FormControl('');
  }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
   this.adsService
       .getProfile()
       .subscribe(
        (data) => { this.profile = data},
       )
  }

  get adsReview() : IAdsReview {
    let adsCandidate = this.adsCandidateService.adsCandidate;


    return  {
      preview:{
        name:`${this.profile.firstname} ${this.profile.lastname}`,
        image:this.profile.avatar ? '/file/' + this.profile.avatar :  'assets/img/124.svg',
        top_title:this.profile.experiences[0] ? this.profile.experiences[0].title : undefined,
        bottom_title:this.profile.experiences[0] ? this.profile.experiences[0].company : undefined,
      },
      location:adsCandidate.location[0] ? utilities.getCountryName(adsCandidate.location[0].country_id) : undefined,
      currency:adsCandidate.currency,
      start_date:adsCandidate.start_date
    }
  }

  open(type:string){
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
        .CreateAdvertCandidate({
          name:this.name.value,
          ...this.adsCandidateService.adsCandidate
        })
        .subscribe()
    }
  }



}

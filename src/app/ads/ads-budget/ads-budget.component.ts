import { Component, OnInit, ViewChild } from '@angular/core';
import { adsImpressions, adsClicks, openBox, adsForwards, adsReferrals } from './model';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { AdsService } from 'src/app/_shared/services/ads/ads.service';
import { Router } from '@angular/router';
import { AdsCreateService } from '../ads-create/ads-create.service';

@Component({
  selector: 'app-ads-budget',
  templateUrl: './ads-budget.component.html',
  styleUrls: ['./ads-budget.component.scss']
})
export class AdsBudgetComponent implements OnInit {



  @ViewChild( AppModalComponent, { static: true } ) _modal: AppModalComponent;

  campaignName;

  utils = utilities;

  getToday = utilities.getToday();
  openBox:{
    [id:number]: {
      open: boolean,
      selectedCards: number
    }
    } = openBox;


  impressions = adsImpressions;
  clicks = adsClicks;
  forwards = adsForwards;
  referrals = adsReferrals;
  allCategory = [];

  date;

  result = [];

  constructor(
    private adsService: AdsService,
    private route: Router,
    private adsCreateService: AdsCreateService
  ) {}

  ngOnInit() {
    this.allCategory.push(this.impressions, 
                          this.clicks, 
                          this.forwards, 
                          this.referrals);
  }

  selectBox(categoryIndex:number, boxIndex:number, e: any) {
    if(this.openBox[categoryIndex]['selectedCards'] == boxIndex) {
      this.openBox[categoryIndex]['selectedCards'] = -1;
      this.allCategory[categoryIndex][boxIndex]['active'] = false;
      this.total();
      return;
    }
    this.openBox[categoryIndex]['selectedCards'] = boxIndex;
    this.allCategory[categoryIndex].forEach( el =>  el['active'] = false )
    this.allCategory[categoryIndex][boxIndex]['active'] = true;
    this.total();
  }

  addCurrency(e) {
    this.adsService.input.currency = e.target.value;
  }

  saveBudget() {
    let input = this.adsService.input;
    input.impressions = input.clicks = input.referals = input.forwarding = 0;
    
    this.result.forEach((el) => {
      input[el['title']] = el['count'];      
    })
    if(!input.impressions) {
      input.impressions = 1000000;
    }

    
    // let month = this.date.month.length>1 ? this.date.month : `0${this.date.month}`;
    let dateInput = `${this.date.day}-${this.date.month}-${this.date.year}`;
    this.adsService.input.start_date = dateInput;
    
    this.openModal();
  }

  createCampaign() {
    let input = this.adsService.input;
    input.name = this.campaignName;
    
    this.adsService.CreateAdvertCampaign(input)
                    .subscribe((data) => {
                      let campaign_id = data['data']['CreateAdvertCampaign']['id'];

                      if(this.adsService.input.type != 'banner') {
                        this.createAdvertByCampaign(campaign_id);
                        this.closeModal();
                        this.route.navigate(['/ads'])
                      } else {

                        this.closeModal()
                        this.adsCreateService.campaign_id = campaign_id;
                        let format = this.adsService.input.formats[0].toLowerCase();
                        this.adsCreateService.activeFormat = format;
                        console.log('format!!!', format);
                        
                        this.route.navigate([`/ads/create/${format}`])
                      }
                    })
  }

  createAdvertByCampaign(campaign_id) {
    let advertContent = this.adsService.inputContent;
    this.adsService.CreateAdvertByCampaign(campaign_id, advertContent)
                    .subscribe( (data) => {
                    })
  }

  total() {
    this.result = [];
    let keys = [0, 1, 2, 3];

    keys.forEach ( (key) => {
      if(openBox[key]['selectedCards']>=0 && this.allCategory[key][openBox[key]['selectedCards']]['value']['price']) {
        this.result.push({
          ...this.allCategory[key][openBox[key]['selectedCards']]['value'],
          title: openBox[key]['title']
        })
      }
    } )
    
  }

  plus(e, input) {
    e.preventDefault();
    input.price_per += 1;
  }
  minus(e, input) {
    e.preventDefault();
    if(input.price_per<=1) {
      return
    } 
    input.price_per -= 1;
  }
  openModal() {
    this._modal.open();
  };
  closeModal() {
    this._modal.close();
  }

}

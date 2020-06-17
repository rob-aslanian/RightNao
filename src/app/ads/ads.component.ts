import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AdsService } from '../_shared/services/ads/ads.service';
import { Router } from '@angular/router';
import { AdsCreateService } from './ads-create/ads-create.service';
import { FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from '../_shared/register.validator';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AdsComponent implements OnInit {


  constructor(
    private adsService:AdsService,
    private adsCreateService:AdsCreateService,
    private route:Router,
    private fb:FormBuilder
  ) { }

  headerBtn;

  ngOnInit() {
    this.adsService.headerBtn.next('manager');
    this.adsService.GetAdvertExample()
                  .subscribe((data) => {
                    console.log(data);
                    
                  })
    this.adsService.headerBtn
                  .subscribe( data =>  this.headerBtn = data )
                  console.log(this.headerBtn);
                  
    
  }

  newCampaign(){
    let btnType = {
      type: 'manager',
      format: ''
    }
    this.adsService.headerBtn.next(btnType);
    this.route.navigate(['/ads']);
  }
  newAd() {
    let format = this.headerBtn['format'].toLowerCase();
    this.adsCreateService.campaign_id = this.headerBtn['type'];
    this.adsCreateService.activeFormat = format;

    this.adsCreateService.adsContentForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      url: ['', Validators.compose([Validators.required, PasswordValidation.detectURL])],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
      line: ['', Validators.compose([Validators.required])],
      image: ['', Validators.required]
    });
    this.adsCreateService.adsContent.next({});
    this.route.navigate([`/ads/create/${format}`]);

    let btnType = {
      type: 'manager',
      format: ''
    }
    this.adsService.headerBtn.next(btnType);
    
    console.log('he',this.headerBtn.value);
    
  }

}

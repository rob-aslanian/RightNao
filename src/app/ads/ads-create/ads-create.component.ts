import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdsCreateService } from './ads-create.service';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { PasswordValidation } from 'src/app/_shared/register.validator';
import { AdsService } from 'src/app/_shared/services/ads/ads.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ads-create',
  templateUrl: './ads-create.component.html',
  styleUrls: ['./ads-create.component.scss']
})
export class AdsCreateComponent implements OnInit {
  destroy$:Subject<any> = new Subject<any>();
  adsForm:FormGroup;
  activeFormat ;

  constructor(
    private fb:FormBuilder,
    private adsCreateService: AdsCreateService,
    private adsService: AdsService,
    private route: Router
  ) {}

  ngOnInit() {

    this.activeFormat = this.adsCreateService.activeFormat;

    console.log('activeFormat', this.activeFormat);
    
    
    this.adsForm = this.adsCreateService.adsContentForm;
    this.adsForm.valueChanges
                .pipe(takeUntil(this.destroy$))
                .subscribe( (data) => {
                  
                  this.adsCreateService.adsContent.next(data);
                } )
  }

  get adFm(){
    return this.adsForm.controls;
  }
  createAdd() {
    this.adsService.inputContent = this.adsCreateService.activeFormat == 'carousel' ? 
                                    this.adsCreateService.carouselAdd() : 
                                    this.adsCreateService.responsiveAdd()

    this.createAdvertByCampaign(this.adsCreateService.campaign_id);

    this.route.navigate(['/ads'])
  }

  createAdvertByCampaign(campaign_id) {
    let advertContent = this.adsService.inputContent;
    this.adsService.CreateAdvertByCampaign(campaign_id, advertContent)
                    .subscribe( (data) => {
                      let id = data['data']['CreateAdvertByCampaign']['id'];
                      this.adsCreateService.uploadFilesToDb(id)
                                            .subscribe((data) => {
                                            })
                    })
  }
  createNewAdd() {
    
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { AdsCreateService } from '../../ads-create/ads-create.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-ads-preview-spotlight',
  templateUrl: './ads-preview-spotlight.component.html',
  styleUrls: ['./ads-preview-spotlight.component.scss']
})
export class AdsPreviewSpotlightComponent implements OnInit,OnDestroy {
  content = {};
  destroy$:Subject<any> = new Subject<any>();
  activeFormat = '';
  url:string = '';

  user;
  constructor(
    private userProService:GlobalUserProService,
    private adsCreateService:AdsCreateService
  ) { 
    this.user = userProService.getUserProfile();
  }

  ngOnInit() {
    this.activeFormat = this.adsCreateService.activeFormat;

    this.adsCreateService.adsContent
                        .pipe(takeUntil(this.destroy$))
                        .subscribe( ( resp ) => {
                            this.content = resp;
                            
                        })
    this.adsCreateService.adsContentForm.get('url').valueChanges
                                        .pipe(takeUntil(this.destroy$))
                                        .subscribe( (data) => {
                                          this.url = data;

                                        })
                            
    
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

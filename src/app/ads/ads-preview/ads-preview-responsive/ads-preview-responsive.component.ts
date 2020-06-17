import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdsCreateService } from '../../ads-create/ads-create.service';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ads-preview-responsive',
  templateUrl: './ads-preview-responsive.component.html',
  styleUrls: ['./ads-preview-responsive.component.scss']
})
export class AdsPreviewResponsiveComponent implements OnInit, OnDestroy {
  content = {};
  destroy$:Subject<any> = new Subject<any>();
  activeFormat = '';

  constructor(
    private adsCreateService: AdsCreateService,
    private aRoute: ActivatedRoute
    ) {

            
   }


  //  \\\\////
  // { @ ^ @ }
  // /(    )\
  //  /  /\ \

  ngOnInit() {


    this.activeFormat = this.adsCreateService.activeFormat;
    

    this.adsCreateService.adsContent
                        .pipe(
                        takeUntil(this.destroy$),
                        distinctUntilChanged(),
                        debounceTime(200))
                        .subscribe( ( resp ) => {
                            this.content = resp;
                            
                        })
                            
    
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

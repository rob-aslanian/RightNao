import { Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { SearchByType } from 'src/app/search/models/search.model';
import { SearchService } from 'src/app/search/search.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search-main-content',
  templateUrl: './search-main-content.component.html',
  styleUrls: ['./search-main-content.component.scss'],
})
export class SearchMainContentComponent implements OnInit , AfterViewInit , OnDestroy {

  type:SearchByType;
  isCompany:boolean;
  destroy$:Subject<any> = new Subject<any>();

  @Input() data;
  @Input() amount:number;


  constructor(
    private searchService:SearchService,
    private globalService:GlobalUserProService
  ) { 
    this.type = this.searchService.type;
    this.isCompany = this.globalService.isCompanyActive();
  }

  ngOnInit() {
        
  }

  ngAfterViewInit(): void {
    this.searchService.adsList
        .pipe(takeUntil(this.destroy$))
        .subscribe(ads => {
           if(ads) {
             if(ads.length > 0) {
                ads.forEach(async (ad , idx) => {
                  let indexOfElem = this.data.findIndex(el => el.id === ad.id || (el.user && el.user.id === ad.id));
                   // Id ad is has in data
                   if(indexOfElem > -1){
                     
                      this.data[indexOfElem].isAd = true;
                      this.data[indexOfElem].clicks = ad.clicks
                      this.data[indexOfElem].ad_id = ad.ad_id

                      this.data.splice(indexOfElem , 1, this.data.splice(idx , 1, this.data[indexOfElem])[0])
                   } 
                   // Find profile by name 
                   else {
                     let profiles = await this.searchService.searchAll({
                        first:1,
                        after:"0",
                      } , {
                         name:[ad.name],
                         full_name:ad.name,
                         keywords:[ad.name],
                      }).toPromise()

                      if(profiles){
                        let values:any = Object.values(profiles)[0];
                         this.data.unshift(...values.map(el => {
                           el.isAd = true;
                           el.clicks = ad.clicks;
                           el.ad_id = ad.ad_id;
                           return el;
                         }))
                      }

                   }
                })
             }
     
           }
          
        })    
    
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    
  }
}

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IAdsCommon } from '../../ads-provice.model';
import { AdvertFormatType } from 'src/app/_shared/models/ads/ads.type';
import { SearchService } from 'src/app/search/search.service';

@Component({
  selector: 'app-ads-search',
  // templateUrl: './ads-search.component.html',
  template:`<ng-container></ng-container>`,
  styleUrls: ['./ads-search.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class AdsSearchComponent implements OnInit , IAdsCommon {
  
  private _data;

  get data(){
    return this._data;
  }

  set data(value){
    this._data = value;
    this.getData();
  }

  click = () => {}
  formates:AdvertFormatType[] = ["BUSINESS_SEARCH" , "CANDIDATE_SEARCH" , "ESTATE_SEARCH",
                                 "JOB_SEARCH" , "OFFICE_SEARCH" , "PROFESSIONAL_SEARCH" , 
                                 "SHOP_SEARCH" , "PRODUCT_SEARCH" , "SERVICE_SEARCH"];


  constructor(
    private searchService:SearchService
  ) { }

  ngOnInit() {

  }

  getData(){
     if(this.data.length > 0) {
        let idsSet:Set<{}> = new Set<{}>();
        
         this.data.forEach((el) => {
              idsSet.add({
                id:el.type_id,
                name:el.name,
                clicks:el.campaing_clicks,
                ad_id:el.id,
              });
         });
            
       this.searchService.adsList.next(Array.from(idsSet)); 
        
     }
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { CATEGORIES } from 'src/app/for-sale/models/model';

@Component({
  selector: 'app-clasified-ads-header',
  templateUrl: './clasified-ads-header.component.html',
  styleUrls: ['./clasified-ads-header.component.scss']
})
export class ClasifiedAdsHeaderComponent implements OnInit {

  @Input() type: string = 'service';
  manage: string ;
  CATEGORIES = CATEGORIES;
  selected: string = 'Home and garden';
  add: string;
  queryParams: any = {};


  constructor() { }

  ngOnInit() {
    if( this.type === 'service' ) {
          this.manage = '/ads-services/manage/announcement';
          this.add = '/ads-services/add';
    }else if(this.type === 'community'){
          this.manage = '/for-sale/manage/announcement';
          this.add = '/for-sale/add-for-sale/community';
          this.queryParams = { type: 'community' };
    }else {
         this.manage = '/for-sale/manage/announcement'
         this.add = '/for-sale/add-for-sale';
    }
  }

  updateQueryParams(bla, name) {
     this.selected = name;
  };

}

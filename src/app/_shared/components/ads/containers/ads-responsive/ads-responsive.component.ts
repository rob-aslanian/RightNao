import { Component, OnInit } from '@angular/core';
import { AdvertFormatType } from 'src/app/_shared/models/ads/ads.type';
import { IAdsCommon } from '../../ads-provice.model';

@Component({
  selector: 'app-ads-responsive',
  templateUrl: './ads-responsive.component.html',
})
export class AdsResponsiveComponent implements OnInit , IAdsCommon {

  formates:AdvertFormatType[] = ["RESPONSIVE"];
  data;
  click = () => {};
  
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { AdvertFormatType } from 'src/app/_shared/models/ads/ads.type';
import { IAdsCommon } from '../../ads-provice.model';

@Component({
  selector: 'app-ads-spotlight',
  templateUrl: './ads-spotlight.component.html',
})
export class AdsSpotlightComponent implements OnInit , IAdsCommon {

  formates:AdvertFormatType[] = ["SPOTLIGHT"]
  data;
  click = () => {};
  
  constructor() { }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { AdvertFormatType } from 'src/app/_shared/models/ads/ads.type';
import { IAdsCommon } from '../../ads-provice.model';

@Component({
  selector: 'app-ads-image',
  templateUrl: './ads-image.component.html',
  styleUrls: ['./ads-image.component.scss']
})
export class AdsImageComponent implements OnInit , IAdsCommon {

  formates:AdvertFormatType[] = ["IMAGE"]
  data;
  click = () => {};

  constructor(
  ) { }

  ngOnInit() {
    
  }

}

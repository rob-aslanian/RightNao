import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SliderBadBoyEditionComponent } from '../slider-bad-boy-edition/slider-bad-boy-edition.component';

@Component({
  selector: 'app-clasified-ads-landing-slider',
  templateUrl: './clasified-ads-landing-slider.component.html',
  styleUrls: ['./clasified-ads-landing-slider.component.scss']
})
export class ClasifiedAdsLandingSliderComponent implements OnInit {

  @ViewChild(SliderBadBoyEditionComponent, {static: false}) _slider: SliderBadBoyEditionComponent;

  activePage: number = 0;
  path: string = '' ;
  url = {
    'service': '/ads-services/add',
    'for-sale': '/for-sale/add-for-sale',
    'community': '/for-sale/add-for-sale/community'
  };
   
  @Input()
    type: string = 'service';


  list: any[] = [
      {
          img: 'assets/img/2873534.png',
          header: 'BUY AND SELL ON RIGHTNAO SHOP',
          paragraph: 'Find a product you want or create your own online store',
          button: 'Sell an items'
      },
      {
        img: 'assets/img/alesia-kazantceva-XLm6-fPwK5Q-unsplash.jpg',
        header: 'BUY AND SELL ON RIGHTNAO SHOP',
        paragraph: 'Find a product you want or create your own online store',
        button: 'Sell an items'
    },
    {
        img: 'assets/img/marvin-meyer-SYTO3xs06fU-unsplash.jpg',
        header: 'BUY AND SELL ON RIGHTNAO SHOP',
        paragraph: 'Find a product you want or create your own online store',
        button: 'Sell an items'
    }
  ];
   
  constructor() { }
 
  ngOnInit() {
    this.path = this.url[this.type];
  }

  changeSlide( idx: number, e: any ) {
      e.stopPropagation()
      const position = -(idx * this._slider.getWIdth());
      this._slider
          .setPosition(position);
      this.activePage = idx;
  };

}

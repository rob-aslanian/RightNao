import { Component, OnInit, ViewChild } from '@angular/core';
import { ForSaleService } from 'src/app/for-sale/for-sale.service';
import { ActivatedRoute } from '@angular/router';
import { SliderBadBoyEditionComponent } from '../slider-bad-boy-edition/slider-bad-boy-edition.component';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { AdsServicesService } from 'src/app/ads-services/ads-services.service';

@Component({
  selector: 'app-clasified-ads-detailed',
  templateUrl: './clasified-ads-detailed.component.html',
  styleUrls: ['./clasified-ads-detailed.component.scss']
})
export class ClasifiedAdsDetailedComponent implements OnInit {

  data:any = null;
  @ViewChild(SliderBadBoyEditionComponent, {static: false}) _slider: SliderBadBoyEditionComponent;
  activeIndex: number = 0;
  src: string = '';
  utils = utilities;
  type: any = '';
  

  constructor(
    private forSaleService: ForSaleService,
    private activatedRoute: ActivatedRoute,
    private adsService: AdsServicesService

  ) {
    this.type = activatedRoute.snapshot.data['type'];
   }

  ngOnInit() {
    if(this.type === 'service') {
      this.adsService
          .GetAdServiceByID(this.activatedRoute.snapshot.params['id'])
          .subscribe(data => {this.data = data; this.src = this.data.files[0]['address']})

    }else{
      this.forSaleService
          .getForSaleByID(this.activatedRoute.snapshot.params['id'])
          .subscribe(data => {this.data = data; this.src = this.data.files[0]['address']; console.log(this.data)});
    }
  }

  
 makeActive(idx: number, adress: string) {
    this.activeIndex = idx;
    this.src = adress;
 };

 getNotified(has_liked, id ) {
  const mutation = has_liked ? 
                   this.forSaleService.UnLikeForSale(id) :
                   this.forSaleService.likeForSale(id);
  mutation.subscribe(() => this.data.has_liked =  !this.data.has_liked );
  }
}



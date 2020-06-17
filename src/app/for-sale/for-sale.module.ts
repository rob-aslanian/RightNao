import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForSaleComponent } from './for-sale.component';
import { ForSaleRoutingModule } from './for-sale-routing.module';
import { ClassifiedAdsModule } from '../_shared/shared/classified-ads/classified-ads.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AddForSaleComponent } from './add-for-sale/add-for-sale.component';
import { SharedModule } from '../_shared/shared.module';
import { ForSaleService } from './for-sale.service';
import { PaymentPetsComponent } from './add-for-sale/payment-sale/payment-sale.component';
import { ForSaleDetailedComponent } from './for-sale-detailed/for-sale-detailed.component';
import { ForSaleManageComponent } from './for-sale-manage/for-sale-manage.component';
import { StringToNumberPipe } from './string-to-number.pipe';


@NgModule({
  declarations: [ 
    ForSaleComponent, 
    LandingPageComponent, 
    AddForSaleComponent,
    PaymentPetsComponent,
    ForSaleDetailedComponent,
    ForSaleManageComponent
  ],
  imports: [
    CommonModule,
    ForSaleRoutingModule,
    ClassifiedAdsModule,
    SharedModule
  ],
  providers: [
    {
      provide: ForSaleService,
      useClass: ForSaleService
    }
  ]
})

export class ForSaleModule { }

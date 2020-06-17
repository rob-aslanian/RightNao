import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdsServicesComponent } from './ads-services.component';
import { AdsServicesRoutingModule } from './ads-services-routing.module'
import { ClassifiedAdsModule } from '../_shared/shared/classified-ads/classified-ads.module';
import { AddAdsServicesComponent } from './add-ads-services/add-ads-services.component';
import { AddPriceComponent } from './add-ads-services/add-price/add-price.component';
import { AddLocationComponent } from './add-ads-services/add-location/add-location.component';
import { NgbTypeaheadModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../_shared/shared.module';
import { PhonesComponent } from './add-ads-services/phones/phones.component';
import { PaymentComponent } from './add-ads-services/payment/payment.component';
import { EditAdsServicesComponent } from './edit-ads-services/edit-ads-services.component';
import { AdsServiceLandingPageComponent } from './ads-service-landing-page/ads-service-landing-page.component';
import { AdsServiceDetailedComponent } from './ads-service-detailed/ads-service-detailed.component';
import { ManageAdsServicesComponent } from './manage-ads-services/manage-ads-services.component';

@NgModule({
  declarations: [
    AdsServicesComponent, 
    AddAdsServicesComponent, 
    AddPriceComponent, 
    AddLocationComponent, 
    PhonesComponent, 
    ManageAdsServicesComponent,
    PaymentComponent, 
    EditAdsServicesComponent, 
    AdsServiceLandingPageComponent, 
    AdsServiceDetailedComponent,
  ],
  imports: [
    CommonModule,
    AdsServicesRoutingModule,
    ClassifiedAdsModule,
    SharedModule,
    NgbTypeaheadModule,
    NgbDropdownModule
  ]
})
export class AdsServicesModule { }

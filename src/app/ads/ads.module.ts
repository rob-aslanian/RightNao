import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdsRoutingModule } from './ads-routing.module';
import { AdsComponent } from './ads.component';
import { AdsBannerComponent } from './ads-banner/ads-banner.component';
import { AdsCandidateComponent } from './ads-candidate/ads-candidate.component';
import { AdsCompanyComponent } from './ads-company/ads-company.component';
import { AdsMessageComponent } from './ads-message/ads-message.component';
import { AdsMainComponent } from './ads-main/ads-main.component';
import { AdsManagerComponent } from './ads-manager/ads-manager.component';
import { StartFinishComponent } from './shared/start-finish/start-finish.component';
import { LocationCurrencyComponent } from './shared/location-currency/location-currency.component';
import { AdsPlacementComponent } from './shared/ads-placement/ads-placement.component';
import { SharedModule } from '../_shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdsBannerSecondComponent } from './ads-banner/ads-banner-second/ads-banner-second.component';
import { CreateContentComponent } from './ads-banner/create-content/create-content.component';
import { AdsGalleryComponent } from './ads-banner/ads-gallery/ads-gallery.component';
import { AdsBannerService } from './ads-banner/ads-banner.service';
import { AdsReviewModalComponent } from './shared/modals/ads-review-modal/ads-review-modal.component';
import { AdsCandidateSecondComponent } from './ads-candidate/ads-candidate-second/ads-candidate-second.component';
import { AdsCandidateService } from './ads-candidate/ads-candidate.service';
import { AdsCompanySecondComponent } from './ads-company/ads-company-second/ads-company-second.component';
import { NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { StepsComponent } from './shared/steps/steps.component';
import { LocationAudienceComponent } from './location-audience/location-audience.component';
import { AdsBudgetComponent } from './ads-budget/ads-budget.component';
import { AdsBudgetBoxComponent } from './ads-budget/ads-budget-box/ads-budget-box.component';
import { AdsCreateComponent } from './ads-create/ads-create.component';
import { AdsCreateImageComponent } from './ads-create/ads-create-image/ads-create-image.component';
import { AdsCreateResponsiveComponent } from './ads-create/ads-create-responsive/ads-create-responsive.component';
import { AdsCreateCarouselComponent } from './ads-create/ads-create-carousel/ads-create-carousel.component';
import { AdsPreviewComponent } from './ads-preview/ads-preview.component';
import { AdsPreviewResponsiveComponent } from './ads-preview/ads-preview-responsive/ads-preview-responsive.component';
import { AdsPreviewSingleComponent } from './ads-preview/ads-preview-single/ads-preview-single.component';
import { TotalPriceComponent } from './shared/total-price/total-price.component';
import { SearchCityComponent } from './location-audience/search-city/search-city.component';
import { SearchCountryComponent } from './location-audience/search-country/search-country.component';
import { GenderAgeComponent } from './location-audience/gender-age/gender-age.component';
import { AdsPreviewSpotlightComponent } from './ads-preview/ads-preview-spotlight/ads-preview-spotlight.component';
import { AdsPreviewCarouselComponent } from './ads-preview/ads-preview-carousel/ads-preview-carousel.component';

@NgModule({
  declarations: [
    AdsComponent, 
    AdsBannerComponent, 
    AdsBannerSecondComponent,
    AdsCandidateComponent, 
    AdsCompanyComponent, 
    AdsMessageComponent, 
    AdsMainComponent, 
    AdsManagerComponent, 
    StartFinishComponent, 
    LocationCurrencyComponent, 
    AdsPlacementComponent, 
    CreateContentComponent, 
    AdsGalleryComponent, 
    AdsReviewModalComponent, 
    AdsCandidateSecondComponent, 
    AdsCompanySecondComponent, 
    StepsComponent, 
    LocationAudienceComponent, 
    AdsBudgetComponent, 
    AdsBudgetBoxComponent, 
    AdsCreateComponent, 
    AdsCreateImageComponent, 
    AdsCreateResponsiveComponent, 
    AdsCreateCarouselComponent, 
    AdsPreviewComponent, 
    AdsPreviewResponsiveComponent, 
    AdsPreviewSingleComponent, 
    TotalPriceComponent, 
    SearchCityComponent, 
    SearchCountryComponent, 
    GenderAgeComponent, 
    AdsPreviewSpotlightComponent, 
    AdsPreviewCarouselComponent, 
  ],
  providers:[
    { provide:AdsBannerService , useClass:AdsBannerService },
    { provide:AdsCandidateService , useClass:AdsCandidateService },

  ],
  imports: [
    CommonModule,
    AdsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbPaginationModule,
    FormsModule,
    NgbTypeaheadModule,
    NgbDatepickerModule
  ]
})
export class AdsModule { }

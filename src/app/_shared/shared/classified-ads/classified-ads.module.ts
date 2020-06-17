import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClasifiedAdsHeaderComponent } from './components/clasified-ads-header/clasified-ads-header.component';
import { NgbDropdownModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { ClasifiedAdsCarouselSliderComponent } from './components/clasified-ads-carousel-slider/clasified-ads-carousel-slider.component';
import { SliderBadBoyEditionComponent } from './components/slider-bad-boy-edition/slider-bad-boy-edition.component';
import { ClasifiedAdsLandingSliderComponent } from './components/clasified-ads-landing-slider/clasified-ads-landing-slider.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ManageHeaderComponent } from './components/manage/manage-header/manage-header.component';
import { CategoriesBoxesComponent } from './components/categories-boxes/categories-boxes.component';
import { ClasifiedAdsBoxComponent } from './components/clasified-ads-box/clasified-ads-box.component';
import { ClasifiedAdsNewProductsComponent } from './components/clasified-ads-new-products/clasified-ads-new-products.component';
import { ClasifiedAdsDetailedComponent } from './components/clasified-ads-detailed/clasified-ads-detailed.component';
import { RouterModule } from '@angular/router';
import { UrgentModalComponent } from './components/modals/urgent-modal/urgent-modal.component';
import { DiscountedModalComponent } from './components/modals/discounted-modal/discounted-modal.component';
import { ManageAnnounsementsComponent } from './components/manage/manage-announsements/manage-announsements.component';
import { ManageBoxComponent } from './components/manage/manage-box/manage-box.component';
import { SharedModule } from '../../shared.module';
import { ManageSearchComponent } from './components/manage/manage-search/manage-search.component';
import { ManageSavedComponent } from './components/manage/manage-saved/manage-saved.component';
import { StringToNumberPipe } from 'src/app/for-sale/string-to-number.pipe';


const COMPONENTS = [
  ClasifiedAdsHeaderComponent,
  ClasifiedAdsCarouselSliderComponent,
  SliderBadBoyEditionComponent,
  ClasifiedAdsLandingSliderComponent,
  CategoriesBoxesComponent,
  ClasifiedAdsBoxComponent,
  ClasifiedAdsNewProductsComponent,
  ClasifiedAdsDetailedComponent,
  ManageHeaderComponent,
  ManageAnnounsementsComponent,
  UrgentModalComponent,
  DiscountedModalComponent,
  StringToNumberPipe
]


@NgModule({
  declarations: [
    ...COMPONENTS,
    ManageBoxComponent,
    ManageSearchComponent,
    ManageSavedComponent
    
    
    
  ],
  imports: [
    CommonModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    SharedModule,
    NgbPaginationModule
  ],
  exports: [
    ...COMPONENTS,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ]
})
export class ClassifiedAdsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RealEstateRoutingModule } from './real-estate-routing.module';
import { RealEstateComponent } from './real-estate.component';
import { AddEstateComponent } from './add-estate/add-estate.component';
import { SharedModule } from '../_shared/shared.module';
import { DealTypeComponent } from './add-estate/deal-type/deal-type.component';
import { EstateFormComponent } from './add-estate/estate-form/estate-form.component';
import { EstateFormService } from './add-estate/Service/estate-form.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTypeaheadModule, NgbDropdownModule, NgbDatepickerModule, NgbTabsetModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { EstateLandingComponent } from './estate-landing/estate-landing.component';
import { EstateLandingHeaderComponent } from './estate-landing/estate-landing-header/estate-landing-header.component';
import { EstateLandingSponsoredComponent } from './estate-landing/estate-landing-sponsored/estate-landing-sponsored.component';
import { EstateLandingAnnouncementsComponent } from './estate-landing/estate-landing-announcements/estate-landing-announcements.component';
import { ManageEstateComponent } from './manage-estate/manage-estate.component';
import { ManageEstateHeaderSearchComponent } from './manage-estate/announcement/manage-estate-header-search/manage-estate-header-search.component';
import { AnnouncementComponent } from './manage-estate/announcement/announcement.component';
import { SavedItemsComponent } from './manage-estate/saved-items/saved-items.component';
import { AdvertisementComponent } from './manage-estate/advertisement/advertisement.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { CounterOfferComponent } from './post-details/counter-offer/counter-offer.component';
import { AuthorDetailsComponent } from './post-details/author-details/author-details.component';

import { NewHomeFormComponent } from './add-estate/estate-form/new-home-form/new-home-form.component';
import { GaragesFormComponent } from './add-estate/estate-form/garages-form/garages-form.component';
import { OfficesFormComponent } from './add-estate/estate-form/offices-form/offices-form.component';
import { CommericalFormComponent } from './add-estate/estate-form/commerical-form/commerical-form.component';
import { BuildingsFormComponent } from './add-estate/estate-form/buildings-form/buildings-form.component';
import { RuralFormComponent } from './add-estate/estate-form/rural-form/rural-form.component';
import { CheckboxHomeComponent } from './add-estate/estate-form/components/checkbox-home/checkbox-home.component';
import { StatusHomeComponent } from './add-estate/estate-form/components/status-home/status-home.component';
import { MoreInformationComponent } from './add-estate/estate-form/components/more-information/more-information.component';
import { TypeOfLandComponent } from './add-estate/estate-form/type-of-land/type-of-land.component';
import { HotelRoomFormComponent } from './add-estate/estate-form/hotel-room-form/hotel-room-form.component';
import { NotificationModalsComponent } from './manage-estate/announcement/notification-modals/notification-modals.component';
import { UrgentModalComponent } from './manage-estate/announcement/urgent-modal/urgent-modal.component';
import { DiscountedModalComponent } from './manage-estate/announcement/discounted-modal/discounted-modal.component';
import { EstateSearchComponent } from './estate-search/estate-search.component';
import { SearchLeftMenuComponent } from './estate-search/search-left-menu/search-left-menu.component';
import { SearchBarComponent } from './estate-search/search-bar/search-bar.component';
import { SearchResultsComponent } from './estate-search/search-results/search-results.component';
import { AvilabilityHomeComponent } from './add-estate/estate-form/components/avilability-home/avilability-home.component';
import { SpecsFormComponent } from './add-estate/estate-form/components/specs-form/specs-form.component';
import { ChangeCurrencyComponent } from './add-estate/deal-type/change-currency/change-currency.component';
import { PaymentEstateComponent } from './add-estate/payment-estate/payment-estate.component';
import { TotalAreaComponent } from './add-estate/estate-form/components/total-area/total-area.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BasicInformationComponent } from './add-estate/estate-form/components/basic-information/basic-information.component';
import { BoxSliderComponent } from './Shared/Components/box-slider/box-slider.component';
import { RadioHomeComponent } from './add-estate/estate-form/components/radio-home/radio-home.component';
import { EditEstateComponent } from './add-estate/edit-estate/edit-estate.component';
import { PropertyPipe } from './post-details/pipe/property.pipe';
import { RealEstateService } from './add-estate/Service/real-estate.service';
import { EstateBoxComponent } from './manage-estate/announcement/estate-box/estate-box.component';
import { ClassifiedAdsModule } from '../_shared/shared/classified-ads/classified-ads.module';
 


@NgModule({
  declarations: [ 
    RealEstateComponent, 
    AddEstateComponent, 
    DealTypeComponent, 
    EstateFormComponent, 
    EstateLandingComponent, 
    EstateLandingHeaderComponent, 
    EstateLandingSponsoredComponent, 
    EstateLandingAnnouncementsComponent, 
    ManageEstateComponent,   
    ManageEstateHeaderSearchComponent, 
    AnnouncementComponent, 
    SavedItemsComponent, 
    AdvertisementComponent,
    PostDetailsComponent, 
    CounterOfferComponent, 
    AuthorDetailsComponent,
    AddEstateComponent,
    DealTypeComponent, 
    EstateFormComponent,  
    NewHomeFormComponent,
    GaragesFormComponent, 
    OfficesFormComponent, 
    CommericalFormComponent, 
    BuildingsFormComponent, 
    RuralFormComponent,
    BasicInformationComponent, 
    CheckboxHomeComponent,
    StatusHomeComponent, 
    TypeOfLandComponent, 
    HotelRoomFormComponent, 
    MoreInformationComponent,
    AvilabilityHomeComponent,
    SpecsFormComponent,
    ChangeCurrencyComponent,
    PaymentEstateComponent,
    TotalAreaComponent,
    EstateSearchComponent,
    NotificationModalsComponent,
    DiscountedModalComponent,
    SearchLeftMenuComponent,
    SearchResultsComponent,
    SearchBarComponent,
    UrgentModalComponent,
    BoxSliderComponent,
    RadioHomeComponent,
    EditEstateComponent, 
    PropertyPipe,
    EstateBoxComponent,

  ],
  imports: [
    CommonModule,
    RealEstateRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTypeaheadModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgMultiSelectDropDownModule,
    NgbTabsetModule,
    NgbPaginationModule,
    ClassifiedAdsModule
  ],
  providers: [
    RealEstateService,
    EstateFormService
  ],
  entryComponents: [
      NewHomeFormComponent,
      GaragesFormComponent, 
      OfficesFormComponent, 
      CommericalFormComponent, 
      BuildingsFormComponent, 
      RuralFormComponent,
      TypeOfLandComponent,
      HotelRoomFormComponent
  ]
 
})
export class RealEstateModule { }

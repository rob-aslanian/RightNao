import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CarsRoutingModule } from './cars-routing.module';
import { CarsComponent } from './cars.component';
import { CarsAddComponent } from './cars-add/cars-add.component';
import { SharedModule } from '../_shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbPaginationModule, NgbTypeaheadModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { CarsAddFormComponent } from './cars-add/cars-add-form/cars-add-form.component';
import { CarsAddMainComponent } from './cars-add/cars-add-main/cars-add-main.component';
//form
import { CarsAddFormConditionComponent } from './cars-add/cars-add-form/cars-add-form-condition/cars-add-form-condition.component';
import { CarsAddFormColorComponent } from './cars-add/cars-add-form/cars-add-form-color/cars-add-form-color.component';
import { CarsAddFormMileageComponent } from './cars-add/cars-add-form/cars-add-form-mileage/cars-add-form-mileage.component';
import { CarsAddFormTransmissionComponent } from './cars-add/cars-add-form/cars-add-form-transmission/cars-add-form-transmission.component';
import { CarsAddFormFuelComponent } from './cars-add/cars-add-form/cars-add-form-fuel/cars-add-form-fuel.component';
import { CarsAddFormBodyComponent } from './cars-add/cars-add-form/cars-add-form-body/cars-add-form-body.component';
import { CarsAddFormLifeComponent } from './cars-add/cars-add-form/cars-add-form-life/cars-add-form-life.component';
import { CarsAddFormDoorsComponent } from './cars-add/cars-add-form/cars-add-form-doors/cars-add-form-doors.component';
import { CarsAddFormSeatsComponent } from './cars-add/cars-add-form/cars-add-form-seats/cars-add-form-seats.component';
import { CarsAddFormCylindersComponent } from './cars-add/cars-add-form/cars-add-form-cylinders/cars-add-form-cylinders.component';
import { CarsAddFormConditioningComponent } from './cars-add/cars-add-form/cars-add-form-conditioning/cars-add-form-conditioning.component';
import { CarsAddFormEngineComponent } from './cars-add/cars-add-form/cars-add-form-engine/cars-add-form-engine.component';
import { CarsAddFormConsumptionComponent } from './cars-add/cars-add-form/cars-add-form-consumption/cars-add-form-consumption.component';
import { CarsAddFormHistoryComponent } from './cars-add/cars-add-form/cars-add-form-history/cars-add-form-history.component';
import { CarsAddFormTitleComponent } from './cars-add/cars-add-form/cars-add-form-title/cars-add-form-title.component';
import { CarsAddFormPhoneComponent } from './cars-add/cars-add-form/cars-add-form-phone/cars-add-form-phone.component';
import { CarsAddFormOwnersComponent } from './cars-add/cars-add-form/cars-add-form-owners/cars-add-form-owners.component';
import { CarsAddFormPowerComponent } from './cars-add/cars-add-form/cars-add-form-power/cars-add-form-power.component';
import { CarsAddFormRepossessedComponent } from './cars-add/cars-add-form/cars-add-form-repossessed/cars-add-form-repossessed.component';
import { CarsAddFormYearsComponent } from './cars-add/cars-add-form/cars-add-form-years/cars-add-form-years.component';
import { CarsAddFormCubicComponent } from './cars-add/cars-add-form/cars-add-form-cubic/cars-add-form-cubic.component';
import { CarsAddFormHomeTypeComponent } from './cars-add/cars-add-form/cars-add-form-home-type/cars-add-form-home-type.component';
import { CarsAddFormPriceComponent } from './cars-add/cars-add-form/cars-add-form-price/cars-add-form-price.component';
import { CarsAddFormFinanceComponent } from './cars-add/cars-add-form/cars-add-form-finance/cars-add-form-finance.component';
import { CarsAddFormLengthComponent } from './cars-add/cars-add-form/cars-add-form-length/cars-add-form-length.component';
import { CarsAddFormHeightComponent } from './cars-add/cars-add-form/cars-add-form-height/cars-add-form-height.component';
import { CarsAddFormWeightComponent } from './cars-add/cars-add-form/cars-add-form-weight/cars-add-form-weight.component';
import { CarsAddFormLiftComponent } from './cars-add/cars-add-form/cars-add-form-lift/cars-add-form-lift.component';
import { CarsAddFormBedstypeComponent } from './cars-add/cars-add-form/cars-add-form-bedstype/cars-add-form-bedstype.component';
import { CarsAddFormBedsnumberComponent } from './cars-add/cars-add-form/cars-add-form-bedsnumber/cars-add-form-bedsnumber.component';
import { CarsAddFormCapacityComponent } from './cars-add/cars-add-form/cars-add-form-capacity/cars-add-form-capacity.component';
import { CarsAddFormFeaturesComponent } from './cars-add/cars-add-form/cars-add-form-features/cars-add-form-features.component';

//main
import { CarsAddMainTypeComponent } from './cars-add/cars-add-main/cars-add-main-type/cars-add-main-type.component';
import { CarsAddMainBrandComponent } from './cars-add/cars-add-main/cars-add-main-brand/cars-add-main-brand.component';
import { CarsAddMainLocationComponent } from './cars-add/cars-add-main/cars-add-main-location/cars-add-main-location.component';
import { CarsAddMainTruckComponent } from './cars-add/cars-add-main/cars-add-main-truck/cars-add-main-truck.component';

//other
import { CarsLandingComponent } from './cars-landing/cars-landing.component';
import { CarsLandingHeaderComponent } from './cars-landing/cars-landing-header/cars-landing-header.component';
import { CarsLandingAnnouncementComponent } from './cars-landing/cars-landing-announcement/cars-landing-announcement.component';
import { CarsBoxComponent } from './cars-landing/cars-box/cars-box.component';
import { CarsDetailComponent } from './cars-landing/cars-detail/cars-detail.component';
import { AuthorDetailsComponent } from './cars-landing/cars-detail/author-details/author-details.component';
import { CarsManageComponent } from './cars-manage/cars-manage.component';
import { ManageAnnouncementComponent } from './cars-manage/manage-announcement/manage-announcement.component';
import { ManageSavedComponent } from './cars-manage/manage-saved/manage-saved.component';
import { PropertyPipe } from './cars-landing/cars-detail/property.pipe';
import { ManageSearchComponent } from './cars-manage/manage-search/manage-search.component';
import { ClassifiedAdsModule } from '../_shared/shared/classified-ads/classified-ads.module';





const DYNAMIC_COMPONENTS = [
  //FormAdd
  CarsAddFormConditionComponent, 
  CarsAddFormColorComponent, 
  CarsAddFormMileageComponent, 
  CarsAddFormTransmissionComponent, 
  CarsAddFormFuelComponent, 
  CarsAddFormBodyComponent, 
  CarsAddFormLifeComponent, 
  CarsAddFormDoorsComponent, 
  CarsAddFormSeatsComponent, 
  CarsAddFormCylindersComponent, 
  CarsAddFormConditioningComponent, 
  CarsAddFormEngineComponent, 
  CarsAddFormConsumptionComponent, 
  CarsAddFormHistoryComponent, 
  CarsAddFormTitleComponent, 
  CarsAddFormPhoneComponent, 
  CarsAddFormOwnersComponent,
  CarsAddFormPowerComponent,
  CarsAddFormRepossessedComponent, 
  CarsAddFormYearsComponent,
  CarsAddFormHomeTypeComponent,
  CarsAddFormPriceComponent,
  CarsAddFormFinanceComponent,
  CarsAddFormLengthComponent, 
  CarsAddFormHeightComponent, 
  CarsAddFormWeightComponent,
   CarsAddFormLiftComponent, 
   CarsAddFormBedstypeComponent, 
   CarsAddFormBedsnumberComponent,
   CarsAddFormCapacityComponent,
   CarsAddFormFeaturesComponent,  
  //MainAdd
  CarsAddMainTypeComponent, 
  CarsAddMainBrandComponent, 
  CarsAddMainLocationComponent, 
  CarsAddMainTruckComponent,
  CarsAddFormCubicComponent,
]


@NgModule({
  declarations: [
    ...DYNAMIC_COMPONENTS,
    CarsComponent, 
    CarsAddComponent, 
    CarsAddMainComponent, 
    CarsAddFormComponent, 
    CarsLandingComponent, 
    CarsLandingHeaderComponent, 
    CarsLandingAnnouncementComponent, 
    CarsBoxComponent, 
    CarsDetailComponent, 
    AuthorDetailsComponent, 
    CarsManageComponent, 
    ManageAnnouncementComponent,
    ManageSavedComponent,
    PropertyPipe,
    ManageSearchComponent, ],
  imports: [
    CommonModule,
    CarsRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbPaginationModule,
    FormsModule,
    NgbTypeaheadModule,
    NgbDatepickerModule,
    ClassifiedAdsModule
  ],
  entryComponents:[ ...DYNAMIC_COMPONENTS ]
})
export class CarsModule { }

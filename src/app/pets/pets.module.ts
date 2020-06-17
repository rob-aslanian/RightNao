import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetsRoutingModule } from './pets-routing.module';
import { PetsComponent } from './pets.component';
import { AddPetComponent } from './add-pet/add-pet.component';
import { SharedModule } from 'src/app/_shared/shared.module';
import { InformationComponent } from './add-pet/information/information.component';
import { AnimalCategoryComponent } from './add-pet/components/animal-category/animal-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BreedGenderComponent } from './add-pet/components/breed-gender/breed-gender.component';
import { AgeComponent } from './add-pet/components/age/age.component';
import { ColorComponent } from './add-pet/components/color/color.component';
import { SizeComponent } from './add-pet/components/size/size.component';
import { AnimalComponent } from './add-pet/components/animal/animal.component';
import { PriceComponent } from './add-pet/components/price/price.component';
import { LocationComponent } from './add-pet/components/location/location.component';
import { PetsLandingComponent } from './pets-landing/pets-landing.component';
import { PetsLandingAnnousementComponent } from './pets-landing/pets-landing-annousement/pets-landing-annousement.component';
import { PetsLandingHeaderComponent } from './pets-landing/pets-landing-header/pets-landing-header.component';
import { PetsManageComponent } from './pets-manage/pets-manage.component';
import { ManageAnnoucementComponent } from './pets-manage/manage-annoucement/manage-annoucement.component';
import { NgbTooltipModule, NgbDropdownModule, NgbPaginationModule, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { TransferedPetsComponent } from './add-pet/components/transfered-pets/transfered-pets.component';
import { PetsServiceComponent } from './add-pet/components/pets-service/pets-service.component';
import { PlantTypeComponent } from './add-pet/components/plant-type/plant-type.component';
import { LightSeedsComponent } from './add-pet/components/light-seeds/light-seeds.component';
import { WaterSeedsComponent } from './add-pet/components/water-seeds/water-seeds.component';
import { LandscapeUsedComponent } from './add-pet/components/landscape-used/landscape-used.component';
import { FlowersSeasonComponent } from './add-pet/components/flowers-season/flowers-season.component';
import { SeedsCategoryComponent } from './add-pet/components/seeds-category/seeds-category.component';
import { PlantingTimeComponent } from './add-pet/components/planting-time/planting-time.component';
import { OrganicComponent } from './add-pet/components/organic/organic.component';
import { SubCategoryComponent } from './add-pet/components/sub-category/sub-category.component';
import { OrganicCheckComponent } from './add-pet/components/organic-check/organic-check.component';
import { GardenSuppliesComponent } from './add-pet/components/garden-supplies/garden-supplies.component';
import { AnimalAccessoriesComponent } from './add-pet/components/animal-accessories/animal-accessories.component';
import { AnimalFoodComponent } from './add-pet/components/animal-food/animal-food.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { PaymentPetsComponent } from './add-pet/payment-pets/payment-pets.component';
import { PetsBoxComponent } from './pets-landing/pets-box/pets-box.component';
import { PetService } from './pet.service';
import { ManageSavedComponent } from './pets-manage/manage-saved/manage-saved.component';
import { ManageSearchComponent } from './pets-manage/manage-search/manage-search.component';
import { UrgentModalComponent } from './pets-manage/modals/urgent-modal/urgent-modal.component';
import { DiscountedModalComponent } from './pets-manage/modals/discounted-modal/discounted-modal.component';
import { NotificationsModalComponent } from './pets-manage/modals/notifications-modal/notifications-modal.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';
import { PetDetailsAuthorComponent } from './pet-details/pet-details-author/pet-details-author.component';
import { ClassifiedAdsModule } from '../_shared/shared/classified-ads/classified-ads.module';


const DYNAMIC_COMPONENTS: any[] = [
      AnimalCategoryComponent, 
      BreedGenderComponent,
      AgeComponent, 
      ColorComponent, 
      SizeComponent, 
      AnimalComponent, 
      PriceComponent,
      TransferedPetsComponent,
      LocationComponent,
      PetsServiceComponent,
      PlantTypeComponent, 
      LightSeedsComponent,
      WaterSeedsComponent, 
      LandscapeUsedComponent, 
      FlowersSeasonComponent,
      SeedsCategoryComponent,
      PlantingTimeComponent,
      OrganicComponent, 
      SubCategoryComponent, 
      OrganicCheckComponent, 
      GardenSuppliesComponent, 
      AnimalAccessoriesComponent, 
      AnimalFoodComponent
];

@NgModule({
  declarations: [ 
    PetsComponent, 
    AddPetComponent, 
    InformationComponent, 
    PetsLandingComponent, 
    PetsLandingAnnousementComponent, 
    PetsLandingHeaderComponent, 
    PetsManageComponent, 
    ManageAnnoucementComponent,
    ...DYNAMIC_COMPONENTS, 
     PaymentPetsComponent, 
     PetsBoxComponent, 
     ManageSavedComponent, 
     ManageSearchComponent, 
     UrgentModalComponent, 
     DiscountedModalComponent, 
     NotificationsModalComponent, 
     PetDetailsComponent,
     PetDetailsAuthorComponent,
  ],
  entryComponents: DYNAMIC_COMPONENTS,
  imports: [
    CommonModule,
    PetsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgMultiSelectDropDownModule,
    NgbDropdownModule,
    NgbPaginationModule,
    ClassifiedAdsModule
  ],
  providers: [
    {
      useClass: PetService,
      provide: PetService
    }
  ]
})
export class PetsModule { }

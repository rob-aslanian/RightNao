import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PetsComponent } from './pets.component';
import { AddPetComponent } from './add-pet/add-pet.component';
import { PetsLandingComponent } from './pets-landing/pets-landing.component';
import { PetsManageComponent } from './pets-manage/pets-manage.component';
import { ManageAnnoucementComponent } from './pets-manage/manage-annoucement/manage-annoucement.component';
import { ManageSavedComponent } from './pets-manage/manage-saved/manage-saved.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';


const routes: Routes = [
  { path: '', component: PetsComponent,
   children: [
      { path: 'add-pet', component: AddPetComponent },
      { path: 'add-pet/:id', component: AddPetComponent },
      { path: 'add-pet/:id/:dealType', component: AddPetComponent },
      { path: '', pathMatch: 'full', redirectTo: 'add-pet' },
      //landing
      { path: 'landing/:id', component: PetsLandingComponent },
      { path:'manage', component: PetsManageComponent,  children: [
        { path: '', redirectTo: 'announcement', pathMatch: 'full' }, 
        { path: 'announcement', component: ManageAnnoucementComponent }, 
        { path: 'saved-items', component: ManageSavedComponent  }, 
        // { path: 'advertisement', component: AdvertisementComponent  }, 
        ] },
      { path: 'details/:id', component: PetDetailsComponent },
   ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PetsRoutingModule { }

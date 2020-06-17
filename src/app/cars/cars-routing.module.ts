import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarsComponent } from './cars.component';
import { CarsAddComponent } from './cars-add/cars-add.component';
import { CarsAddFormComponent } from './cars-add/cars-add-form/cars-add-form.component';
import { CarsAddMainComponent } from './cars-add/cars-add-main/cars-add-main.component';
import { CarsLandingComponent } from './cars-landing/cars-landing.component';
import { CarsDetailComponent } from './cars-landing/cars-detail/cars-detail.component';
import { CarsManageComponent } from './cars-manage/cars-manage.component';
import { ManageAnnouncementComponent } from './cars-manage/manage-announcement/manage-announcement.component';
import { ManageSavedComponent } from './cars-manage/manage-saved/manage-saved.component';


const routes: Routes = [
  { path:'' , component:CarsComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: 'landing/CAR' },

    // { path: 'landing', pathMatch: 'full', redirectTo: 'landing/CAR' },
    { path: 'landing/:id', component: CarsLandingComponent },

    { path:'manage', component: CarsManageComponent,  children: [
      { path: '', redirectTo: 'announcement', pathMatch: 'full' }, 
      { path: 'announcement', component: ManageAnnouncementComponent  }, 
      { path: 'saved-items', component: ManageSavedComponent  }, 
      // { path: 'advertisement', component: AdvertisementComponent  }, 
    ] }, 

    { path: 'details/:id', component: CarsDetailComponent },

    { path: ':action', component:CarsAddComponent, children: [
      { path: '', component:CarsAddMainComponent},
      { path: ':type', component:CarsAddFormComponent }
    ] }
   ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CarsRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdsComponent } from './ads.component';
import { AdsMainComponent } from './ads-main/ads-main.component';
import { AdsBannerComponent } from './ads-banner/ads-banner.component';
import { AdsCandidateComponent } from './ads-candidate/ads-candidate.component';
import { AdsCompanyComponent } from './ads-company/ads-company.component';
import { AdsMessageComponent } from './ads-message/ads-message.component';
import { AdsManagerComponent } from './ads-manager/ads-manager.component';
import { CheckAuthorizeGuard } from '../_shared/guards/check-authorize.guard';
import { LocationAudienceComponent } from './location-audience/location-audience.component';
import { AdsBudgetComponent } from './ads-budget/ads-budget.component';
import { AdsCreateComponent } from './ads-create/ads-create.component';
import { AdsCreateResponsiveComponent } from './ads-create/ads-create-responsive/ads-create-responsive.component';
import { AdsCreateCarouselComponent } from './ads-create/ads-create-carousel/ads-create-carousel.component';

const routes: Routes = [
  { path:'' , component:AdsComponent ,  canActivateChild:[CheckAuthorizeGuard] , children: [
     { path:'', component:AdsMainComponent },
     { path:'location', component: LocationAudienceComponent },
     { path:'budget', component: AdsBudgetComponent },
     { path: 'create', component: AdsCreateComponent, children: [
      { path: 'image', component: AdsCreateResponsiveComponent, data: { type: 'image' }, redirectTo: 'responsive'},
      { path: 'responsive', component: AdsCreateResponsiveComponent, data: { type: 'responsive' }},
      { path: 'spotlight', component: AdsCreateResponsiveComponent, data: { type: 'spotlight'}},
      { path: 'single_image', component: AdsCreateResponsiveComponent, data: { type: 'single'} },
      { path: 'carousel', component: AdsCreateCarouselComponent }
     ]},
     { path:'banner', component:AdsBannerComponent },
     { path:'candidate', component:AdsCandidateComponent },
     { path:'company', component:AdsCompanyComponent },
     { path:'message', component:AdsMessageComponent },
     { path:'manager', component:AdsManagerComponent },
     { path:'manager/:id', component:AdsManagerComponent }

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdsRoutingModule { }

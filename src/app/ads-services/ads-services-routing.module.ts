import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddAdsServicesComponent } from "./add-ads-services/add-ads-services.component";
import { AdsServicesComponent } from "./ads-services.component";
import { PaymentComponent } from "./add-ads-services/payment/payment.component";
import { EditAdsServicesComponent } from "./edit-ads-services/edit-ads-services.component";
import { AdsServiceLandingPageComponent } from "./ads-service-landing-page/ads-service-landing-page.component";
import { AdsServiceDetailedComponent } from "./ads-service-detailed/ads-service-detailed.component";
import { ManageAdsServicesComponent } from "./manage-ads-services/manage-ads-services.component";
import { ManageAnnounsementsComponent } from "../_shared/shared/classified-ads/components/manage/manage-announsements/manage-announsements.component";
import { ManageSavedComponent } from "../_shared/shared/classified-ads/components/manage/manage-saved/manage-saved.component";

const routes: Routes = [
  {path: '', component: AdsServicesComponent, children: [
    { path: '', pathMatch: 'full', redirectTo: 'landing-page' },
    { path: 'add', component: AddAdsServicesComponent },
    { path: 'edit/:id', component: EditAdsServicesComponent },
    { path: 'add/payment', component: PaymentComponent },
    { path: 'landing-page', component: AdsServiceLandingPageComponent },
    { path: "details/:id", component: AdsServiceDetailedComponent, data:{type: 'service'} },
    { path:'manage', component: ManageAdsServicesComponent,  children: [
      { path: '', redirectTo: 'announcement', pathMatch: 'full' }, 
      { path: 'announcement', component: ManageAnnounsementsComponent, data: { place: 'ads-service' } }, 
      { path: 'saved-items', component: ManageSavedComponent, data: { place: 'ads-service' } }, 
      // { path: 'advertisement', component: AdvertisementComponent  }, 
      ] },
    
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdsServicesRoutingModule {}

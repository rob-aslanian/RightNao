import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { ForSaleComponent } from "./for-sale.component";
import { AddForSaleComponent } from "./add-for-sale/add-for-sale.component";
import { ForSaleDetailedComponent } from "./for-sale-detailed/for-sale-detailed.component";
import { ManageAnnounsementsComponent } from "../_shared/shared/classified-ads/components/manage/manage-announsements/manage-announsements.component";
import { ForSaleManageComponent } from "./for-sale-manage/for-sale-manage.component";
import { ManageSavedComponent } from "../_shared/shared/classified-ads/components/manage/manage-saved/manage-saved.component";
 
const routes: Routes = [
  { path: "", component: ForSaleComponent, children: [
      { path: 'landing-page', component: LandingPageComponent },
    { path: 'landing-page/ads', component: LandingPageComponent, data:{ isCommunity: true } },
      { path: '', pathMatch: 'full', redirectTo: 'landing-page' },
      // Community
        { path: 'add-for-sale/community',  component: AddForSaleComponent, data: { isCommunity: true } },
        { path: 'edit-for-sale/community/:id',  component: AddForSaleComponent, data: { isEdit: true, isCommunity: true } },
      // Community      
      { path: 'add-for-sale',  component: AddForSaleComponent },
      { path: 'edit-for-sale/:id',  component: AddForSaleComponent, data: { isEdit: true } },
      { path: "details/:id", component: ForSaleDetailedComponent },
      { path:'manage', component: ForSaleManageComponent,  children: [
        { path: '', redirectTo: 'announcement', pathMatch: 'full' }, 
        { path: 'announcement', component: ManageAnnounsementsComponent, data: { place: 'for-sale' } },
        { path: 'saved-items', component: ManageSavedComponent, data: { place: 'for-sale' } } 
        // { path: 'saved-items', component: ManageSavedComponent  }, 
        // { path: 'advertisement', component: AdvertisementComponent  }, 
        ] },
  ] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class  ForSaleRoutingModule {}

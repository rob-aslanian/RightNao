import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { RealEstateComponent } from "./real-estate.component";
import { AddEstateComponent } from "./add-estate/add-estate.component";
import { DealTypeComponent } from "./add-estate/deal-type/deal-type.component";
import { EstateFormComponent } from "./add-estate/estate-form/estate-form.component";
import { EstateLandingComponent } from "./estate-landing/estate-landing.component";
import { ManageEstateComponent } from "./manage-estate/manage-estate.component";
import { AnnouncementComponent } from "./manage-estate/announcement/announcement.component";
import { SavedItemsComponent } from "./manage-estate/saved-items/saved-items.component";
import { AdvertisementComponent } from "./manage-estate/advertisement/advertisement.component";
import { PostDetailsComponent } from "./post-details/post-details.component";
import { EstateSearchComponent } from "./estate-search/estate-search.component";
import { PaymentEstateComponent } from "./add-estate/payment-estate/payment-estate.component";
import { EditEstateComponent } from "./add-estate/edit-estate/edit-estate.component";
 


const routes: Routes = [ 
     { path: '',  component: RealEstateComponent, children: [
           { path: '', pathMatch: 'full', redirectTo: 'landing/DealType_Any' },
           { path: 'add-estate',   component: AddEstateComponent, children: [
                { path: '', redirectTo: 'select', pathMatch: 'full' },
                { path: 'select', component: DealTypeComponent },
                { path: 'add/:catId/:subCatId', component: EstateFormComponent },
                { path: 'payment', component: PaymentEstateComponent },
           ] },
           { path: 'edit-estate/:id', component: EditEstateComponent },

           { path: 'landing/:id', component: EstateLandingComponent }, 

           { path: 'details/:id', component: PostDetailsComponent }, 

           { path: 'manage-estate', component: ManageEstateComponent,  children: [
                { path: '', redirectTo: 'announcement', pathMatch: 'full' }, 
                { path: 'announcement', component: AnnouncementComponent  }, 
                { path: 'saved-items', component: SavedItemsComponent  }, 
                { path: 'advertisement', component: AdvertisementComponent  }, 
           ] }, 
           
           { path: 'search/:id', component: EstateSearchComponent }
     ]

    }
 ];   

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
  
})
export class RealEstateRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ServicesComponent } from './services.component';
import { ServicesServiceRequestsComponent } from './services-service-requests/services-service-requests.component';
import { ServicesPostServiceComponent } from './services-service-requests/services-post-service/services-post-service.component';
import { SerivcesInviteFriendComponent } from './services-service-requests/serivces-invite-friend/serivces-invite-friend.component';
import { ServicesManageServicesComponent } from './services-manage-services/services-manage-services.component';
import { ServicesMainServicesComponent } from './services-main-services/services-main-services.component';
import { ManageServicesRequestsComponent } from './services-manage-services/manage-services-requests/manage-services-requests.component';
import { ManageServicesOrdersComponent } from './services-manage-services/manage-services-orders/manage-services-orders.component';
import { ManageServicesProposalsComponent } from './services-manage-services/manage-services-proposals/manage-services-proposals.component';
import { ManageServicesSavedServicesComponent } from './services-manage-services/manage-services-saved-services/manage-services-saved-services.component';
import { ManageServicesReviewsComponent } from './services-manage-services/manage-services-reviews/manage-services-reviews.component';
import { ServicesCategoriesComponent } from './services-service-requests/services-categories/services-categories.component';

const routes: Routes = [
  { path:'', component:ServicesComponent , 
    children:[
      // { path:'', pathMatch:'full' , redirectTo:'requests'  },
        // ** Service  Request **
      { path: 'requests', component: ServicesServiceRequestsComponent, children: [
        { path: 'post-service-request', component: ServicesPostServiceComponent },
        { path: 'edit-service-request/:id', component: ServicesPostServiceComponent, data: { type: "edit" } },
        { path: 'categories', component: ServicesCategoriesComponent },
        { path: 'invite-friend', component: SerivcesInviteFriendComponent },
      ] },

      // ** Manage  Services **  
      { path: 'manage', component: ServicesManageServicesComponent,    
          children: [
            { path:"" , redirectTo:"my-requests" , pathMatch:"full" },
            { path: 'my-requests', component: ManageServicesRequestsComponent },
            { path: 'orders', component: ManageServicesOrdersComponent },
            { path: 'proposals', component: ManageServicesProposalsComponent },
            { path: 'reviews', component: ManageServicesReviewsComponent },
            { path: 'saved-services', component: ManageServicesSavedServicesComponent },
      ] }, 

      // ** S e r v i ce s ** 
      { path: 'main', component: ServicesMainServicesComponent }
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule ]
})
export class ServicesRoutingModule { }

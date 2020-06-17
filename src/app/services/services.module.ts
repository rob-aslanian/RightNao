import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';


import { SharedModule } from '../_shared/shared.module';



import { PostServiceRequestComponent } from './post-service-request/post-service-request.component';
import { PostServiceRequestHeaderComponent } from './post-service-request/post-service-request-header/post-service-request-header.component';
import { ServiceRequestDetailsComponent } from './services-service-requests/services-post-service/service-request-details/service-request-details.component';
import { DeliveryTimeComponent } from './services-service-requests/services-post-service/delivery-time/delivery-time.component';
import { LocationComponent } from './services-service-requests/services-post-service/location/location.component';
import { VisibilityComponent } from './services-service-requests/services-post-service/visibility/visibility.component';
import { VOfficeModule } from '../v-office/v-office.module';
import { ServicesService } from './services.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TypeOfProjectComponent } from './services-service-requests/services-post-service/type-of-project/type-of-project.component';
import { ServiceRequestsComponent } from './service-requests/service-requests.component';
import { ServiceRequestLocationComponent } from './service-requests/service-request-location/service-request-location.component';
import { ServiceRequestDeliveryTimeComponent } from './service-requests/service-request-delivery-time/service-request-delivery-time.component';
import { ServiceRequestPriceComponent } from './service-requests/service-request-price/service-request-price.component';
import { ServiceRequestProjectTypeComponent } from './service-requests/service-request-project-type/service-request-project-type.component';
import { ServiceRequestIllustrationComponent } from './service-requests/service-request-illustration/service-request-illustration.component';
import { ServiceRequestToolsComponent } from './service-requests/service-request-tools/service-request-tools.component';
import { ServiceRequestLanguagesComponent } from './service-requests/service-request-languages/service-request-languages.component';
import { ServiceRequestIncludesComponent } from './service-requests/service-request-includes/service-request-includes.component';
import { ServiceRequestRatingComponent } from './service-requests/service-request-rating/service-request-rating.component';
import { ServiceRequestShowOnlyComponent } from './service-requests/service-request-show-only/service-request-show-only.component';
import { ServiceRequestFilterComponent } from './service-requests/service-request-filter/service-request-filter.component';
import { ServiceRequestCardComponent } from './service-requests/service-request-card/service-request-card.component';
import { ServiceRequestAllCategoriesComponent } from './service-requests/service-request-all-categories/service-request-all-categories.component';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServicesServiceRequestsComponent } from './services-service-requests/services-service-requests.component';
// import { SerivcesInviteFriendComponent } from './services-service-requests/serivces-invite-friend/serivces-invite-friend.component';
import { ServicesPostServiceComponent } from './services-service-requests/services-post-service/services-post-service.component';
import { ServicesManageServicesComponent } from './services-manage-services/services-manage-services.component';
import { ServicesMainServicesComponent } from './services-main-services/services-main-services.component';
import { ServicesHeaderComponent } from './shared/services-header/services-header.component';
import { ShareModule } from '@ngx-share/core';
import { ManageServicesHeaderComponent } from './services-manage-services/manage-services-header/manage-services-header.component';
import { ManageServicesRequestsComponent } from './services-manage-services/manage-services-requests/manage-services-requests.component';
import { ManageServicesOrdersComponent } from './services-manage-services/manage-services-orders/manage-services-orders.component';
import { ManageServicesProposalsComponent } from './services-manage-services/manage-services-proposals/manage-services-proposals.component';
import { ManageServicesSavedServicesComponent } from './services-manage-services/manage-services-saved-services/manage-services-saved-services.component';
import { AddServiceRequestComponent } from './services-manage-services/manage-services-requests/add-service-request/add-service-request.component';
import { ManageServicesReviewsComponent } from './services-manage-services/manage-services-reviews/manage-services-reviews.component';
import { RequestBoxComponent } from './services-manage-services/manage-services-requests/request-box/request-box.component';
import { SerivcesInviteFriendComponent } from './services-service-requests/serivces-invite-friend/serivces-invite-friend.component';
import { ServicesCategoriesComponent } from './services-service-requests/services-categories/services-categories.component';
import { ClassifiedAdsModule } from '../_shared/shared/classified-ads/classified-ads.module';

const COMPONENTS = [

    ServicesComponent, 
    PostServiceRequestComponent,
    PostServiceRequestHeaderComponent, 
    ServiceRequestDetailsComponent, 
    DeliveryTimeComponent, 
    LocationComponent,
    VisibilityComponent,
    TypeOfProjectComponent,
    // * * * Serveice Request  * * * 
    ServiceRequestsComponent,
    ServiceRequestLocationComponent,
    ServiceRequestDeliveryTimeComponent,
    ServiceRequestPriceComponent,
    ServiceRequestProjectTypeComponent,
    ServiceRequestIllustrationComponent,
    ServiceRequestToolsComponent,
    ServiceRequestToolsComponent,
    ServiceRequestLanguagesComponent,
    ServiceRequestIncludesComponent, 
    ServiceRequestRatingComponent,
    ServiceRequestShowOnlyComponent,
    ServiceRequestFilterComponent, 
    ServiceRequestCardComponent,
    ServiceRequestAllCategoriesComponent,
    ServicesHeaderComponent, 
    SerivcesInviteFriendComponent,
    ServicesServiceRequestsComponent, 
    ServicesPostServiceComponent,
    ServicesManageServicesComponent,
    ServicesMainServicesComponent,
    ManageServicesHeaderComponent,
    ManageServicesRequestsComponent,
    ManageServicesOrdersComponent,
    ManageServicesProposalsComponent,
    ManageServicesSavedServicesComponent,
    AddServiceRequestComponent,
    ManageServicesReviewsComponent,
    RequestBoxComponent,
    ServicesCategoriesComponent
  ]

@NgModule({
  declarations: [
    COMPONENTS,
    
  ],

  imports: [
    CommonModule,
    ServicesRoutingModule,
    SharedModule,
    VOfficeModule,
    FormsModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    ShareModule,
    NgbModule,
    ClassifiedAdsModule
  ],

  providers: [
    ServicesService
  ]
})
export class ServicesModule { }

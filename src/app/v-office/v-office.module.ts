import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { VOfficeRoutingModule } from "./v-office-routing.module";
import { VOfficeComponent } from "./v-office.component";
import { OpenVOfficeComponent } from "./open-v-office/open-v-office.component";
import { SharedModule } from "../_shared/shared.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { OfficeService } from "../_shared/services/v-office/office.service";
import { OfficeProfileComponent } from "./office-profile/office-profile.component";
import { officeResolver } from "./resolve/office.resolve.service";
import { OfficeHeaderComponent } from "./office-profile/office-header/office-header.component";
import { OfficeOverviewComponent } from "./office-profile/office-overview/office-overview.component";
import { OfficeReviewComponent } from "./office-profile/office-review/office-review.component";
import { OfficeTabComponent } from "./office-profile/office-tab/office-tab.component";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { OutOfficeComponent } from "./office-profile/office-header/out-office/out-office.component";
import { OfficeContainerComponent } from "./office-profile/office-overview/office-container/office-container.component";
import { ServicesComponent } from "./office-profile/office-overview/office-container/services/services.component";
import { AddServiceComponent } from "./office-profile/office-overview/office-container/services/add-service/add-service.component";
import { ServiceDetailsComponent } from "./office-profile/office-overview/office-container/services/add-service/service-details/service-details.component";
import { ServiceDeliveryTimeComponent } from "./office-profile/office-overview/office-container/services/add-service/service-delivery-time/service-delivery-time.component";
import { AdditinioalDetailsComponent } from "./office-profile/office-overview/office-container/services/add-service/additinioal-details/additinioal-details.component";
import { ServiceDetailedComponent } from "./office-profile/office-overview/service-detailed/service-detailed.component";
import { LocationComponent } from "./office-profile/office-overview/office-container/services/add-service/location/location.component";
import { DescriptionModalComponent } from "./office-profile/office-header/description-modal/description-modal.component";
import { OfficeLanguageModalComponent } from './office-profile/office-header/office-language-modal/office-language-modal.component';
import { WorkingHoursComponent } from "./office-profile/office-overview/office-container/services/add-service/location/working-hours/working-hours.component";
import { MyBusinessComponent } from "../services/my-business/my-business.component";
import { MyBusinessBoxComponent } from "../services/my-business/my-business-box/my-business-box.component";
import { OrderNowModalComponent } from "./office-profile/office-overview/service-detailed/order-now-modal/order-now-modal.component";
import { VOfficeOrdersComponent } from './office-profile/office-overview/v-office-orders/v-office-orders.component';
import { ServiceRequestDetailedComponent } from './service-request-detailed/service-request-detailed.component';
import { OfficeSavedRequestsComponent } from './office-profile/office-overview/office-container/office-saved-requests/office-saved-requests.component';
import { OfficeSentProposalsComponent } from "./office-profile/office-overview/office-sent-proposals/office-sent-proposals.component";
import { OfficeProposallBoxComponent } from "./office-profile/office-overview/office-sent-proposals/office-proposall-box/office-proposall-box.component";
import { SendProposalModalComponent } from './service-request-detailed/send-proposal-modal/send-proposal-modal.component';
import { SearchServiceDetailedComponent } from './search-service-detailed/search-service-detailed.component';
import { ServiceRequestBoxDetailedComponent } from './service-request-detailed/service-request-box-detailed/service-request-box-detailed.component';
  
 
 

const COMPONENTS = [
  VOfficeComponent,
  OpenVOfficeComponent,
  OfficeProfileComponent,
  OfficeHeaderComponent,
  OfficeOverviewComponent,
  OfficeReviewComponent,
  OfficeTabComponent,
  DescriptionModalComponent,
  ServicesComponent,
  AddServiceComponent,
  ServiceDetailsComponent,
  ServiceDeliveryTimeComponent,
  AdditinioalDetailsComponent,
  LocationComponent,
  OutOfficeComponent,
  ServiceDetailedComponent,
  OfficeContainerComponent,
]

@NgModule({
  declarations: [
    COMPONENTS,
    OfficeLanguageModalComponent,
    WorkingHoursComponent,
    MyBusinessComponent,
    MyBusinessBoxComponent,
    OrderNowModalComponent,
    VOfficeOrdersComponent,
    ServiceRequestDetailedComponent,
    OfficeSavedRequestsComponent,
    OfficeSentProposalsComponent,
    OfficeProposallBoxComponent,
    SendProposalModalComponent,
    SearchServiceDetailedComponent,
    ServiceRequestBoxDetailedComponent
  ],
  imports: [
    CommonModule,
    VOfficeRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    DragDropModule,
  ],
  exports:[
    COMPONENTS
  ], 
  providers: [
    { useClass: OfficeService, provide: OfficeService },
    { useClass: officeResolver, provide: officeResolver },
 
  ]
})
export class VOfficeModule {}

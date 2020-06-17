import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { OpenVOfficeComponent } from "./open-v-office/open-v-office.component";
import { VOfficeComponent } from "./v-office.component";
import { officeResolver } from "./resolve/office.resolve.service";
import { OfficeProfileComponent } from "./office-profile/office-profile.component";
import { OfficeOverviewComponent } from "./office-profile/office-overview/office-overview.component";
import { OfficeGuard } from "./guard/office.guard";
import { ServiceDetailedComponent } from "./office-profile/office-overview/service-detailed/service-detailed.component";
import { AddServiceComponent } from "./office-profile/office-overview/office-container/services/add-service/add-service.component";
import { ServicesComponent } from "./office-profile/office-overview/office-container/services/services.component";
import { MyBusinessComponent } from "../services/my-business/my-business.component";
import { VOfficeOrdersComponent } from "./office-profile/office-overview/v-office-orders/v-office-orders.component";
import { ServiceRequestDetailedComponent } from "./service-request-detailed/service-request-detailed.component";
import { OfficeSavedRequestsComponent } from "./office-profile/office-overview/office-container/office-saved-requests/office-saved-requests.component";
import { OfficeSentProposalsComponent } from "./office-profile/office-overview/office-sent-proposals/office-sent-proposals.component";
import { SearchServiceDetailedComponent } from "./search-service-detailed/search-service-detailed.component";

const routes: Routes = [
  {
    path: "",
    component: VOfficeComponent,
    children: [
      {
        path: "office/:officeId/:type/:id",
        component: OfficeProfileComponent,
        resolve: { office: officeResolver },
        children: [
          { path: "", pathMatch: "full", redirectTo: "overview" },
          { path: "overview", component: OfficeOverviewComponent, children: [
              { path: "", redirectTo: "services", pathMatch: "full" },
              { path: "services", component: ServicesComponent },
              { path: "service/:id", component: ServiceDetailedComponent },
            ]
          },
          { path: "orders", component: VOfficeOrdersComponent },
          { path: "saved-requests", component: OfficeSavedRequestsComponent },
          { path: "sent-proposals", component: OfficeSentProposalsComponent },

        ]
      },
      { path: "open", component: OpenVOfficeComponent, canActivate: [ OfficeGuard ] },
      { path: "edit-office/:id", component: OpenVOfficeComponent,  data: { type: 'edit' }},
      { path: "edit-service/:id/:serviceId", component: AddServiceComponent , data: { type : 'edit' }},
      { path: "add-service/:id" ,  component: AddServiceComponent  },
      { path: 'my-business', component: MyBusinessComponent },
      { path: 'service-request-detailed/:id', component: ServiceRequestDetailedComponent },
      { path: 'service-detailed/:id/:officeId', component: SearchServiceDetailedComponent },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VOfficeRoutingModule {}

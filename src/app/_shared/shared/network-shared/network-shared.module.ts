import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrowNetworkPeopleComponent } from './grow-network-people/grow-network-people.component';
import { RouterModule } from '@angular/router';
import {  NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NetworkLandingComponent } from './network-landing/network-landing.component';
import { GrowNetworkCompaniesComponent } from './grow-network-companies/grow-network-companies.component';
import { NetworkRedirectComponent } from './network-redirect/network-redirect.component';
import { NetworkDiscorverComponent } from './network-discorver/network-discorver.component';
import { NetworkImportComponent } from './network-import/network-import.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SentInvitationsComponent } from './sent-invitations/sent-invitations.component';
import { NetworkBoxWrapperComponent } from './network-box-wrapper/network-box-wrapper.component';
import { NetworkCategoriesComponent } from './network-categories/network-categories.component';
import { NetworkAddCategoriesComponent } from './network-add-categories/network-add-categories.component';
import { SharedModule } from '../../shared.module';
 


const COMPONENTS = [
  NetworkImportComponent,
  GrowNetworkPeopleComponent,
  GrowNetworkCompaniesComponent,
  NetworkLandingComponent,
  NetworkRedirectComponent,
  NetworkDiscorverComponent,
  SentInvitationsComponent,
  NetworkBoxWrapperComponent,
  NetworkCategoriesComponent,
  NetworkAddCategoriesComponent,
];


@NgModule({
  
  declarations: COMPONENTS,

    imports: [
      CommonModule,
      RouterModule,
      NgbDropdownModule,
      FormsModule,
      ReactiveFormsModule,
      NgbModule
    ],

  exports: COMPONENTS,

})
export class NetworkSharedModule { }

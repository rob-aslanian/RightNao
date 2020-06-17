import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// import components
import { NetworkCompanyComponent } from './network-company.component';
import { NetworkGeneralComponent } from './network-general/network-general.component';
import { NetworkFollowingComponent } from './network-following/network-following.component';
import { PeopleComponent } from './network-following/people/people.component';
import { CompaniesComponent } from './network-following/companies/companies.component';
import { NetworkFollowersComponent } from './network-followers/network-followers.component';
import { FollowersPeopleComponent } from './network-followers/followers-people/followers-people.component';
import { FollowersCompaniesComponent } from './network-followers/followers-companies/followers-companies.component';
import { NetworkGrowNetworkComponent } from './network-grow-network/network-grow-network.component';
import { NetworkManageComponent } from './network-manage/network-manage.component';
import { BlocklistComponent } from './network-manage/blocklist/blocklist.component';
import {SharedModule} from '../_shared/shared.module';

// Network Shared Components
import { NetworkSharedModule } from '../_shared/shared/network-shared/network-shared.module';
import { NetworkLandingComponent } from '../_shared/shared/network-shared/network-landing/network-landing.component';
import { NetworkImportComponent } from '../_shared/shared/network-shared/network-import/network-import.component';
import { SentInvitationsComponent } from '../_shared/shared/network-shared/sent-invitations/sent-invitations.component';
import { GrowNetworkPeopleComponent } from '../_shared/shared/network-shared/grow-network-people/grow-network-people.component';
import { GrowNetworkCompaniesComponent } from '../_shared/shared/network-shared/grow-network-companies/grow-network-companies.component';
// Network Shared Components
 


const networkCompanyRoutes: Routes = [
  {
    path: "", component: NetworkCompanyComponent, children: [
      { path:'', pathMatch:'full' , redirectTo:'landing' },
      { path:'landing', component: NetworkLandingComponent },
      { path: 'general', component: NetworkGeneralComponent },
      { path: 'following', component: NetworkFollowingComponent, 
        children: [
          { path: '', component: PeopleComponent },
          { path: 'people', component: PeopleComponent },
          { path: 'companies', component: CompaniesComponent }
        ] 
      },
      { path: 'followers', component: NetworkFollowersComponent, children: [
        { path: '', component: FollowersPeopleComponent },
        { path: 'people', component: FollowersPeopleComponent },
        { path: 'companies', component: FollowersCompaniesComponent },
      ] },
      { path: 'grow-network', component: NetworkGrowNetworkComponent, children: [
        { path: '', component: GrowNetworkPeopleComponent },
        { path: 'people', component: GrowNetworkPeopleComponent },
        { path: 'companies', component: GrowNetworkCompaniesComponent },
      ] },
      { path: 'import', component: NetworkImportComponent },
      { path: 'manage', component: NetworkManageComponent,
        children: [
          { path: '', component: SentInvitationsComponent },
          { path: 'sent-invitations', component: SentInvitationsComponent },
          { path: 'blocklist', component: BlocklistComponent }
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [
    NetworkCompanyComponent, 
    NetworkGeneralComponent, 
    NetworkFollowingComponent, 
    PeopleComponent, 
    NetworkGrowNetworkComponent, 
    NetworkManageComponent, 
    BlocklistComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgMultiSelectDropDownModule,
    SharedModule,
    NetworkSharedModule,
    RouterModule.forChild(networkCompanyRoutes)
    
  ]
})
export class NetworkCompanyModule { }

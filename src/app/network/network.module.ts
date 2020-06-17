import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

//components
import { NetworkGeneralComponent } from './network-general/network-general.component';
import { NetworkConnectionsComponent } from './network-connections/network-connections.component';
import { NetworkFollowingComponent } from './network-following/network-following.component';
import { NetworkFollowersComponent } from './network-followers/network-followers.component';
import { NetworkManageComponent } from './network-manage/network-manage.component';
import { NetworkGrowNetworkComponent } from './network-grow-network/network-grow-network.component';
import { NetworkComponent } from './network.component';
import { PeopleComponent } from './network-following/people/people.component';
import { CompaniesComponent } from './network-following/companies/companies.component';
import { ReceivedRequestsComponent } from './network-manage/received-requests/received-requests.component';
import { SentRequestsComponent } from './network-manage/sent-requests/sent-requests.component';
import { BlocklistComponent } from './network-manage/blocklist/blocklist.component';
import { FollowersPeopleComponent } from './network-followers/followers-people/followers-people.component';
import { FollowersCompaniesComponent } from './network-followers/followers-companies/followers-companies.component';
import {SharedModule} from '../_shared/shared.module';
import { CheckAuthorizeGuard } from '../_shared/guards/check-authorize.guard';

// Shared Network Components

import { GrowNetworkPeopleComponent } from '../_shared/shared/network-shared/grow-network-people/grow-network-people.component';
import { NetworkSharedModule } from '../_shared/shared/network-shared/network-shared.module';
import { NetworkLandingComponent } from '../_shared/shared/network-shared/network-landing/network-landing.component';
import { GrowNetworkCompaniesComponent } from '../_shared/shared/network-shared/grow-network-companies/grow-network-companies.component';
import { NetworkImportComponent } from '../_shared/shared/network-shared/network-import/network-import.component';
import { SentInvitationsComponent } from '../_shared/shared/network-shared/sent-invitations/sent-invitations.component';
import { NetworkContactsComponent } from './network-contacts/network-contacts.component';

// Shared Network Components

const networkRoutes: Routes = [
  { 
    path: "", component: NetworkComponent, canActivateChild:[CheckAuthorizeGuard],
    children: [
      { path:'', pathMatch:'full' , redirectTo:'landing'  },
      { path:'landing', component: NetworkLandingComponent },
      { path: 'contacts', component: NetworkConnectionsComponent ,     data:{ type:'contacts'}   },
      { path: 'connection',   component: NetworkConnectionsComponent , data:{ type:'connections' } },
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
      { path: 'manage', component: NetworkManageComponent ,
        children: [
          { path: '', component: ReceivedRequestsComponent },
          { path: 'received-requests', component: ReceivedRequestsComponent },
          { path: 'sent-requests', component: SentRequestsComponent },
          { path: 'sent-invitations', component: SentInvitationsComponent },
          { path: 'blocklist', component: BlocklistComponent }
        ]
      }
    ]
  }

];

@NgModule({
  declarations: [
    NetworkGeneralComponent, 
    NetworkFollowingComponent, 
    NetworkFollowersComponent, 
    NetworkManageComponent, 
    NetworkGrowNetworkComponent, 
    NetworkComponent,
    CompaniesComponent, 
    ReceivedRequestsComponent, 
    SentRequestsComponent, 
    BlocklistComponent,
    FollowersCompaniesComponent,
    NetworkContactsComponent,
    // PeopleComponent
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NetworkSharedModule,
    NgMultiSelectDropDownModule,
    SharedModule,
    RouterModule.forChild(networkRoutes)
  ],
})
export class NetworkModule {
 }

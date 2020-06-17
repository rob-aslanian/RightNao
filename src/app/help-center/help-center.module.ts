import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


import { HelpCenterComponent } from './help-center.component';
import { HelpDetailedComponent } from './help-detailed/help-detailed.component';
import { HelpGeneralComponent } from './help-general/help-general.component';
import { PeopleComponent } from './help-detailed/people/people.component';
import { CompaniesComponent } from './help-detailed/companies/companies.component';
import { NetworkComponent } from './help-detailed/network/network.component';
import { JobsComponent } from './help-detailed/jobs/jobs.component';
import { AdsComponent } from './help-detailed/ads/ads.component';
import { BankingComponent } from './help-detailed/banking/banking.component';

import { SharedModule } from '../_shared/shared.module';



const helpCenterRoutes: Routes = [
  {
    path: "help-center", component: HelpCenterComponent,
    children: [
      { path: '', component: HelpGeneralComponent },
      {
        path: 'detailed', component: HelpDetailedComponent,
        children: [
          { path: '', component: PeopleComponent },
          { path: 'people/:id', component: PeopleComponent },
          { path: 'companies/:id', component: CompaniesComponent },
          { path: 'network/:id', component: NetworkComponent },
          { path: 'jobs/:id', component: JobsComponent }
        ]
      },

    ]
  },
]

@NgModule({
  declarations: [HelpCenterComponent, HelpDetailedComponent, HelpGeneralComponent, PeopleComponent, CompaniesComponent, NetworkComponent, JobsComponent, AdsComponent, BankingComponent ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(helpCenterRoutes)
  ]
})
export class HelpCenterModule { }

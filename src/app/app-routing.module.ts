import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Landing pages and demo pages */
import { LandingPageComponent } from './landing-page/landing-page.component';
import { DemoNetworkComponent } from './landing-page/demo-network/demo-network.component';
import { DemoMessagingComponent } from './landing-page/demo-messaging/demo-messaging.component';
import { DemoJobsUserComponent } from './landing-page/demo-jobs-user/demo-jobs-user.component';
import { DemoJobsCompanyComponent } from './landing-page/demo-jobs-company/demo-jobs-company.component';
import { DemoAdsComponent } from './landing-page/demo-ads/demo-ads.component';
import { DemoDonateComponent } from './landing-page/demo-donate/demo-donate.component';
/* End of Landing pages and demo pages */

import { ContactComponent } from './landing-page/contact/contact.component';
import { CheckAuthorizeGuard } from './_shared/guards/check-authorize.guard';
import { SignedGuard } from './_shared/guards/signed.guard';

const appRoutes: Routes = [
  /*
  =============================================
  Users routes
  =============================================
   */

  { path: '', component: LandingPageComponent , canActivate:[SignedGuard]},
  { path: 'contact', component: ContactComponent},
  { path: 'demo-network', component: DemoNetworkComponent },
  { path: 'demo-message', component: DemoMessagingComponent },
  { path: 'demo-user-jobs', component: DemoJobsUserComponent },
  { path: 'demo-company-jobs', component: DemoJobsCompanyComponent },
  { path: 'demo-ads', component: DemoAdsComponent },
  { path: 'demo-donate', component: DemoDonateComponent },


]

@NgModule({
  imports: [
    RouterModule.forChild(appRoutes)
  ],

  exports: [RouterModule]
})
export class AppRoutingModule { }


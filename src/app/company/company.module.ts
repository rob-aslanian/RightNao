import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

// libs

// modules , i imported again in app.modules in case something happen remove it from here or comment it 
import { SharedModule } from '../_shared/shared.module';

// services

// components
import { CompanyComponent } from './company.component';
import { CompanyAccountComponent } from './company-account/company-account.component';
import { CompanyAccountGeneralComponent } from './company-account/general/company-account-general.component';
import { CompanyAccountNotificationsComponent } from './company-account/notifications/company-account-notifications.component';
import { CompanyAccountAdminsManagerComponent } from './company-account/admins-manager/company-account-admins-manager.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';

import { EscapePipe } from '../_shared/custom-pipes/escape-.pipe';

import { AboutUsComponent } from './company-profile/about-us/about-us.component';
import { AboutUsModalComponent } from './company-profile/about-us/about-us-modal/about-us-modal.component';
import { LocationComponent } from './company-profile/location/location.component';
import { LocationModalComponent } from './company-profile/location/location-modal/location-modal.component';
import { DeactivateAccountComponent } from './deactivate-account/deactivate-account.component';
import { NgbModule, NgbCarouselModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NameComponent } from './company-account/general/name/name.component';
import { GeneralInfoComponent } from './company-account/general/general-info/general-info.component';
import { CompanyPhoneComponent } from './company-account/general/company-phone/company-phone.component';
import { EmailComponent } from './company-account/general/email/email.component';
import { WebsiteComponent } from './company-account/general/website/website.component';
import { CompanyAddressesComponent } from './company-account/general/company-addresses/company-addresses.component';
import { MilestonesComponent } from './company-profile/milestones/milestones.component';
import { MilestoneModalComponent } from './company-profile/milestones/milestone-modal/milestone-modal.component';
import { FoundersComponent } from './company-profile/founders/founders.component';
import { FoundersModalComponent } from './company-profile/founders/founders-modal/founders-modal.component';
import { ProductsComponent } from './company-profile/products/products.component';
import { ProductsModalComponent } from './company-profile/products/products-modal/products-modal.component';
import { ServicesComponent } from './company-profile/services/services.component';
import { ServicesModalComponent } from './company-profile/services/services-modal/services-modal.component';
import { AwardsComponent } from './company-profile/awards/awards.component';
import { AwardsModalComponent } from './company-profile/awards/awards-modal/awards-modal.component';
import { AddAdminComponent } from './company-account/admins-manager/add-admin/add-admin.component';
import { CompanyFollowingComponent } from './company-profile/company-following/company-following.component';
import { CompanyFollowersComponent } from './company-profile/company-followers/company-followers.component';
import { CompanyEmployeesComponent } from './company-profile/company-employees/company-employees.component';
import { CompanyRaitingComponent } from './company-profile/company-raiting/company-raiting.component';
import { DeleteAdminComponent } from './company-account/admins-manager/delete-admin/delete-admin.component';
import { CompanyFollowerCompaniesComponent } from './company-profile/company-followers/company-follower-companies/company-follower-companies.component';
import { CompanyFollowerPeopleComponent } from './company-profile/company-followers/company-follower-people/company-follower-people.component';
import { CompanyFollowingCompaniesComponent } from './company-profile/company-following/company-following-companies/company-following-companies.component';
import { CompanyFollowingPeopleComponent } from './company-profile/company-following/company-following-people/company-following-people.component';
import { BenefitsComponent } from './company-profile/benefits/benefits.component';
import { GalleryComponent } from './company-profile/gallery/gallery.component';
import { GalleryModalComponent } from './company-profile/gallery/gallery-modal/gallery-modal.component';
import { GalleryImgRowComponent } from './company-profile/gallery/gallery-modal/gallery-img-row/gallery-img-row.component';
import { GalleryService } from './company-profile/gallery/gallery.service';
import { CompanyJobsComponent } from './company-profile/company-jobs/company-jobs.component';
import { NewsFeedMainComponent } from '../news-feed/news-feed-main/news-feed-main.component';
import { ProfilesNewsFeedModule } from '../_shared/shared/profiles-news-feed/profiles-news-feed.module';

 

const companyRoutes: Routes = [
  {
    path: '', component: CompanyComponent, children:
    [
      { path: '', redirectTo: 'registration', pathMatch: 'full' },
      { path: 'profile/:id', component: CompanyProfileComponent , data :{ showMain:true }, children:
        [
          { path: 'wall/:id', component:NewsFeedMainComponent  },
          { path:'following/:type/:id' , component:CompanyFollowingComponent},
          { path:'followers/:type/:id' , component:CompanyFollowersComponent},
          { path:'jobs/:id' , component:CompanyJobsComponent},
          { path:'employees' , component:CompanyEmployeesComponent},
          { path:'raiting/:id' ,   component:CompanyRaitingComponent},

        ] 
      },
      {
        path: 'account/:id', component: CompanyAccountComponent, children:
        [
          { path: '', redirectTo: 'general', pathMatch: 'full' },
          { path: 'general', component: CompanyAccountGeneralComponent },
          { path: 'notifications', component: CompanyAccountNotificationsComponent},
          { path: 'admins', component: CompanyAccountAdminsManagerComponent }
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [
    CompanyComponent,
    CompanyAccountComponent,
    CompanyAccountGeneralComponent,
    CompanyAccountNotificationsComponent,
    CompanyAccountAdminsManagerComponent,
    CompanyProfileComponent,
    EscapePipe,
    AboutUsComponent,
    AboutUsModalComponent,
    LocationComponent,
    LocationModalComponent,
    DeactivateAccountComponent,
    NameComponent,
    GeneralInfoComponent,
    CompanyPhoneComponent,
    EmailComponent,
    WebsiteComponent,
    CompanyAddressesComponent,
    MilestonesComponent,
    MilestoneModalComponent,
    FoundersComponent,
    FoundersModalComponent,
    ProductsComponent,
    ProductsModalComponent,
    ServicesComponent,
    ServicesModalComponent,
    AwardsComponent,
    AwardsModalComponent,
    CompanyFollowingComponent,
    CompanyFollowersComponent,
    CompanyEmployeesComponent,
    CompanyRaitingComponent,
    AddAdminComponent,
    DeleteAdminComponent,
    CompanyFollowerCompaniesComponent,
    CompanyFollowerPeopleComponent,
    CompanyFollowingCompaniesComponent,
    CompanyFollowingPeopleComponent,
    BenefitsComponent,
    GalleryComponent,
    GalleryModalComponent,
    GalleryImgRowComponent,
    CompanyJobsComponent
    
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgbCarouselModule,
    NgbDropdownModule,
    NgbModule, 
    ProfilesNewsFeedModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild(companyRoutes),
  ],
  providers: [
    {useClass:GalleryService , provide:GalleryService }
  ],
  exports: [
    // CompanyComponent,
    // CompanyRegistrationComponent,
    // CompanyAccountComponent
  ],
})
export class CompanyModule {

 }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileLandingPageComponent } from './user-profile-landing-page.component';
import { UserProfileLandingCategoriesComponent } from './user-profile-landing-categories/user-profile-landing-categories.component';
import { UserProfileLandingBusinessToFollowComponent } from './landing-right-components/user-profile-landing-business-to-follow/user-profile-landing-business-to-follow.component';
import { UserProfileLandingPeopleYouKnowComponent } from './user-profile-landing-people-you-know/user-profile-landing-people-you-know.component';
import { UserProfileLandingImportContactsComponent } from './landing-right-components/user-profile-landing-import-contacts/user-profile-landing-import-contacts.component';
import { UserProfileLandingRegisterBusinessComponent } from './landing-right-components/user-profile-landing-register-business/user-profile-landing-register-business.component';
import { UserProfileLandingBecomeCandidateComponent } from './landing-right-components/user-profile-landing-become-candidate/user-profile-landing-become-candidate.component';
import { UserProfileLandingActiveConnectionsComponent } from './user-profile-landing-active-connections/user-profile-landing-active-connections.component';
import { LandingPageSliderComponent } from './landing-page-slider/landing-page-slider.component';
import { UserProfileLandingNewsFeedComponent } from './user-profile-landing-newsFeed/user-profile-landing-newsFeed.component';
import { LandingPageRecommendedJobsComponent } from './landing-page-recommended-jobs/landing-page-recommended-jobs.component';
import { JobsModule } from 'src/app/jobs/jobs.module';
import { ProfilesNewsFeedModule } from 'src/app/_shared/shared/profiles-news-feed/profiles-news-feed.module';
import { SharedModule } from 'src/app/_shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewsFeedService } from 'src/app/news-feed/services/news-feed.service';
import { UserLandingPageServiceService } from './user-landing-page-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckAuthorizeGuard } from '../_shared/guards/check-authorize.guard';
import { LandingPostJobComponent } from './landing-right-components/landing-post-job/landing-post-job.component';
import { LandingCompanyAdComponent } from './landing-right-components/landing-company-ad/landing-company-ad.component';
import { LandingRegisterBrandComponent } from './landing-right-components/landing-register-brand/landing-register-brand.component';
import { UserProfileLandingNewsFeedPostComponent } from './user-profile-landing-newsFeed/user-profile-landing-news-feed-post/user-profile-landing-news-feed-post.component';

const COMPONENTS = [
   UserProfileLandingPageComponent,
   UserProfileLandingCategoriesComponent,
   UserProfileLandingBusinessToFollowComponent,
   UserProfileLandingPeopleYouKnowComponent,
   UserProfileLandingImportContactsComponent,
   UserProfileLandingRegisterBusinessComponent,
   UserProfileLandingBecomeCandidateComponent,
   UserProfileLandingActiveConnectionsComponent,  
   LandingPageSliderComponent,
   UserProfileLandingNewsFeedComponent,
   LandingPageRecommendedJobsComponent,
   LandingPostJobComponent,
   LandingCompanyAdComponent,
   LandingRegisterBrandComponent
]; 

const ROUTES: Routes = [
    { path:"" , component: UserProfileLandingPageComponent , canActivate:[CheckAuthorizeGuard] }
  ];


@NgModule({
  declarations: [
      COMPONENTS,
      UserProfileLandingNewsFeedPostComponent
  ],
  imports: [
    CommonModule,
    ProfilesNewsFeedModule,      
    SharedModule, 
    NgbModule, 
    FormsModule,
    ReactiveFormsModule, 
    RouterModule.forChild(ROUTES),
  ],
  providers: [
    NewsFeedService,
    UserLandingPageServiceService
  ],
})
export class LandingPageModule { }

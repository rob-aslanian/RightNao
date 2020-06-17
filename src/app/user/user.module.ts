import { NgModule } from '@angular/core';
import { CommonModule, LowerCasePipe } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DragDropModule  } from '@angular/cdk/drag-drop';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import {MessagingModule} from '../messaging/messaging.module';
// users components
import { UserComponent } from './user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { PersonalInformationComponent } from './user-account/personal-information/personal-information.component';
import { SecurityPrivacyComponent } from './user-account/security-privacy/security-privacy.component';
import { NotificationsComponent } from './user-account/notifications/notifications.component';
//month pipe in custom pipe
import { LanguagePipe } from '../_shared/custom-pipes/language.pipe';
import { AccomplishmentComponent } from './user-profile/accomplishment/accomplishment.component';
import { AccomplishmentModalComponent } from './user-profile/accomplishment/accomplishment-modal/accomplishment-modal.component';
import { RecommendationsComponent } from './user-profile/recommendations/recommendations.component';
import { SharedModule } from '../_shared/shared.module';
import { UserInfoComponent } from './user-info/user-info.component';
import { ExperienceComponent } from './user-profile/experience/experience.component';
import { ExperienceModalComponent } from './user-profile/experience/experience-modal/experience-modal.component';
import { EducationComponent } from './user-profile/education/education.component';
import { EducationModalComponent } from './user-profile/education/education-modal/education-modal.component';
import { ReviewsComponent } from './user-profile/reviews/reviews.component';
import { CheckAuthorizeGuard } from '../_shared/guards/check-authorize.guard';
import { UserProfileConnectionsComponent } from './user-profile/user-profile-connections/user-profile-connections.component';
import { UserProfileFollowingComponent } from './user-profile/user-profile-following/user-profile-following.component';
import { UserProfileFollowersComponent } from './user-profile/user-profile-followers/user-profile-followers.component';
import { UserProfileRecommendationsComponent } from './user-profile/user-profile-recommendations/user-profile-recommendations.component';
import { UserProfileReviewsComponent } from './user-profile/user-profile-reviews/user-profile-reviews.component';
import { SkillsExpertiseComponent } from './user-profile/skills-expertise/skills-expertise.component';
import { SkillsModalComponent } from './user-profile/skills-expertise/skills-modal/skills-modal.component';
import { InterestComponent } from './user-profile/interest/interest.component';
import { InterestModalComponent } from './user-profile/interest/interest-modal/interest-modal.component';
import { LanguageComponent } from './user-profile/language/language.component';
import { LanguageModalComponent } from './user-profile/language/language-modal/language-modal.component';
import { StoryComponent } from './user-profile/story/story.component';
import { StoryModalComponent } from './user-profile/story/story-modal/story-modal.component';
import { HeadlineComponent } from './user-profile/headline/headline.component';
import { VerificatonComponent } from './user-account/security-privacy/verificaton/verificaton.component';
import { UserSessionComponent } from './user-account/security-privacy/user-session/user-session.component';
import { UserFollowingPeopleComponent } from './user-profile/user-profile-following/user-following-people/user-following-people.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { UserFollowersCompanyComponent } from './user-profile/user-profile-followers/user-followers-company/user-followers-company.component';
import { UserFollowersPeopleComponent } from './user-profile/user-profile-followers/user-followers-people/user-followers-people.component';
import { UserFollowingCompanyComponent } from './user-profile/user-profile-following/user-following-company/user-following-company.component';
import { UserConnectionsComponent } from './user-profile/user-profile-connections/user-connections/user-connections.component';
import { ToolsTechnologiesComponent } from './user-profile/tools-technologies/tools-technologies.component';
import { ToolsTechnologiesModalComponent } from './user-profile/tools-technologies/tools-technologies-modal/tools-technologies-modal.component';
 
import { NewsFeedMainComponent } from '../news-feed/news-feed-main/news-feed-main.component';
import { ProfilesNewsFeedModule } from '../_shared/shared/profiles-news-feed/profiles-news-feed.module';
 
import { PortfolioComponent } from './user-profile/portfolio/portfolio.component';
import { PortfolioBoxesComponent } from './user-profile/portfolio/portfolio-boxes/portfolio-boxes.component';
import { PortfolioBoxComponent } from './user-profile/portfolio/portfolio-boxes/portfolio-box/portfolio-box.component';
import { AddPortfolioComponent } from './user-profile/portfolio/add-portfolio/add-portfolio.component';
import { UploadFileComponent } from './user-profile/portfolio/add-portfolio/upload-file/upload-file.component';
import { UserportfoliodetailedComponent } from './user-profile/portfolio/portfolio-boxes/portfolio-box/userportfoliodetailed/userportfoliodetailed.component';
import { PortfolioCommentsComponent } from './user-profile/portfolio/portfolio-comments/portfolio-comments.component';
import { PortfolioCommentsPreviewComponent } from './user-profile/portfolio/portfolio-comments/portfolio-comments-preview/portfolio-comments-preview.component';
import { ArticleBoxComponent } from './user-profile/portfolio/portfolio-boxes/article-box/article-box.component';
import { AddArticleComponent } from './user-profile/portfolio/add-article/add-article.component';
import { ArticleDetailedComponent } from './user-profile/portfolio/portfolio-boxes/article-box/article-detailed/article-detailed.component';
import { ArticleCommentsComponent } from './user-profile/portfolio/portfolio-boxes/article-box/article-detailed/article-comments/article-comments.component';
import { MusicPortfolioComponent } from './user-profile/portfolio/music-portfolio/music-portfolio.component';
import { AddMusicComponent } from './user-profile/portfolio/music-portfolio/add-music/add-music.component';
import { MusicBoxComponent } from './user-profile/portfolio/music-portfolio/music-box/music-box.component';
import { MainUserDetailsComponent } from './user-profile/main-user-details/main-user-details.component';
import { MusicPortfolioDetailedComponent } from './user-profile/portfolio/music-portfolio/music-portfolio-detailed/music-portfolio-detailed.component';
import { ProgressBarMusicComponent } from './user-profile/portfolio/music-portfolio/music-portfolio-detailed/progress-bar-music/progress-bar-music.component';
 

export function createTranslateLoader(http:HttpClient){
  return new TranslateHttpLoader(http , 'assets/i18n/' , '.json');
}


const userRoutes: Routes = [
  { 
    path: '', component: UserComponent,
    children: [
      { path: 'profile/:url', component: UserProfileComponent , children:
          [
            { path: 'wall/:id', component:NewsFeedMainComponent  },
            { path: 'user-recommendations', component: UserProfileRecommendationsComponent },
            { path: 'user-reviews/:id',   component: UserProfileReviewsComponent },
            { path: 'portfolio/:id', component: PortfolioComponent, children: [
               { path: '', redirectTo: 'Photo', pathMatch: 'full' },
               { path: 'Photo', component: PortfolioBoxesComponent  ,    data: { type: 'Photo' }},
               { path: 'Video', component: PortfolioBoxesComponent  ,    data: { type: 'Video' }},
               { path: 'Article', component: PortfolioBoxesComponent,    data: { type: 'Article' }},
               { path: 'Music', component: PortfolioBoxesComponent,      data: { type: 'Audio' } },
               { path: 'Music/:id/Music', component: MusicPortfolioDetailedComponent },
               { path: ':id/Article', component: ArticleDetailedComponent },
               { path: 'add-portfolio/:type',  component: AddPortfolioComponent, data: { type: 'add' } },
               { path: 'edit-portfolio/:id/:type', component: AddPortfolioComponent , data: { type: 'edit' } },
               { path: 'edit-article/:id/:type', component: AddArticleComponent , data: { type: 'edit' } },
               { path: 'add-article', component: AddArticleComponent  },
               { path: 'add-music/Music', component: AddMusicComponent  }
            ] }
          ]},
      {
        path: 'account/:id', component: UserAccountComponent, canActivateChild:[CheckAuthorizeGuard], children:
        [
          { path: '', redirectTo: 'general', pathMatch: 'full' },
          { path: 'general', component: PersonalInformationComponent },
          { path: 'notifications', component: NotificationsComponent},
          { path: 'security', component: SecurityPrivacyComponent }
        ]
      }
      
    ]
  }

];



@NgModule({
  declarations: [ 
    UserComponent, 
    UserProfileComponent, 
    UserAccountComponent, 
    PersonalInformationComponent, 
    SecurityPrivacyComponent, 
    NotificationsComponent, 
    LanguagePipe,
    AccomplishmentComponent,
    AccomplishmentModalComponent,
    RecommendationsComponent,
    UserInfoComponent,
    ExperienceComponent,
    ExperienceModalComponent,
    EducationComponent,
    EducationModalComponent,
    ReviewsComponent,
    UserProfileConnectionsComponent,
    UserProfileFollowingComponent,
    UserProfileFollowersComponent,
    UserProfileRecommendationsComponent,
    UserProfileReviewsComponent,
    SkillsExpertiseComponent,
    SkillsModalComponent,
    InterestComponent,
    InterestModalComponent,
    LanguageComponent,
    LanguageModalComponent,
    StoryComponent,
    StoryModalComponent,
    HeadlineComponent,
    VerificatonComponent,
    UserSessionComponent,
    UserFollowingPeopleComponent,
    UserFollowingCompanyComponent,
    UserFollowersCompanyComponent,
    UserFollowersPeopleComponent,
    UserConnectionsComponent,
    ToolsTechnologiesComponent,
    ToolsTechnologiesModalComponent,
    MainUserDetailsComponent,
    PortfolioComponent,
    PortfolioBoxesComponent,
    PortfolioBoxComponent,
    AddPortfolioComponent,
    UploadFileComponent,
    UserportfoliodetailedComponent,
    ArticleBoxComponent,
    PortfolioCommentsComponent,
    PortfolioCommentsPreviewComponent,
    AddArticleComponent,
    ArticleDetailedComponent,
    ArticleCommentsComponent,
    MusicPortfolioComponent,
    AddMusicComponent,
    MusicBoxComponent,
    MusicPortfolioDetailedComponent,
    ProgressBarMusicComponent,
  ],
  
  imports: [
    CommonModule,
    MessagingModule, 
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    DragDropModule,
    SharedModule,
    ProfilesNewsFeedModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild(userRoutes),
  ],

  // providers:[
  //   {
  //     provide:HTTP_INTERCEPTORS,
  //     useClass:AuthInterceptor,
  //     multi:true
  //   }
  // ],
  bootstrap: [UserProfileComponent],
  exports: [
    UserProfileComponent,
    // TranslateModule
  ]
})
export class UserModule { 
}


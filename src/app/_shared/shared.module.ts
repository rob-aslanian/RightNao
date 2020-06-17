import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// libs
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AccomplishmentService } from './services/accomplishment.service';
import { RecommendationService } from './services/recommendation.service';
import { FileUploadService } from './services/file-upload.service';
import { AppModalComponent } from './components/app-modal/app-modal.component';
import { EditProfilePictureComponent } from './components/edit-profile-picture/edit-profile-picture.component';
import { CapitalizePipe } from './pipes/capitalize.pipe'
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddDelimetrPipe } from './pipes/add-delimetr.pipe';
import { BusinesHoursComponent } from './components/busines-hours/busines-hours.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbTimepickerModule, 
         NgbTypeaheadModule, 
         NgbRatingModule, 
         NgbPopoverModule, 
         NgbTooltipModule, 
         NgbDropdownModule, 
         NgbTabsetModule, 
         NgbPaginationModule  
        } from '@ng-bootstrap/ng-bootstrap';

import { AboutUsService } from './services/companies/about-us.service';
import { PhoneComponent } from './components/phone/phone.component';
import { LocationService } from './services/companies/location.service';
import { AddImageComponent} from '../_shared/components/add-image/add-image.component';
import { ImageUploadService } from './services/shared/image-upload.service';
import { UserExperienceService } from './services/user/user-experience.service';
import { MoreLessComponent } from './components/more-less/more-less.component';
import { EducationService } from './services/user/education.service';
import { CompanyAccountService } from './services/companies/company-account.service';
import { IndustryComponent } from './components/industry/industry.component';
import { LocationFormComponent } from './components/company/location-form/location-form.component';
import {ReccomendationsModalComponent} from '../_shared/components/reccomendations-modal/reccomendations-modal.component';
import { CoverImageComponent } from './components/company/cover-image/cover-image.component';
import { CoverImageService } from './services/companies/cover-image.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CompanyProfileService } from './services/companies/company-profile.service';
import { SmallInfoBoxComponent } from '../_shared/components/small-info-box/small-info-box.component';
import { SaveToPDFComponent } from '../_shared/components/save-to-pdf/save-to-pdf.component';
import { NotificationAlertComponent } from './components/notification-alert/notification-alert.component';
import { WriteReviewComponent } from './components/company/write-review/write-review.component';
import { UserAccountService } from './services/user/user-account.service';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { AngularEditorComponent } from './components/text-editor/angular-editor.component';
import { AngularEditorToolbarComponent } from './components/text-editor/angular-editor-toolbar.component';
import { UserProfileService } from './services/user/user-profile.service';
import { FollowersPeopleComponent } from '../network/network-followers/followers-people/followers-people.component';

import { JobsCompanyService } from './services/jobs/jobs-company.service';
import { UserJobsService } from './services/jobs/user-jobs.service';
import { CompanyDetailsComponent } from './components/jobs/company-details/company-details.component';
import { CompanyBoxComponent } from './components/jobs/company-box/company-box.component';

// filters
import { PeopleComponent } from '../network/network-following/people/people.component';

import { ApplyModalComponent } from '../jobs/shared/apply-modal/apply-modal.component';
import { AddDocumentComponent } from './components/add-document/add-document.component';
import { UserBoxComponent } from './components/jobs/user-box/user-box.component';
import { UserDetailsComponent } from './components/jobs/user-details/user-details.component';
import { MonthPipe } from './custom-pipes/month.pipe';
import { InviteToApplyComponent } from './components/jobs/invite-to-apply/invite-to-apply.component';
import { NotificationAlertComponent as NotificationBox } from '../notifications/notification-alert/notification-alert.component';
import { NotificationRowComponent } from '../notifications/notification-row/notification-row.component';
import { InfinityScrollComponent } from './components/infinity-scroll/infinity-scroll.component';
import { LoaderComponent } from './components/loader/loader.component';
import { CommonHeaderLandPagesComponent } from './components/common-header-land-pages/common-header-land-pages.component';
import { ProgressCircleComponent } from './components/progress-circle/progress-circle.component';
import { FollowersCompaniesComponent } from '../network-company/network-followers/followers-companies/followers-companies.component';
import { CompaniesComponent } from '../network-company/network-following/companies/companies.component';
import { NetworkFollowersComponent } from '../network-company/network-followers/network-followers.component';
// import { PeopleComponent as CompanyFollowingPeople } from '../network-company/network-following/people/people.component';
import { FollowersPeopleComponent as CompanyFollowersPeople } from  "../network-company/network-followers/followers-people/followers-people.component"; 
import { SpinnerComponent } from './components/spinner/spinner.component';
import { AppHeaderFiltersComponent } from './components/app-header-filters/app-header-filters.component';
import { AppPhotoModalComponent } from './components/app-photo-modal/app-photo-modal.component';
import { UtilsService } from './services/shared/utils.service';
import { NetworkConnectionsComponent } from '../network/network-connections/network-connections.component';
import { ReportBlockUserComponent } from './components/report-block-user/report-block-user.component';
import { SafePipe } from './pipes/safe.pipe';
import { ShareModule } from '@ngx-share/core';
import { NetworkUserService } from './services/network/network-user.service';
import { NetworkCompanyService } from './services/network/network-company.service';
import { CreditCardModalComponent } from './components/credit-card-modal/credit-card-modal.component';
import { ProfileStatisticService } from './services/statistic/profile-statistic.service';
import { AdsComponent } from './components/ads/ads.component';
import { BenefitsModalComponent } from './components/benefits-modal/benefits-modal.component';
import { UserHiringComponent } from './components/jobs/user-hiring/user-hiring.component';
import { AppLazyImageDirective } from './directives/app-lazy-image.directive';
import { MorePopupComponent } from './components/more-popup/more-popup.component';
import { ExportAsModule } from 'ngx-export-as';
import { MediaAndLinkComponent } from './components/media-and-link/media-and-link.component';
import { ProfileLangsComponent } from './components/profile-langs/profile-langs.component';
import { LangsModalComponent } from './components/modals/langs-modal/langs-modal.component';
import { ProfileLangsService } from './services/shared/profile-langs.service';
import { SliderComponent } from './components/slider/slider.component';
import { FileContainerComponent } from './components/file-container/file-container.component';
import { CompanyAddressPipe } from './pipes/company-address.pipe';
import { ReadMoreComponent } from './components/read-more/read-more.component';
import { IndustryPipe } from './pipes/industry.pipe';
import { RankPipe } from './pipes/rank.pipe';
import { FilesViewerComponent } from './components/files-viewer/files-viewer.component';
import { TranslateModule } from '@ngx-translate/core';
import { LangPipe } from './pipes/lang.pipe';
import { AddDotsPipe } from './pipes/add-dots.pipe';
import { CountryPipe } from './pipes/country.pipe';
import { ImportFromProfileComponent } from './components/import-from-profile/import-from-profile.component';
import { MimeTypePipe } from './pipes/mime-type.pipe';
import { ExperiencePipe } from './pipes/experience.pipe';
import { BeautifyPipe } from './pipes/beautify.pipe';
import { VacansyMatchComponent } from './components/jobs/company-details/vacansy-match/vacansy-match.component';
import { VacansyMatchContainerComponent } from './components/jobs/company-details/vacansy-match-container/vacansy-match-container.component';
import { EmptyProfileComponent } from './components/empty-profile/empty-profile.component';
import { FileIconPipe } from './pipes/file-icon.pipe';
import { InviteMembersComponent } from './components/invite-members/invite-members.component';
import { DateFromToPipe } from './pipes/date-from-to.pipe';
import { FollowingModalComponent } from '../user/user-profile/following-modal/following-modal.component';
import { ProfileBoxComponent } from './components/profile-box/profile-box.component';
import { FollowingPeopleComponent } from '../user/user-profile/following-modal/following-people/following-people.component';
import { FollowingCompanyComponent } from '../user/user-profile/following-modal/following-company/following-company.component';
import { FollowersModalComponent } from '../user/user-profile/followers-modal/followers-modal.component';
import { FollowersCompanyComponent } from '../user/user-profile/followers-modal/followers-company/followers-company.component';
import { FollowersPeopleModalComponent } from '../user/user-profile/followers-modal/followers-people-modal/followers-people-modal.component';
import { ConnectionsModalComponent } from '../user/user-profile/connections-modal/connections-modal.component';
import { NetworkSharedModule } from './shared/network-shared/network-shared.module';
import { CompanySizePipe } from './pipes/company-size.pipe';
import { UserCareerNewOppComponent } from '../jobs/user-jobs/user-career/user-career-new-opp/user-career-new-opp.component';
import { AvatarPipe } from './pipes/avatar.pipe';
import { SharedSliderComponent } from './components/shared-slider/shared-slider.component';
import { AppAutoFocusDirective } from './directives/app-autoFocus.directive';
import { ToolsPipe } from './pipes/tools.pipe';
import { FilePipe } from './pipes/file.pipe';
import { CommingSoonComponent } from './components/comming-soon/comming-soon.component';
import { WalletCounterComponent } from '../wallet/shared/wallet-counter/wallet-counter.component';
import { UserProfileLandingLanguagesComponent } from '../profile-landing-page/user-profile-landing-languages/user-profile-landing-languages.component';
import { LandingLanguagesModalComponent } from '../profile-landing-page/user-profile-landing-languages/landing-languages-modal/landing-languages-modal.component';
import { DreamJobComponent } from './components/dream-job/dream-job.component';
import { UploadFileServiceComponent } from './components/upload-file/upload-file.component';
import { OrderBoxComponent } from './components/order-box/order-box.component';
import { StatusPipe } from './pipes/status.pipe';
import { GetUrlPipe } from './pipes/get-url.pipe';
import { WriteReviewServiceComponent } from './components/write-review-service/write-review-service.component';
import { ServiceOrderReviewBoxComponent } from './components/service-order-review-box/service-order-review-box.component';
import { StarsRatingComponent } from './components/stars-rating/stars-rating.component';
import { DragDropDirective } from './directives/drag-drop.directive';
import { ServicesBoxComponent } from './components/services-box/services-box.component';
import { ServiceRequestBoxComponent } from './components/service-request-box/service-request-box.component';
import { RankBoxComponent } from './components/rank-box/rank-box.component';
import { ServiceSliderComponent } from './components/service-slider/service-slider.component';
import { HomeBoxComponent } from './components/home-box/home-box.component';
import { DynamicStepsComponent } from './components/dynamic-steps/dynamic-steps.component';
import { ServiceSliderEditionTwoComponent } from './components/service-slider-edition-two/service-slider-edition-two.component';
import { AdsImageComponent } from './components/ads/containers/ads-image/ads-image.component';
import { AdsResponsiveComponent } from './components/ads/containers/ads-responsive/ads-responsive.component';
import { AdsSingleImageComponent } from './components/ads/containers/ads-single-image/ads-single-image.component';
import { AdsSpotlightComponent } from './components/ads/containers/ads-spotlight/ads-spotlight.component';
import { AdsSearchComponent } from './components/ads/containers';
import { JobViewComponent } from './components/jobs/job-view/job-view.component';
import { PaymentBoxComponent } from '../real-estate/add-estate/payment-estate/payment-box/payment-box.component';

  
  
const DYNAMIC_COMPONENTS = [
  AdsImageComponent,
  AdsResponsiveComponent,
  AdsSingleImageComponent,
  AdsSpotlightComponent,
  AdsSearchComponent,
];
 
const COMPONENTS = [
  SmallInfoBoxComponent,
  HeaderComponent,
  ServiceSliderEditionTwoComponent,
  DynamicStepsComponent,
  HomeBoxComponent,
  CommonHeaderLandPagesComponent,
  FooterComponent,
  AppModalComponent,
  EditProfilePictureComponent,
  CapitalizePipe,
  AddDelimetrPipe,
  SafePipe,
  MonthPipe,
  CompanyAddressPipe,
  ReportBlockUserComponent,
  BusinesHoursComponent,
  PhoneComponent,
  AddImageComponent,
  MoreLessComponent,
  IndustryComponent,
  LocationFormComponent,
  ReccomendationsModalComponent,
  CoverImageComponent,
  SaveToPDFComponent,
  NotificationAlertComponent,
  WriteReviewComponent,
  ClickOutsideDirective,
  AppLazyImageDirective,
  AppAutoFocusDirective,
  AngularEditorComponent,
  AngularEditorToolbarComponent,
  FollowersPeopleComponent,
  PeopleComponent,
  CompanyBoxComponent,
  CompanyDetailsComponent,
  ApplyModalComponent,
  AddDocumentComponent,
  UserBoxComponent,
  UserDetailsComponent,
  InviteToApplyComponent,
  NotificationBox,
  NotificationRowComponent,
  InfinityScrollComponent,
  LoaderComponent,
  ProgressCircleComponent,
  FollowersCompaniesComponent, 
  CompaniesComponent,
  NetworkFollowersComponent,
  CompanyFollowersPeople,
  SpinnerComponent,
  AppHeaderFiltersComponent,
  NetworkConnectionsComponent,
  CreditCardModalComponent,
  BenefitsModalComponent,
  UserHiringComponent,
  MorePopupComponent,
  MediaAndLinkComponent,
  ProfileLangsComponent,
  LangsModalComponent,
  SliderComponent,
  FileContainerComponent,
  ReadMoreComponent,
  IndustryPipe,
  RankPipe,
  FilesViewerComponent,
  LangPipe,
  AddDotsPipe,
  CountryPipe,
  MimeTypePipe,
  BeautifyPipe,
  ExperiencePipe,
  FileIconPipe,
  DateFromToPipe,
  CompanySizePipe,
  ImportFromProfileComponent,
  VacansyMatchComponent,
  VacansyMatchContainerComponent,
  EmptyProfileComponent,
  InviteMembersComponent, 
  FollowingModalComponent,
  FollowingPeopleComponent,
  FollowingCompanyComponent,
  FollowersModalComponent,
  FollowersCompanyComponent,
  FollowersPeopleModalComponent,   
  ConnectionsModalComponent,
  ProfileBoxComponent,
  UserCareerNewOppComponent,
  AvatarPipe,
  AppPhotoModalComponent,
  SharedSliderComponent,
  ToolsPipe,
  FilePipe,
  GetUrlPipe,
  CommingSoonComponent,
  WalletCounterComponent,
  UserProfileLandingLanguagesComponent,
  LandingLanguagesModalComponent,
  DreamJobComponent,
  UploadFileServiceComponent,
  OrderBoxComponent,
  StatusPipe,
  WriteReviewServiceComponent,
  ServiceOrderReviewBoxComponent,
  StarsRatingComponent,
  DragDropDirective,
  ServicesBoxComponent,
  AdsComponent,
  ServiceRequestBoxComponent,
  RankBoxComponent,
  ServiceSliderComponent,
  JobViewComponent,
  ...DYNAMIC_COMPONENTS,
  PaymentBoxComponent
]

@NgModule({
  declarations:COMPONENTS,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    NgbRatingModule,
    NgbTabsetModule,
    NgMultiSelectDropDownModule,
    NgbTimepickerModule,
    NgbTypeaheadModule,
    NgbPopoverModule,
    NgbTooltipModule,
    NgbDropdownModule,
    TranslateModule,
    DragDropModule,
    ShareModule,
    ExportAsModule,
    NetworkSharedModule, 
    NgbPaginationModule
    
  ],
  providers:[
    { useClass: AccomplishmentService , provide:AccomplishmentService },
    { useClass:RecommendationService , provide:RecommendationService },
    { useClass:AboutUsService , provide:AboutUsService },
    { useClass:FileUploadService , provide:FileUploadService },
    { useClass:LocationService , provide:LocationService },
    { useClass:ImageUploadService  , provide:ImageUploadService },
    { useClass:UserExperienceService  , provide:UserExperienceService },
    { useClass:EducationService  , provide:EducationService },
    { useClass:CompanyAccountService  , provide:CompanyAccountService },
    { useClass:CoverImageService  , provide:CoverImageService },
    { useClass:CompanyProfileService  , provide:CompanyProfileService },
    { useClass:UserAccountService  , provide:UserAccountService },
    { useClass:UserProfileService  , provide:UserProfileService },
    { useClass:JobsCompanyService  , provide:JobsCompanyService },
    { useClass:UserJobsService  , provide:UserJobsService },
    { useClass:UtilsService  , provide:UtilsService },
    { useClass:NetworkUserService  , provide:NetworkUserService },
    { useClass:NetworkCompanyService  , provide:NetworkCompanyService },
    { useClass:ProfileStatisticService  , provide:ProfileStatisticService },
    { useClass:ProfileLangsService  , provide:ProfileLangsService },
  
  ],
  entryComponents:[
    ...DYNAMIC_COMPONENTS,
    NotificationAlertComponent,
  ],
  exports: [
    CommonModule,
    TranslateModule,
    ...COMPONENTS,
  ],
})


export class SharedModule {

}

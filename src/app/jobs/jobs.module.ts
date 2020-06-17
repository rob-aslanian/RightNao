import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { JobsComponent } from "./jobs.component";
import { CompanyJobsComponent } from "./company/company-jobs/company-jobs.component";
import { JobListComponent } from "./job-list/job-list.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PostAJobComponent } from "./company/post-a-job/post-a-job.component";
import { CandidateListComponent } from "./candidate-list/candidate-list.component";
import { ManageCandidateListComponent } from "./manage-candidate-list/manage-candidate-list.component";
import { JobBenefitsModalComponent } from "./job-benefits-modal/job-benefits-modal.component";
import { JobPreviewModalComponent } from "./job-preview-modal/job-preview-modal.component";
import { SharedModule } from "../../app/_shared/shared.module";
import { JobsApplicantsComponent } from "./company/jobs-applicants/jobs-applicants.component";
import { MyJobsComponent } from "./company/my-jobs/my-jobs.component";
import { UserJobsComponent } from "./user-jobs/user-jobs.component";
import { UserCareerComponent } from "./user-jobs/user-career/user-career.component";
import { UserManageJobsComponent } from "./user-jobs/user-manage-jobs/user-manage-jobs.component";
import { UserRecommendedJobsComponent } from "./user-jobs/user-recommended-jobs/user-recommended-jobs.component";
import { JobsApplicantComponent } from './company/jobs-applicant/jobs-applicant.component';
import { CheckAuthorizeGuard } from "../_shared/guards/check-authorize.guard";
import { CompanyDashboardComponent } from './company/company-dashboard/company-dashboard.component';
import { SavedCandidatesComponent } from "./company/saved-candidates/saved-candidates.component";
import { SkippedCandidateComponent } from "./company/skipped-candidate/skipped-candidate.component";
import { JobsStepperComponent } from './company/post-a-job/jobs-stepper/jobs-stepper.component';
import { JobsPricingInfoComponent } from './company/post-a-job/jobs-pricing-info/jobs-pricing-info.component';
import { JobApplicantQuailificationComponent } from './company/post-a-job/job-applicant-quailification/job-applicant-quailification.component';
import { JobQualificationModalComponent } from './company/post-a-job/job-applicant-quailification/job-qualification-modal/job-qualification-modal.component';
import { JobQualificationContainerComponent } from './company/post-a-job/job-applicant-quailification/job-qualification-container/job-qualification-container.component';
import { JobAdditionalInfoComponent } from "./company/post-a-job/job-additional-info/job-additional-info.component";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { UserDashboardComponent } from './user-jobs/user-dashboard/user-dashboard.component';
import { UserSavedJobsComponent } from './user-jobs/user-saved-jobs/user-saved-jobs.component';
import { UserAppliedJobsComponent } from './user-jobs/user-applied-jobs/user-applied-jobs.component';
import { UserInvitationJobsComponent } from './user-jobs/user-invitation-jobs/user-invitation-jobs.component';
import { UserSkippedJobsComponent } from './user-jobs/user-skipped-jobs/user-skipped-jobs.component';
import { CareerService } from "./user-jobs/user-career/career.service";
import { UserCareerEditComponent } from './user-jobs/user-career/user-career-edit/user-career-edit.component';
import { UserCareerDashboardComponent } from './user-jobs/user-career/user-career-dashboard/user-career-dashboard.component';
import { JobExposureComponent } from './company/post-a-job/job-exposure/job-exposure.component';
// Routes for jobs module
const jobRoutes: Routes = [
  {
    path: "" ,
    component: JobsComponent,
    children: [
      /// User
      { path: "user", children:[
          { path: "", component: UserJobsComponent },
          { path: "carrer-interest",  component: UserCareerComponent , resolve:{ career: CareerService } , 
            children:[
              { path:'' , component:UserCareerDashboardComponent },
              { path:'manage' , component:UserCareerEditComponent },
              { path:'new' , component:UserCareerEditComponent },
            ] 
          },

          { path: "dashboard" , component: UserDashboardComponent , children:[
            { path:"" , pathMatch:'full', redirectTo:"saved"  },
            { path: "saved", component: UserSavedJobsComponent },
            { path: "applied", component: UserAppliedJobsComponent  },
            { path: "invitations" , component:UserInvitationJobsComponent },
            { path: "skipped", component: UserSkippedJobsComponent  },
          ]},
        ]
      },
      /// Company
      {
        path: "company" , canActivateChild:[CheckAuthorizeGuard],
        children: [
          { path: "", component: JobListComponent },
          { path:"dashboard" , component:CompanyDashboardComponent , children:[
            { path:"" , pathMatch:'full', redirectTo:"my-jobs"  },
            { path: "my-jobs", component: MyJobsComponent },
            { path: "applicants", component: JobsApplicantsComponent  },
            { path: "applicants/:title/:id" , component:JobsApplicantComponent },
            { path: "saved-candidate", component: SavedCandidatesComponent  },
            { path: "skipped-candidate", component: SkippedCandidateComponent  },
          ]},
          { path: "post-a-job", component: PostAJobComponent },
          { path: "post-a-job/:id", component: PostAJobComponent },

        ]
      }
    ]
  }
];

@NgModule({
  declarations: [
    JobsComponent,
    CompanyJobsComponent,
    JobListComponent,
    PostAJobComponent,
    CandidateListComponent,
    ManageCandidateListComponent,
    JobBenefitsModalComponent,
    JobPreviewModalComponent,
    JobsApplicantsComponent,
    MyJobsComponent,
    UserJobsComponent,
    UserCareerComponent,
    UserManageJobsComponent,
    UserRecommendedJobsComponent,
    JobsApplicantComponent,
    CompanyDashboardComponent,
    SavedCandidatesComponent,
    SkippedCandidateComponent,
    JobsStepperComponent,
    JobsPricingInfoComponent,
    JobApplicantQuailificationComponent,
    JobQualificationModalComponent,
    JobQualificationContainerComponent,
    JobAdditionalInfoComponent,
    UserDashboardComponent,
    UserSavedJobsComponent,
    UserAppliedJobsComponent,
    UserInvitationJobsComponent,
    UserSkippedJobsComponent,
    UserCareerEditComponent,
    UserCareerDashboardComponent,
    JobExposureComponent
  ],
  providers: [ CareerService ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(jobRoutes),
    FormsModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule,
    NgbModule
  ],
  bootstrap: [JobListComponent],
  entryComponents: [
    JobBenefitsModalComponent,
    JobPreviewModalComponent
  ],
  exports: [JobListComponent]
})
export class JobsModule {}

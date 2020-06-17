import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CareerCenterRoutingModule } from './career-center-routing.module';

import { CareerCenterComponent } from './career-center.component';
import { CareerForUserComponent } from './career-for-user/career-for-user.component';
import { CareerForComapnyComponent } from './career-for-comapny/career-for-comapny.component';
import { OpenCareerCenterComponent } from './career-for-comapny/open-career-center/open-career-center.component';
import { MyCenterComponent } from './career-for-comapny/my-center/my-center.component';
import { SharedModule } from '../_shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CandidatesComponent } from './career-for-comapny/candidates/candidates.component';
import { CompanyCareerCenterInfoComponent } from './shared/company-career-center-info/company-career-center-info.component';
import { CompanyCareerCenterJobsComponent } from './shared/company-career-center-jobs/company-career-center-jobs.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    CareerCenterComponent,
    CareerForUserComponent,
    CareerForComapnyComponent,
    OpenCareerCenterComponent,
    MyCenterComponent,
    CandidatesComponent,
    CompanyCareerCenterInfoComponent,
    CompanyCareerCenterJobsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CareerCenterRoutingModule,
    NgbDropdownModule,
  ]
})
export class CareerCenterModule { }

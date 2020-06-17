import { Component, OnInit } from '@angular/core';
import { JobsCompanyService } from 'src/app/_shared/services/jobs/jobs-company.service';
import { Observable } from 'rxjs';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-jobs-applicants',
  templateUrl: './jobs-applicants.component.html',
  styleUrls: ['../company-jobs/company-jobs.component.scss']
})
export class JobsApplicantsComponent implements OnInit {

  companyID:string;
  applicantAmount:Observable<any>;
  applicants:any[];
  totalCount:number = 0;

  constructor(
    private jobsService:JobsCompanyService,
    private globalServie:GlobalUserProService
  ) { 
    this.companyID = this.globalServie.getComapnyId();
  }

  ngOnInit() {

    /// Applicants 
    this.jobsService
        .getApplicants(this.companyID)
        .pipe(map(({ data }) => data.GetListOfJobsWithSeenStat))
        .subscribe(
          (data) => {;
            this.totalCount = data.reduce((count , appl) => count + appl.total_amount  , 0); /// Total Applicant count
            this.applicants = data;
          },
          (err) => console.log(err)
          
        ); 

                              
  }

}

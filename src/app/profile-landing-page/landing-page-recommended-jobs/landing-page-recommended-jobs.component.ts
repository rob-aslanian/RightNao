import { Component, OnInit, OnDestroy } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { Observable } from 'rxjs';
import { UserJobsService } from 'src/app/_shared/services/jobs/user-jobs.service';
import { map } from 'rxjs/operators';
import { JobsCompanyService } from 'src/app/_shared/services/jobs/jobs-company.service';

@Component({
  selector: 'app-landing-page-recommended-jobs',
  templateUrl: './landing-page-recommended-jobs.component.html',
  styleUrls: ['./landing-page-recommended-jobs.component.scss']
})
export class LandingPageRecommendedJobsComponent implements OnInit, OnDestroy  {

  isCompanyActive: boolean;
  userId : string; 
  companyID :string;  
  reccomendedJobs: Observable<any>;  
  candidates: Observable<any>;

  constructor(
    private jobService:UserJobsService,
    private globalService: GlobalUserProService,
    private jobsCompanyService: JobsCompanyService
  ) { }

  ngOnInit() {
    this.isCompanyActive = this.globalService.isCompanyActive();
    this.isCompanyActive ? this.companyID = this.globalService.getCompanyProfile()['id'] : 
    this.userId =  this.globalService.getUserProfile()['id']; 
    
    this.reccomendedJobs = this.getRecomendedJobs();
    this.candidates =  this.getCandidates(); 
    
  }

  getRecomendedJobs() {
    return this.jobService
               .getReccomendedJobs()
               .pipe(
                 map(data => data)
               )
    }; 

  getCandidates() : Observable<any>{
    return this.jobsCompanyService
               .getAllCandidate()
               .pipe(map(({data}) => data['searchCandidate']))
  }

  ngOnDestroy() {
   
  }

 
}

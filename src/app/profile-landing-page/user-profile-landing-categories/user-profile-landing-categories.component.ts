import { Component, OnInit } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { UserJobsService } from 'src/app/_shared/services/jobs/user-jobs.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JobsCompanyService } from 'src/app/_shared/services/jobs/jobs-company.service';


@Component({
  selector: 'app-user-profile-landing-categories',
  templateUrl: './user-profile-landing-categories.component.html',
  styleUrls: ['./user-profile-landing-categories.component.scss']
})
export class UserProfileLandingCategoriesComponent implements OnInit {

  isCompanyActive: boolean; 
  currentCountry: string; 
  amountOfJobsInYourLocation$: Observable<number>; 
  amoutOfAllJobs$: Observable<number>; 
  amountOfTodaysJobs$: Observable<number>; 
  amoutOfAllCandidates$: Observable<number>; 

  constructor(
    private globalService: GlobalUserProService, 
    private jobsService: UserJobsService,
    private jobsCompanyService: JobsCompanyService
  ) { }

  ngOnInit() {

      this.isCompanyActive = this.globalService.isCompanyActive(); 
      this.currentCountry = this.globalService.location; 
  
      this.amoutOfAllJobs$ = this.getAmountOfAllJobs(); 
      this.amoutOfAllCandidates$ = this.getAmoutOfCandidates(); 
      this.amountOfJobsInYourLocation$ = this.getAmountOfJobsInYourLocation(); 
      this.amountOfTodaysJobs$ = this.getAmountOfTodaysJobs(); 

  }

  getAmountOfJobsInYourLocation() {
    return this.jobsService
               .getAllJob([this.currentCountry])
               .pipe(
                 map(data => data['data']['searchJobs']['amount_of_results'])
               )
  }; 

  getAmountOfAllJobs() {
    return this.jobsService
               .getAllJob()
               .pipe(
                 map(data => data['data']['searchJobs']['amount_of_results']) 
               )                
  }; 

  getAmoutOfCandidates() {
    return this.jobsCompanyService
               .getAllCandidate()
               .pipe(
                 map(data => data['data']['searchCandidate']['amount_of_results'])
               )
  }; 

  getAmountOfTodaysJobs() {
    const today = 'past_24_hours';   
    return this.jobsService
                .getAllJob([this.currentCountry],[today])
                .pipe(
                  map(data => data['data']['searchJobs']['amount_of_results'])
                )
  }; 







}

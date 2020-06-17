import { Component, OnInit } from '@angular/core';

import '../../company/company-jobs/company-jobs.component.scss';
import { UserJobsService } from 'src/app/_shared/services/jobs/user-jobs.service';
import { Observable } from 'rxjs';
import { utilities } from 'src/app/_shared/utilities/utilities';
@Component({
  selector: 'app-user-recommended-jobs',
  templateUrl: './user-recommended-jobs.component.html',
  styleUrls: ['./user-recommended-jobs.component.scss' , "../../company/company-jobs/company-jobs.component.scss" ,
              '../../job-list/job-list.component.scss' , ]
})
export class UserRecommendedJobsComponent implements OnInit {

  reccomendedJobs:Observable<any>;
  utils = utilities;

  isDetails:{
    [id:number]:boolean
  } = {}

  constructor(
    private jobService:UserJobsService
  ) { }

  ngOnInit() {
    this.reccomendedJobs = this.jobService
                                .getReccomendedJobs();

    this.reccomendedJobs.subscribe();
  }


  /**
   * Skip job 
   * 
   * @param jobId 
   */
  skipJob(jobId:string){
    this.jobService
        .skipJob(jobId)
        .subscribe();
  }

  /**
   * Save job 
   * 
   * @param jobId 
   */
  saveJob(jobId:string){
    this.jobService
        .saveJob(jobId)
        .subscribe()
  }

  /**
   * Unsave job
   * 
   * @param jobId 
   */
  unsaveJob(jobId:string){
    this.jobService
        .unsaveJob(jobId)
        .subscribe()
  }

}

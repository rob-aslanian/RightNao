import { Component, OnInit } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { JobsCompanyService } from 'src/app/_shared/services/jobs/jobs-company.service';
import { map } from 'rxjs/operators';
import { JobStatuses } from '../../models/postJobmodels';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['../company-jobs/company-jobs.component.scss' , './my-jobs.component.scss']
})
export class MyJobsComponent implements OnInit {

  companyID:string;
  jobs:any[];
  user: any;
  showSortPopup:boolean = false;
  statuses = JobStatuses;
  jobsData: any[];
  selectedName:string = '';

  constructor(
    private userService:GlobalUserProService,
    private jobsService:JobsCompanyService
  ) { 
    this.companyID = this.userService.getComapnyId();
    this.user = this.userService.getUserProfile();
  }

  ngOnInit() {
    if(this.companyID){
      this.jobsService 
          .getPostedJob(this.companyID)
          .pipe(map(({data}) => data['GetPostedJobs']))
          .subscribe(
            (data) => {
              this.jobs = data;
              this.jobsData = data;
            },
            (err) => console.log(err)
            
          );

    }
  }

  sortBy(status:string){

     this.jobs = this.jobsData;
     this.selectedName = status;
     this.showSortPopup = false;

     return status !== 'All' ? this.jobs.filter(job => job.status === status) :
                               this.jobsData;
  }

  activateJob(job:any){
    if(!job) return;

    this.jobsService
        .activeJob(this.companyID , job.id)
        .subscribe(
          (data) => { job.status = 'Active';},
          (err) => console.log(err)
          
        )
  }

  pauseJob(job:any){
    if(!job) return;

    this.jobsService
        .pauseJob(this.companyID , job.id)
        .subscribe(
          (data) => { job.status = 'Paused';},
          (err) => console.log(err)
          
        )
  }

}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserJobsService } from 'src/app/_shared/services/jobs/user-jobs.service';
import { map, distinctUntilChanged } from 'rxjs/operators';



@Component({
  selector: 'app-user-manage-jobs',
  templateUrl: './user-manage-jobs.component.html',
  styleUrls: ['./user-manage-jobs.component.scss' ,"../../company/company-jobs/company-jobs.component.scss" ,
              '../../job-list/job-list.component.scss']
})
export class UserManageJobsComponent implements OnInit {


  savedJobs:Observable<any>;
  skippedJobs:Observable<any>;
  appliedJobs:Observable<any>;
  invitedJobs:Observable<any>;



  constructor(
    private jobsService:UserJobsService
  ) { }



  ngOnInit() {

   this.savedJobs = this.jobsService
                        .getSavedJobs()
                        .pipe(map(({data}) => data['GetSavedJobs'])); /// Saved jobs






                

   
  }

}

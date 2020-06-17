import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserJobsService } from 'src/app/_shared/services/jobs/user-jobs.service';

@Component({
  selector: 'app-user-applied-jobs',
  templateUrl: './user-applied-jobs.component.html',
  styleUrls: ['./user-applied-jobs.component.scss']
})
export class UserAppliedJobsComponent implements OnInit {

  appliedJobs:Observable<any>;
  
  constructor(
    private jobsService: UserJobsService
  ) { }

  ngOnInit() {
    this.appliedJobs =  this.jobsService
                            .getAppliedJobs()
                            .pipe(map(({data}) => data['GetAppliedJobs'])); /// Applied jobs
  }

}

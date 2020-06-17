import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserJobsService } from 'src/app/_shared/services/jobs/user-jobs.service';

@Component({
  selector: 'app-user-skipped-jobs',
  templateUrl: './user-skipped-jobs.component.html',
  styleUrls: ['./user-skipped-jobs.component.scss']
})
export class UserSkippedJobsComponent implements OnInit {

  skippedJobs:Observable<any>;

  constructor(
    private jobsService:UserJobsService
  ) { }

  ngOnInit() {

    this.skippedJobs =  this.jobsService
                            .getSkippedJobs()
                            .pipe(map(({data}) => data['GetSkippedJobs'])); /// Skipped jobs
  }

}

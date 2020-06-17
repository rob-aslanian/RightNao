import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserJobsService } from 'src/app/_shared/services/jobs/user-jobs.service';

@Component({
  selector: 'app-user-saved-jobs',
  templateUrl: './user-saved-jobs.component.html',
  styleUrls: ['./user-saved-jobs.component.scss']
})
export class UserSavedJobsComponent implements OnInit {

  savedJobs:Observable<any>;
  
  constructor(
    private jobsService: UserJobsService
  ) { }

  ngOnInit() {
    this.savedJobs =  this.jobsService
                          .getSavedJobs()
                          .pipe(map(({data}) => data['GetSavedJobs'])); /// Saved jobs
  }

}

import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserJobsService } from 'src/app/_shared/services/jobs/user-jobs.service';


@Component({
  selector: 'app-user-invitation-jobs',
  templateUrl: './user-invitation-jobs.component.html',
  styleUrls: ['./user-invitation-jobs.component.scss']
})
export class UserInvitationJobsComponent implements OnInit {

  invitedJobs:Observable<any>;
  
  constructor(
    private jobsService:UserJobsService
  ) { }

  ngOnInit() {
    this.invitedJobs =  this.jobsService
                            .getInvitedJobs()
                            .pipe(map(({data}) => data['GetInvitedJobs'])); /// Inited jobs
  }

}

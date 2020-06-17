import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserJobsService } from 'src/app/_shared/services/jobs/user-jobs.service';

@Component({
  selector: 'app-user-career-new-opp',
  templateUrl: './user-career-new-opp.component.html',
  styleUrls: ['./user-career-new-opp.component.scss' ],
  
})
export class UserCareerNewOppComponent implements OnInit {


  constructor(
    public jobsService:UserJobsService
  ) { 
    
  }

  ngOnInit() {
  }

  toglleOpenFlag(e){
     this.jobsService.newOpp = e;
     this.jobsService
         .setFlagOpen(e)
         .subscribe();
    
  }

}

import { Component, OnInit } from '@angular/core';
import { UserJobsService } from 'src/app/_shared/services/jobs/user-jobs.service';
import { Router, ActivatedRoute } from '@angular/router';

 
@Component({
  selector: 'app-user-career',
  templateUrl: './user-career.component.html',
  styleUrls: ['./user-career.component.scss' , "../../company/company-jobs/company-jobs.component.scss" ,
               '../../job-list/job-list.component.scss']
})
export class UserCareerComponent implements OnInit {


  constructor(
    private jobsService:UserJobsService,
    private route:Router,
    private activeRoute:ActivatedRoute
  ) { 

    const data = this.activeRoute.snapshot.data.career;

    if(data){
      const hasCarrer = data['career_interests']['jobs'].length > 0;
      this.jobsService.newOpp = data['is_open'];
      
      if(!hasCarrer){
         route.navigate(['manage'] , { relativeTo:activeRoute })
      }
    }
    


  }

  ngOnInit() {

  }


  ngOnDestroy(): void {

  }
  

}

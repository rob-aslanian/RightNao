import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-company-jobs',
  templateUrl: './company-jobs.component.html',
  styleUrls: ['./company-jobs.component.scss']
})
export class CompanyJobsComponent implements OnInit , AfterViewInit {


  companyId:string;
  jobs:Observable<any>;
  userFragment;
  jobID:string;

  constructor(
    private router:ActivatedRoute,
    private utilService:UtilsService
  ) { 
    this.companyId = this.router.snapshot.params['id']; 
  }

  ngOnInit() {
   this.jobs =  this.utilService
                    .searchJobsById(this.companyId);

    this.router
        .queryParams
        .subscribe(el => {
          if(el['job_id']) {
             this.jobID = el['job_id']
          }
        })


  }
  ngAfterViewInit(): void {

  }

}

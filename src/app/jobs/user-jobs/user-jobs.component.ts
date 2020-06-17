import { Component, OnInit } from '@angular/core';
import { UserJobsService } from 'src/app/_shared/services/jobs/user-jobs.service';
import { Observable } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';



@Component({
  selector: 'app-user-jobs',
  templateUrl: './user-jobs.component.html',
  styleUrls: ['./user-jobs.component.scss' , "../company/company-jobs/company-jobs.component.scss" ,]
})

export class UserJobsComponent implements OnInit {


  filter:string;
  isAuth:boolean;
  isCompany:boolean;
  currentCountry:string;
  reccomendedJobs:Observable<any>;



  constructor(
    private jobService:UserJobsService,
    private globalService:GlobalUserProService,
  ) {
    this.isCompany      = globalService.isCompanyActive();
    this.currentCountry = globalService.location 
   }

  ngOnInit() {
    this.isAuth = this.globalService.isAuthenticated();

    this.reccomendedJobs = this.jobService
                               .getReccomendedJobs()



 
  }

  filterJob(e){

    if(e.which >= 65 && e.which <= 90 || e.which === 8){
      let value = e.target.value !== '' ? [e.target.value] : undefined;


      this.reccomendedJobs = !value ? this.jobService
                                          .getReccomendedJobs() :
                                      this.jobService
                                          .getAllJob([this.currentCountry] , value)
                                          .pipe(
                                              debounceTime(500),
                                              map(({data}) => data['searchJobs']['job_search_result'])
                                            ); 
      
  
    }
  }  
    
  }



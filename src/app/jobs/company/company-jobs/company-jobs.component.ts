import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GlobalUserProService } from '../../../_shared/services/global-user-pro.service';
import { JobsCompanyService } from 'src/app/_shared/services/jobs/jobs-company.service';
import { map, debounceTime, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-company-jobs',
  templateUrl: './company-jobs.component.html',
  styleUrls: ['./company-jobs.component.scss' ]
})
export class CompanyJobsComponent implements OnInit , OnDestroy {

  companyID:string;
  candidates:Observable<any>;
  destroy$:Subject<any> = new Subject<any>();

  constructor(
    private globalUserProfileService: GlobalUserProService,
    private jobs: JobsCompanyService,
    ) {
    this.companyID = this.globalUserProfileService.getComapnyId();
    
  }


  ngOnInit() {
    this.candidates = this.jobs
                          .getAllCandidate()
                          .pipe(
                            takeUntil(this.destroy$),
                            map(({data}) => data['searchCandidate']))
  }


  searchCandidate(e){

    if(e.which >= 65 && e.which <= 90 || e.which === 8){
      let value = e.target.value !== '' ? [e.target.value] : undefined;

 
      this.candidates = this.jobs
                            .getAllCandidate(value)
                            .pipe(
                              takeUntil(this.destroy$),
                              debounceTime(500),
                              map(({data}) => data['searchCandidate'])
                              )
    }


  }
  
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();

  }
}

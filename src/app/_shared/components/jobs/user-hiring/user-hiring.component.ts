import { Component, OnInit, Input } from '@angular/core';
import { UserJobsService } from 'src/app/_shared/services/jobs/user-jobs.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-hiring',
  templateUrl: './user-hiring.component.html',
  styleUrls: ['./user-hiring.component.scss']
})
export class UserHiringComponent implements OnInit {

  @Input() link:string = '/jobs/company';


  companies:Observable<any>;
  selectedCompany:any;

  constructor(
    private jobService:UserJobsService,
    private globaService:GlobalUserProService,
    private route:Router,
  ) { }

  ngOnInit() {
    this.companies = this.jobService
                         .getMyCompanies()
                         .pipe(map(({data}) => data.getMyCompanies))
  }

  selectCompany(company:any){
    this.selectedCompany = company;
  }

  trackByFn =  (index) => index;
  
  submit(hasNoComapny){

    /// Not have company
    if(hasNoComapny){
      this.route.navigate(['/company/registration']);
    }
    /// Has Company 
    else{
      if(this.selectedCompany){
        this.globaService.storeCompanyProfile(this.selectedCompany);
        this.route.navigate([this.link]);

      }
    }
  }

}

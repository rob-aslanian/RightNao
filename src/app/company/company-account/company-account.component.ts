import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CompanyAccountService } from 'src/app/_shared/services/companies/company-account.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { utilities } from 'src/app/_shared/utilities/utilities';

@Component({
  selector: 'app-company-account',
  templateUrl: './company-account.component.html',
  styleUrls: ['./company-account.component.scss',  '../../_shared/css/account_shared_style.scss'],
  encapsulation:ViewEncapsulation.None
})
export class CompanyAccountComponent implements OnInit {

  constructor(
    private companyService:CompanyAccountService,
    private globalService:GlobalUserProService
  ) { }

  profile:Observable<any>;

  ngOnInit() {
     let profile = this.globalService.getCompanyProfile();

    if(profile && profile.url){
       this.profile = this.companyService
                          .getCompanyForHeader(profile.url)
                          .pipe(map(({data}) => data['GetCompanyProfile'] ));

        
    }
     
  }

  parseCountry(abbr:string){
    return utilities.getCountryName(abbr);
  }

  parseIndusty(indId:string){
    return utilities.getInudsryName(indId);
  }

}

import { Component, OnInit } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { Observable } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-company-login-page',
  templateUrl: './company-login-page.component.html',
  styleUrls: ['./company-login-page.component.scss' ,  "../../_shared/css/registration_shared_styles.scss"]
})
export class CompanyLoginPageComponent implements OnInit {

  user: any;
  companies: Observable<any>;
  showPopup:boolean = false;
  selectedCompany: any;
  submited:boolean = false;
  dropDownText:string = "Choose your corporate account"

  constructor(
    private globalService:GlobalUserProService,
    private utilService:UtilsService,
    private router: Router
  ) { }

  ngOnInit() {

    if (this.globalService.isAuthenticated()){
        this.user = this.globalService.getUserProfile();
        this.companies = this.utilService
                             .getMyCompanies()
    }

    
  }

  selectCompany(company){
      this.selectedCompany = company;
      this.submited = false;
      this.showPopup = false;

      this.dropDownText = company.name;
  }

  login(){
     this.submited = true;

     if ( this.selectedCompany ){
        this.globalService
            .storeCompanyProfile(this.selectedCompany)
        
        setTimeout(() => this.router.navigate(['/landing']) , 200)
     }
  }



}

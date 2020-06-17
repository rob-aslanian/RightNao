import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-company-register-page',
  templateUrl: './company-register-page.component.html',
  styleUrls: ['./company-register-page.component.scss' , '../../_shared/css/registration_shared_styles.scss']
})
export class CompanyRegisterPageComponent implements OnInit {

  type:string = 'company';

  constructor(
    private router:Router,
    private globalService:GlobalUserProService,
    private regService:RegistrationService
  ) { 
    this.type = regService.profileType || 'company'
  }

  ngOnInit() {
  }

  redirect(){
    this.router.navigate(['/registration/company'])
  }

}

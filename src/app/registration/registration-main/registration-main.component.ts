import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-registration-main',
  templateUrl: './registration-main.component.html',
  styleUrls: ['./registration-main.component.scss']
})
export class RegistrationMainComponent implements OnInit {


  constructor(
    private activeRouter:ActivatedRoute,
    private router:Router,
    private globalService:GlobalUserProService,
    private registrationService:RegistrationService
  ) { }

  ngOnInit() {
     let id = this.activeRouter.snapshot.queryParams['invited_id'];
     if(id) { 
        this.globalService.setInviterID = id;
        setTimeout(() => 
            this.router.navigate([] , { queryParams:{ invited_id:null } , queryParamsHandling:'merge' }) , 200)
     }
  }

  setProfile = (type) => this.registrationService.profileType = type

}

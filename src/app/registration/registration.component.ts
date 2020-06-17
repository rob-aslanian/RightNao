import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalUserProService } from '../_shared/services/global-user-pro.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
 
  profileImage: string ;
  isCompanyActive: boolean ;

  constructor(
     public router: Router,
     private globalUserService: GlobalUserProService,
     private location:Location
  ) { 

  }

  ngOnInit() {
       
       this.isCompanyActive = this.globalUserService.isCompanyActive();

       if( this.isCompanyActive ) this.profileImage = this.globalUserService.getCompanyProfile() && 
                                                      this.globalUserService.getCompanyProfile().avatar ?  
                                                      `/file/${this.globalUserService.getCompanyProfile().avatar}`
                                                      : 'assets/img/default-company.svg';

       else this.profileImage =  this.globalUserService.getUserProfile() && 
                                 this.globalUserService.getUserProfile().avatar ? 
                                `/file/${this.globalUserService.getUserProfile().avatar}`
                                : 'assets/img/124.svg'
  }

  back = () => { this.location.back() }



}

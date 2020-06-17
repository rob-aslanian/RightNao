import { Component, OnInit } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
 

@Component({
  selector: 'app-user-profile-landing-page',
  templateUrl: './user-profile-landing-page.component.html',
  styleUrls: ['./user-profile-landing-page.component.scss']
})
export class UserProfileLandingPageComponent implements OnInit {

  isCompanyActive: boolean; 

  constructor(
    private globalUserProService: GlobalUserProService
  ) { }

  ngOnInit() {
    
    this.isCompanyActive = this.globalUserProService.isCompanyActive(); 
    
  }

}

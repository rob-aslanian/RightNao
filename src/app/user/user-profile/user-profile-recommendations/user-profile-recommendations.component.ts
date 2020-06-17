import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../_shared/services/user/user-profile.service';

@Component({
  selector: 'app-user-profile-recommendations',
  templateUrl: './user-profile-recommendations.component.html',
  styleUrls: ['./user-profile-recommendations.component.scss']
})
export class UserProfileRecommendationsComponent implements OnInit {
  
  data:any;   

  constructor(
    private userProfileService: UserProfileService
  ) { }

  ngOnInit() {
    this.data = this.userProfileService.profileData;        
    
  }
     
}

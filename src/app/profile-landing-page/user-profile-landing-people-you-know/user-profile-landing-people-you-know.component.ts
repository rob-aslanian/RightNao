import { Component, OnInit } from '@angular/core';
import { NetworkUserService } from 'src/app/_shared/services/network/network-user.service';

@Component({
  selector: 'app-user-profile-landing-people-you-know',
  templateUrl: './user-profile-landing-people-you-know.component.html',
  styleUrls: ['./user-profile-landing-people-you-know.component.scss']
})
export class UserProfileLandingPeopleYouKnowComponent implements OnInit {
  
  user: boolean = true; 

  
  constructor() { }

  ngOnInit() {
      this.user = true; 
  }



}

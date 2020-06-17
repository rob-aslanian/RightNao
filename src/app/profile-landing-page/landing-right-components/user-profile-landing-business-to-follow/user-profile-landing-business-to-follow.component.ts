import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-user-profile-landing-business-to-follow',
  templateUrl: './user-profile-landing-business-to-follow.component.html',
  styleUrls: ['./user-profile-landing-business-to-follow.component.scss']
})
export class UserProfileLandingBusinessToFollowComponent implements OnInit, AfterViewInit {
  
 
  user: boolean; 


  constructor() { }

  ngOnInit() {
    this.user = false; 
  }

  ngAfterViewInit(): void {
    
  }

}

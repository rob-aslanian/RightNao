import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile-followers',
  templateUrl: './user-profile-followers.component.html',
  styleUrls: ['./user-profile-followers.component.scss']
})
export class UserProfileFollowersComponent implements OnInit {
  isPeople: boolean = false; 
  userId: string; 
  userFollowers: any[] = [];

  constructor(
    private router: ActivatedRoute
    ) { }

  ngOnInit() {
    this.router.params.subscribe(
      (data) => this.isPeople = data['type'] === 'people'
    )

    this.userId = this.router.snapshot.params['id']; 
  
    
  }


}

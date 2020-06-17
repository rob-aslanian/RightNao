import { Component, OnInit } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile-following',
  templateUrl: './user-profile-following.component.html',
  styleUrls: ['./user-profile-following.component.scss', '../../../network/network.component.scss']
})
export class UserProfileFollowingComponent implements OnInit {

  isPeople:boolean = false;

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.params.subscribe(
      (data) => this.isPeople = data['type'] === 'people'
    )
   
  }

}

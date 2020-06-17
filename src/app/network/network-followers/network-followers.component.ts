import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-network-followers',
  templateUrl: './network-followers.component.html',
  styleUrls: ['./network-followers.component.scss'],
  host: {
    class: "netowrk-custom-col"
  }
})
export class NetworkFollowersComponent implements OnInit {

  userId: string;

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
    this.userId = this.router.snapshot.params['id']
    
  }

}

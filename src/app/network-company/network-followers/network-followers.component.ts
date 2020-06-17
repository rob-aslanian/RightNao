import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-network-followers',
  templateUrl: './network-followers.component.html',
  styleUrls: ['./network-followers.component.scss'],
  host: {
    class: "netowrk-custom-col"
  }
})
export class NetworkFollowersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

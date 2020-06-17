import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-network-manage',
  templateUrl: './network-manage.component.html',
  styleUrls: ['./network-manage.component.scss'],
  host: {
    class: "netowrk-custom-col"
  }
})
export class NetworkManageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

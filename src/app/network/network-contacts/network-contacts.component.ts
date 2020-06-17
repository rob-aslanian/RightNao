import { Component, OnInit } from '@angular/core';
import { NetworkUserService } from 'src/app/_shared/services/network/network-user.service';
 

@Component({
  selector: 'app-network-contacts',
  templateUrl: './network-contacts.component.html',
  styleUrls: ['./network-contacts.component.scss']
})
export class NetworkContactsComponent implements OnInit {

  connections: any[] = [];
  view = 'card';
  
  constructor(
     private networkService: NetworkUserService
  ) { }

  ngOnInit() {
   
  }

}

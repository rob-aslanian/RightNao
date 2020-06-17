import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular'
import gql from 'graphql-tag'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Manage } from '../../../_shared/graphql/network/manage';
import { NetworkUserService } from 'src/app/_shared/services/network/network-user.service';

@Component({
  selector: 'app-sent-requests',
  templateUrl: './sent-requests.component.html',
  styleUrls: ['./sent-requests.component.scss']
})
export class SentRequestsComponent implements OnInit {


  sentList:Observable<any>;
  sentListlength:number;
  formatedDate  = [];

  constructor( 
    private apollo:Apollo,
    private networkSerivce:NetworkUserService
    
    ) { }

  ngOnInit() {

    this.sentList = 

     this.networkSerivce
     .getFriendRequests(true)
        .pipe(
          map(  ({data}) => {
             return data['getFriendRequests']
      })
    )
 
 
   }

}

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { GetActiveConnections,   } from '../messaging/shared/graphql/queries'; 
import { Connections } from '../_shared/graphql/network/connections'; 
// src\app\_shared\graphql\network\connections.ts
@Injectable({
  providedIn: 'root'
})
export class UserLandingPageServiceService {

constructor(
  private apollo :Apollo,
) { }    


  public getActiveConnections(): Observable<any> {
    return this.apollo.watchQuery({
      fetchPolicy:'network-only', 
      query: GetActiveConnections 
    }).valueChanges
  };   

  public getConnectionsOfUser(userId) {
    return this.apollo.query({
      fetchPolicy: 'network-only',
      query: Connections.getConnectionsOfUser,
      variables: {
        user_id: userId,
        pagination: {
          first: 999
        }
      }
    })
  }


}

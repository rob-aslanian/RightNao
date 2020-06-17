import { Injectable } from '@angular/core';
import { groupsGraphql } from '../graphql/groups';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class GroupsService {

  constructor(
    private apollo: Apollo
  ) { }


  checkIfGroupUrlIsTaken( url: string ): Observable<any> { 
      return this.apollo.watchQuery({
               fetchPolicy: 'network-only',
               query: groupsGraphql.checkGroupUrl,
               variables: {
                  url
               }
      }).valueChanges
  }

  getGroup( url: string ): Observable<any> {
      
    return  this.apollo.watchQuery({
                fetchPolicy: 'network-only',
                query: groupsGraphql.getGroup,
                variables: {
                    url
                 }
          }).valueChanges
     
  }

  changeTagline( group_id: string, tagline: string ): Observable<any> {

    return this.apollo.mutate( {
             mutation: groupsGraphql.changeTagline,
             variables: {
                group_id,
                tagline,
             }
    } )
  };

  sendInvations( group_id: string , user_id: string ): Observable<any> {
      return this.apollo.mutate({
         mutation: groupsGraphql.sendInvations,
         variables: {
             group_id,
             user_id
         }
      })
  };

  // Group Settings 
 

  changeGroupName(group_id: string, name: string): Observable<any> {
     return this.apollo.mutate({
        mutation: groupsGraphql.changeGroupName,
        variables: {
            group_id,
            name
        }
     })
  };


  changePrivactType(group_id: string, type: string): Observable<any> {
     return this.apollo.mutate({
        mutation: groupsGraphql.changePrivactType,
        variables: {
            group_id,
            type
        }
     })
  };


  changeGroupURL(group_id: string, url: string): Observable<any> {
    return this.apollo.mutate({
       mutation: groupsGraphql.changeGroupURL,
       variables: {
           group_id,
           url
       }
    })
 };


 


 //Company search
 getSearchResult( companyId: string,  query: string, mutation: string): Observable<any> {    
     return this.apollo.watchQuery({
        fetchPolicy: 'network-only',
        query: groupsGraphql[mutation],
        variables: {
           companyId,
           query
        }
     }).valueChanges
 }
 
}

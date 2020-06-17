import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { stuffGraphql } from '../../_shared/graphql/stuff/stuff';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class RegistrationService {

  private _profileType:string;

  constructor(
    private apollo: Apollo
  ) { }


  set profileType(value:string) {
    this._profileType = value;
  }
  
  get profileType() : string {
    return this._profileType;
  }

  submitFeedBack( feedback: any ): Observable<any> {
    
      return this.apollo.mutate({
         mutation: stuffGraphql.submitFeedBack,
         variables: {
             feedback
         }
      })

  }

}

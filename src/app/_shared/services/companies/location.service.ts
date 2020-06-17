import { Injectable } from '@angular/core';
import { ILocation } from '../../models/company/location.interface';
import { Apollo } from 'apollo-angular';
import { graphqlCompanyAccount } from '../../graphql/company-account';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private apollo:Apollo
  ) { }


  public addLocation(company_id:string, input:ILocation) : Observable<any>{
    return this.apollo.mutate({
       mutation:graphqlCompanyAccount.addAddress,
       variables:{
        company_id,
        input
       }
     })
  }

  public removeLocation(company_id:string , id:string) : Observable<any>{
      if(company_id && id){
        return this.apollo.mutate({
          mutation:graphqlCompanyAccount.deleteAddress,
          variables:{
            company_id,
            id,
          }
        })
      }
  }

  public editLocation(company_id:string , changes:ILocation) : Observable<any>{
      if(company_id && changes){
         return this.apollo.mutate({
           mutation:graphqlCompanyAccount.editAddress,
           variables:{
              company_id,
              changes
           }
         })
      }
  }
}

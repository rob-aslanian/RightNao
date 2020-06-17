import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { graphqlCompanyProfile } from '../../graphql/company-profile';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {

  constructor(
    private apollo: Apollo
  ) { }


  public changeAboutUs(input){
     if(input){
        this.apollo.mutate({
          mutation:graphqlCompanyProfile.changeAbout,
          variables:input
        }).subscribe(({ data }) => {
      
          
        })
     }
  }
}

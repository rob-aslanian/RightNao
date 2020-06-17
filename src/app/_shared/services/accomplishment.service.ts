import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { graphQlAccomplishment } from '../graphql/accomplishment/accomplishment';
import { GlobalUserProService } from './global-user-pro.service';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccomplishmentService {

  user: Object;
  result = new Subject<any>();
  accomps = new Subject<any>();

  constructor(
    private apollo: Apollo,
    private userServise: GlobalUserProService
  ) {
    this.user = this.userServise.getUserProfile();
   }

   get getResult(){
      return this.result;
   }

   get getAccomps(){
     return this.accomps;   
   }

   getAccomp(){
     this.apollo.watchQuery({
      query: graphQlAccomplishment.GetAccomplishment,
      variables:{
        url:this.user['url']
      }
     }).valueChanges
     .subscribe(({ data }) => {
       let accomps = data['getProfile']['accomplishments'];
  

       if(accomps.length > 0) accomps.reverse();
       
       return this.accomps.next(accomps);

     });
   }
   


   removeAccomplishment(id:string) : Observable<any>{
    return this.apollo.mutate({
        mutation:graphQlAccomplishment.RemoveAccomplishment,
        variables:{ id }
      })
   }

   updateAccomplishment(type:string , result:Object){

    switch (type) {
      case 'certification': {
        return this.apollo.mutate({
            mutation:graphQlAccomplishment.ChangeAccomplishmentCertification,
            variables:result
          })
      }
      case 'license': {
        return this.apollo.mutate({
            mutation:graphQlAccomplishment.ChangeAccomplishmentLicense,
            variables:result
          })
      }
      case 'award': {
        return this.apollo.mutate({
            mutation:graphQlAccomplishment.ChangeAccomplishmentAward,
            variables:result
          })
      }
      case 'project': {
        return this.apollo.mutate({
          mutation:graphQlAccomplishment.ChangeAccomplishmentProject,
          variables:result
        })

      }
      case 'publication': {
        return this.apollo.mutate({
          mutation:graphQlAccomplishment.ChangeAccomplishmentPublication,
          variables:result
        })

      
      }
      case 'test': {
        return this.apollo.mutate({
          mutation:graphQlAccomplishment.ChangeAccomplishmentTest,
          variables:result
        })

      }
      default: break;
    }
   }

  addAccomplishment(type: string, value: Object) : Observable<any> {
    let result = {
      input:{}
    };

    switch (type) {
      case 'certification': {

        result.input = {
            name: value['name'],
            certification_authority: value['authority'],
            license_number: value['license_number'],
            is_expire: value['is_expire'],
            start_date: value['date'],
            finish_date:value['finish_date'],
            files_id: value['files_id'],
            link: value['link'],
        };

        return this.apollo.mutate({
          mutation: graphQlAccomplishment.AddAccomplishmentCertification,
          variables: result
        });

      

      }
      case 'license': {

        result.input = {
          name:value['name'],
          issuer:value['issuer'],
          license_number: value['license_number'],
          start_date: value['date'],
          finish_date:value['finish_date'],
          files_id: value['files_id'],
          link: value['link'],
          is_expire: value['is_expire'],
        }

        return this.apollo.mutate({
            mutation: graphQlAccomplishment.AddAccomplishmentLicense,
            variables: result
        });
    

      }
      case 'award': {

        result.input = {
          title:value['name'],
          issuer:value['issuer'],
          date: value['date'],
          files_id: value['files_id'],
          link: value['link'],
          description: value['description'],
        };  

        return this.apollo.mutate({
            mutation: graphQlAccomplishment.AddAccomplishmentAward,
            variables: result
          });

       
      }
      case 'project': {

        result.input = {
          name:value['name'],
          from: value['date'],
          description: value['description'],
          start_date: value['date'],
          finish_date:value['finish_date'],
          files_id: value['files_id'],
          link: value['link'],

        };  

       return  this.apollo.mutate({
          mutation: graphQlAccomplishment.AddAccomplishmentProject,
          variables: result
        });

      }
      case 'publication': {
        result.input = {
          title:value['name'],
          publisher: value['publication'],
          description: value['description'],
          date: value['date'],
          files_id: value['files_id'],
          link: value['link'],

        };  

        return this.apollo.mutate({
            mutation: graphQlAccomplishment.AddAccomplishmentPublication,
            variables: result
          });
      }
      case 'test': {
        result.input = {
          title:value['name'],
          score:+value['score'],
          description: value['description'],
          date: value['date'],
          files_id: value['files_id'],
          link: value['link'],

        };  

       return  this.apollo.mutate({
            mutation: graphQlAccomplishment.AddAccomplishmentTest,
            variables: result
          })
      }
      default: break;
    }

  }
}


import { Injectable } from '@angular/core';
import { GlobalUserProService } from '../_shared/services/global-user-pro.service';
import { Apollo } from 'apollo-angular';
import { graphqlAdsServices } from '../_shared/graphql/ads-services/adsServices';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdsServicesService {
  
  constructor(
    private apollo: Apollo,
    private globalUserProService: GlobalUserProService,
  ) { }

  get companyId(): ( string | undefined ) {
      return this.globalUserProService.isCompanyActive() ?
             this.globalUserProService.getComapnyId() :
             undefined;
  };

  get profileId() {
    return this.globalUserProService.getProfileId();
  }

  AddAdService(input){
    return this.apollo.mutate({
      mutation:graphqlAdsServices.AddAdService,
      variables:{
        input,
        company_id:this.companyId
      }
    })
  }

  EditAdService(input){
    return this.apollo.mutate({
      mutation:graphqlAdsServices.EditAdService,
      variables:{
        input
      }
    })
  }

  GetAdServiceByID(service_id){
    return this.apollo.query({
      query:graphqlAdsServices.GetAdServiceByID,
      variables:{
        service_id,
        company_id:this.companyId
      }
    }).pipe(
      map(({data}) => data['GetAdServiceByID'])
    )
  }

  SearchAdsService(input: any, after: number){
    return this.apollo.query({
      query:graphqlAdsServices.searchAdService,
      variables:{
        company_id: this.companyId, 
        input,
        pagination: {
            first: 12,
            after: after.toString()
        }
      }
    })
    .pipe( map( ({data}) => data['searchAdService'] ) )
  }

  GetAdServiceForEdit(service_id){
    return this.apollo.query({
      query:graphqlAdsServices.GetAdServiceForEdit,
      variables:{
        service_id,
        company_id:this.companyId
      }
    })
    .pipe( map( ({data}) => data['GetAdServiceByID'] ) )
  }

  GetSavedAdService(after){
    return this.apollo.query({
      query:graphqlAdsServices.GetSavedAdService,
      variables:{
        pagination:{
          first:12,
          after
        },
        company_id:this.companyId
      }
    })
    .pipe( map( ({data}) => data['GetSavedAdService'] ) )
  }

  LikeAdService(service_id){
    return this.apollo.mutate({
      mutation:graphqlAdsServices.LikeAdService,
      variables:{
        service_id
      }
    })
  }

  UnLikeAdService(service_id){
    return this.apollo.mutate({
      mutation:graphqlAdsServices.UnLikeAdService,
      variables:{
        service_id
      }
    })
  }

  ChangeAdServiceStatus(service_id, status){
    return this.apollo.mutate({
      mutation:graphqlAdsServices.ChangeAdServiceStatus,
      variables: {
        service_id,
        status,
        company_id:this.companyId
      }
    })
  }
  MakeAdServiceUrgent(service_id){
    return this.apollo.mutate({
      mutation:graphqlAdsServices.MakeAdServiceUrgent,
      variables:{
        service_id,
        company_id:this.companyId
      }
    })
  }

  RemoveAdService(service_id){
    return this.apollo.mutate({
      mutation:graphqlAdsServices.RemoveAdService,
      variables:{
        service_id,
        company_id:this.companyId
      }
    })
  }

  RemoveAdServiceFile(service_id, file_id){
    return this.apollo.mutate({
      mutation:graphqlAdsServices.RemoveAdServiceFile,
      variables:{
        service_id,
        file_id,
        company_id:this.companyId
      }
    })
  };

  searchServices(input: any): Observable<any>{ 
      return this.apollo.query({
          query: graphqlAdsServices.searchServices,
          variables: {
            input,
            pagination:{
              first:10,
              after:"0"
            }
          }
      }).pipe(
        map(({data}) => data['searchAdService']['services'])
      )

  }
}

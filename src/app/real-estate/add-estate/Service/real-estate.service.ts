import { Injectable } from '@angular/core';
import { Apollo } from "apollo-angular";
import realEstate from './real-estate.graphql';
import { Observable, Subject } from 'rxjs';
import { estateEnum } from '../../Shared/models/estate.interface';
import { IPagination } from 'src/app/_shared/models/shared.interface';
import { map, tap } from 'rxjs/operators';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';



type step = 'next' | 'back';
@Injectable({
  providedIn: 'root'
})


export class RealEstateService {

  step: Subject<step> = new Subject<step>();
  propertyType: Subject<step> = new Subject<step>();
  search: Subject<any> = new Subject<any>();

  
  get company_id() {
      return this.globalUserProService.isCompanyActive() ?
             this.globalUserProService.isCompanyActive() :
             undefined;
  };
  
  constructor(
    private apollo: Apollo,
    private globalUserProService: GlobalUserProService
  ) { }

  addRealEstate( input: any ): Observable<any> {
        return this.apollo.mutate({
            mutation: realEstate.addRealEstate,
            variables: { input }
        })
  };
 
  GetRealEstates( deal_type: estateEnum, pagination: IPagination, property_type: string = 'PropertyType_Any' ): Observable<any> {
      return this.apollo.mutate({
          mutation: realEstate.GetRealEstates,
          variables: {
            deal_type,
            pagination,
            property_type
          }
      }).pipe(
          map( ({ data }) => data['GetRealEstates'] )
      )
  };

  removeEstate(  estate_id ): Observable<any>{
      return this.apollo.mutate({
         mutation: realEstate.removeEstate,
         variables: {
            company_id: this.company_id,
            estate_id
         }
      })
  };


  getMyRealEstates( profile_id, is_company, status, deal_type, property_type, after: number ): Observable<any>{
        return this.apollo.query({
              fetchPolicy: 'no-cache',
              query: realEstate.GetRealEstatesByProfileID,
              variables: {
                  profile_id,
                  is_company,
                  status,
                  deal_type,
                  property_type,
                  pagination: {
                      first: 6,
                      after: after.toString()
                  }
              }
        }).pipe(
            map( ({ data }) => data['GetRealEstatesByProfileID'] )
        )
  };


  getRealEstateById(  estate_id: string ) : Observable<any> {
        return this.apollo.query({
             query: realEstate.getRealEstateById,
             variables: {
                company_id: this.company_id,
                estate_id
             }
        }).pipe(
            map(({ data }) => data['GetRealEstateByID'] )
        )
  }
 


 addLikeToRealEstate( estate_id: string ): Observable<any> {
       return this.apollo.mutate({
              mutation: realEstate.likeRealEstate,
              variables: {
                estate_id,
                company_id: this.company_id
              }
       })
 };

 UnLikeRealEstate( estate_id: string ): Observable<any> {
    return this.apollo.mutate({
           mutation: realEstate.UnLikeRealEstate,
           variables: {
             estate_id,
             company_id: this.company_id
           }
    })
};

 changeEstateStatus( estate_id: string, status: string): Observable<any> {
       return this.apollo.mutate({
            mutation: realEstate.changeRentalStatus,
            variables: {
                estate_id,
                status
            }
       })
 };

 makeCounterOffer( input: any ): Observable<any> {
       return this.apollo.mutate({
            mutation: realEstate.MakeOfferToRealEstate,
            variables: {
              company_id: this.company_id, 
              input
            }
       })
 };

 SubscribeToRealEstate( estate_id: string ,  owner_id: string): Observable<any> {
    return this.apollo.mutate({
        mutation: realEstate.SubscribeToRealEstate,
        variables: {
          company_id: this.company_id,
          estate_id, 
          owner_id 
        }
    })
  };

  UnSubscribeRealEstate( estate_id: string): Observable<any> {
    return this.apollo.mutate({
        mutation: realEstate.UnSubscribeRealEstate,
        variables: {
          company_id: this.company_id,
          estate_id        
        }
    })
  };

  getMyRealEstatesSlides( profile_id, is_company, status = 'PostStatus_Any', deal_type = 'DealType_Any', property_type = 'PropertyType_Any'): Observable<any>{
    return this.apollo.query({
          query: realEstate.getRealEstateSlides,
          variables: {
              profile_id,
              is_company,
              status,
              deal_type,
              property_type,
              pagination: {
                  first: 15,
                  after: '0'
              }
          }
    }).pipe(
        map( ({ data }) => data['GetRealEstatesByProfileID']['estates'] )
    )
};

MakeRealEstateUrgent( estate_id: string): Observable<any> {
  return this.apollo.mutate({
      mutation: realEstate.MakeRealEstateUrgent,
      variables: {
        estate_id,
        company_id: this.company_id   
      }
  })
};

GetSavedRealEstates( after: number ): Observable<any>{
  return this.apollo.query({
        fetchPolicy: 'network-only',
        query: realEstate.GetSavedRealEstates,
        variables: {
            company_id: this.company_id,
            pagination: {
                first: 6,
                after: after.toString()
            }
        }
  }).pipe(
      map( ({ data }) => data['GetSavedRealEstates'] )
  )
};

GetRealEstateAlertsByID( estate_id: string, after: number ): Observable<any> {
  return this.apollo.query({
      fetchPolicy: 'network-only',
      query: realEstate.GetRealEstateAlertsByID,
      variables: {
        estate_id,
        pagination: {
          first: 6,
          after: after.toString()
         }
      }
  }).pipe(map(({ data }) => data['GetRealEstateAlertsByID']))
};

GetRealEstateOffersByID( estate_id: string, after: number ): Observable<any> {
  return this.apollo.query({
      fetchPolicy: 'network-only',
      query: realEstate.GetRealEstateOffersByID,
      variables: {
        estate_id,
        pagination: {
          first: 6,
          after: after.toString()
         }
      }
  }).pipe(map(({ data }) => data['GetRealEstateOffersByID']))
};

ToggleRealEstateOffers( estate_id: string, is_active: boolean ): Observable<any> {
  return this.apollo.mutate({
      mutation: realEstate.ToggleRealEstateOffers,
      variables: {
        company_id: this.company_id,
        estate_id,
        is_active
      }
  })
};

ToggleRealEstateAlert( estate_id: string , is_active: boolean ): Observable<any> {
  return this.apollo.mutate({
      mutation: realEstate.ToggleRealEstateAlert,
      variables: {
        company_id: this.company_id,
        estate_id,
        is_active        
      }
  })
};

}

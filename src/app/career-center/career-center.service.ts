import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { graphqlCareerCenter } from '../_shared/graphql/career-center/career-center';
import { IOpenCareerCenter, IAddCVInCareerCenter } from './models/career-center.interface';
import { IPagination } from '../search/models/search.interface';
import { GlobalUserProService } from '../_shared/services/global-user-pro.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CareerCenterService {

  profileID:BehaviorSubject<string> = new BehaviorSubject<string>(this.companyID);
  companyProfile:Subject<any> = new Subject<any>();

  constructor(
    private apollo:Apollo,
    private globalService:GlobalUserProService,
  ) { }




  get companyID() : string{
     return this.globalService.isCompanyActive() &&
            this.globalService.getComapnyId();
  }


  // ... Mutations ... //

  /**
   * Open career center
   * @param company_id 
   * @param input 
   */
  public openCareerCenter(input:IOpenCareerCenter) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlCareerCenter.openCareerCenter,
      variables:{ company_id:this.companyID , input  }
    })
  }

  /**
   * Add CV in career center
   * @param company_id 
   * @param options 
   */
  public addCVInCareerCenter(company_id:string , options:IAddCVInCareerCenter) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlCareerCenter.addCVInCareerCenter,
      variables:{ company_id , options }
    })
  }

  /**
   * Make favorite CV
   * @param companyId 
   * @param ids 
   * @param is_favourite 
   */
  public MakeFavoriteCVs(ids:string[] , is_favourite:boolean) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlCareerCenter.MakeFavoriteCVs,
      variables:{ 
        companyId:this.companyID,
        ids,
        is_favourite
      }
    })
  }

  /**
   * Remove CVs
   * @param companyId 
   * @param ids 
   */
  public RemoveCVs(ids:string[]) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlCareerCenter.RemoveCVs,
      variables:{ companyId:this.companyID , ids }
    })
  }

  // ... Mutations ... //


  // ... Quiries ... //

  /**
   * Get Saved CVs
   * @param companyId 
   * @param pagination 
   */
  public GetSavedCVs(pagination:IPagination) : Observable<any> {
     return this.apollo.query({
       query:graphqlCareerCenter.GetSavedCVs,
       variables:{ companyId:this.companyID , pagination  }
     })
     .pipe(map(({data}) => data['GetSavedCVs']))
  }

  /**
   * Get company profile
   * @param company_id 
   */
  public GetCompanyProfile(company_id:string) : Observable<any> {
    return this.apollo.query({
      query:graphqlCareerCenter.getCompanyProfile,
      variables:{ company_id },
      fetchPolicy:'network-only'
    })
    .pipe(map(({data}) => data['GetCompanyProfileByID']))
  }

  // ... Quiries ... //


}

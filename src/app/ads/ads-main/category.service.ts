import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { graphqlAds } from 'src/app/_shared/graphql/ads/ads';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  user_id:string;

  constructor(
    private apollo:Apollo,
    private userProService: GlobalUserProService,
  ) {
    this.user_id = this.userProService.getUserProfile().id;
   }

   get companyId() : string  {
    return this.userProService.isCompanyActive() ?  
                               this.userProService.getComapnyId() :  
                               undefined;
   }


   //services and pffices
  getVofficeheader(): Observable<any> {

    return this.apollo.query({
        query: graphqlAds.getOffice,
         variables: {
              company_id: this.companyId,
              user_id: this.user_id
         }
    }).pipe(
      map( ({data}) => data['GetVOffice']['v_offices'] )
    )
  };

  GetAllServices( ): Observable<any> {
    return this.apollo.query({
         query: graphqlAds.GetAllServices,
         fetchPolicy: 'network-only',
         variables: {
             company_id: this.companyId
         }
    }).pipe(
        map( ({ data }) => data['GetAllServices']['services'] )
    )
 };

 //company
 getAllCompany(): Observable<any> {
   return this.apollo.query({
     query: graphqlAds.getAllMyCompany,
     fetchPolicy: 'network-only'
   }).pipe(
     map( ({data}) => data['getMyCompanies'] )
   )
 }

 //jobs
 getAllJobs() : Observable<any>{
   return this.apollo.query({
     query: graphqlAds.GetAllJobs,
     fetchPolicy: 'network-only',
     variables: {
      companyId: this.companyId
     }
   }).pipe(
     map(({data}) => data['GetPostedJobs'] )
   )
}
}

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ForSaleGraphQl } from './for-sale.graphql';
import { Observable } from 'rxjs';
import { GlobalUserProService } from '../_shared/services/global-user-pro.service';
import { IPagination } from '../_shared/models/shared.interface';
import { IAddforSale } from './models/interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForSaleService {

  constructor(
    private apollo: Apollo,
    private globalUserProService: GlobalUserProService
  ) { }

  get companyId(): ( string | undefined ) {
      return this.globalUserProService.isCompanyActive() ?
             this.globalUserProService.getComapnyId() :
             undefined;
  };

  getSavedForSale( after: number ): Observable<any> {
      return this.apollo.query({
           query: ForSaleGraphQl.GetSavedForSale,
           variables: {
              company_id: this.companyId, 
              pagination: {
                 first: 12,
                 after: after.toString()
              }
           }
      })
      .pipe( map( ({data}) => data['GetSavedForSale'] ) )
  };
  
  searchForSale( input: any, after: number ): Observable<any>  {
      return this.apollo.query({
        fetchPolicy: 'no-cache',
        query: ForSaleGraphQl.searchForSale,
        variables: {
          company_id: this.companyId, 
          input,
          pagination: {
              first: 12,
              after: after.toString()
          }
        }
    }).pipe(
         map(({data}) => data['searchForSale'])
    )
  };
  
  getForSaleByID( sale_id: string  ): Observable<any>  {
    return this.apollo.query({
      query: ForSaleGraphQl.GetForSaleByID,
      variables: {
         company_id: this.companyId, 
         sale_id
      }
    }).pipe(
       map(({data}) => data['GetForSaleByID'])
    )
  };
  
  addForSale( input: IAddforSale ): Observable<any>  {
      return this.apollo.mutate({
          mutation: ForSaleGraphQl.AddForSale,
          variables: {
            company_id: this.companyId, 
            input
          }
      })
  };
  
  editForSale(  input: IAddforSale ): Observable<any>  {
    return this.apollo.mutate({
      mutation: ForSaleGraphQl.EditForSale,
      variables: {
        input
      }
   })
  };
  
  likeForSale( sale_id: string ): Observable<any>  {
    return this.apollo.mutate({
      mutation: ForSaleGraphQl.LikeForSale,
      variables: {
         company_id: this.companyId,
         sale_id
      }
    })
  };

  UnLikeForSale( sale_id: string ): Observable<any>  {
    return this.apollo.mutate({
      mutation: ForSaleGraphQl.UnLikeForSale,
      variables: {
         company_id: this.companyId,
         sale_id
      }
    })
  };

  makeForSaleUrgent( sale_id: string ): Observable<any>  {
    return this.apollo.mutate({
      mutation: ForSaleGraphQl.MakeForSaleUrgent,
      variables: {
        company_id: this.companyId, 
        sale_id
      }
    })
  };
  
  changeForSaleStatus( sale_id: string, status:string ): Observable<any>  {
    return this.apollo.mutate({
      mutation: ForSaleGraphQl.ChangeForSaleStatus,
      variables: {
        company_id: this.companyId, 
        sale_id,
        status 
      }
    })
  };

  removeForSale( sale_id: string ): Observable<any>  {
    return this.apollo.mutate({
      mutation: ForSaleGraphQl.RemoveForSale,
      variables: {
        company_id: this.companyId, 
        sale_id 
      }
    })
  };

  removeForSaleFile( sale_id: string, file_id: string ): Observable<any>  {
    return this.apollo.mutate({
      mutation: ForSaleGraphQl.RemoveForSaleFile,
      variables: {
        company_id: this.companyId, 
        sale_id,
        file_id
      }
    })
  };
}

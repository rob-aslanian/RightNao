import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { graphqlCompanyProfile } from '../../graphql/company-profile';

const API = '/api/v1/uploading/';

@Injectable({
  providedIn: 'root'
})
export class CoverImageService {

  constructor(
    private http:HttpClient,
    private apollo:Apollo
  ) { }


  /**
   * Upload Image 
   * @param companyId 
   * @param param1 
   */
  public uploadImageOrigin(companyId  ,{ file , name } , type) : Observable<any>{
      const path = `${API}company/${companyId}/company_cover_origin?base64=true`

      return this.http.post( path , { file , name });

  }


  /**
   * Uplaod image
   * 
   * @param companyId 
   * @param param1 
   */
  public uploadImage(companyId  , { file , name } ,  type) : Observable<any>{
    const path = `${API}company/${companyId}/company_cover?base64=true`

    return this.http.post( path, { file , name });

  }


  /**
   * Remove image 
   * 
   * @param company_id 
   */
  public removeImage(company_id:string, type: string, id: string) : Observable<any>{
    switch (type) {
      case 'company':{
          return this.apollo.mutate({
            mutation:graphqlCompanyProfile.removeCompanyCoverImage,
            variables:{  company_id }
          })
        }
      case 'office': {
        let office_id = company_id ;
        let compayId = id ? id : undefined;
        
           return this.apollo.mutate({
            mutation: graphqlCompanyProfile.removeOfficeCoverImage,
            variables: {
                 office_id,
                 company_id: compayId
             }
           })
       }
    
      default:
        break;
    }
 
  }

  private getPatchByType(type: string, id: string, origin: boolean): string {
        switch (type) {
          case 'company': {
                let orig = origin ?  '/company_cover_origin' : '/company_cover';
                return `${API}company/${id}${orig}?base64=true`;
              }
         case 'office': {
               let orig = origin ?  'v_office_origin' : 'v_office';
               return `${API}${orig}/${id}?base64=true`;
         }     
       }
    }
  
}

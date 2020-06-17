import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Observable, forkJoin, merge, zip } from 'rxjs';
import {Apollo} from 'apollo-angular';
import { graphqlCompanyProfile } from '../../graphql/company-profile';
import { IFile } from '../../models/files.interface';
import { graphqlUserProfile } from '../../graphql/user-profile';
import { GlobalUserProService } from '../global-user-pro.service';
import { map } from 'rxjs/operators';
import { graphqlShared } from '../../graphql/shared/base-data';


const API_PATH = '/api/v1/uploading/',
      USER_PATH = API_PATH + 'user/',
      COMPANY_PATH = API_PATH + 'company/';

@Injectable({
  providedIn: 'root'
})

export class ImageUploadService {
  
   profileId: string;

  constructor(
    private http:HttpClient,
    private apollo:Apollo,
    private globalUserProService: GlobalUserProService
  ) {
         
    this.profileId = this.globalUserProService.getProfileId();
   }


  /***_______________ USER  _______________***/

  public getAvatar() {
    let query = this.globalUserProService.isCompanyActive() ?
                this.apollo.query({
                  query:graphqlShared.GetOriginCompanyAvatar,
                  fetchPolicy:'network-only',
                  variables:{ company_id:this.profileId }
                })
                .pipe(map((({data}) => data['GetOriginCompanyAvatar'])))  : /// Company

                this.apollo.query({
                  query:graphqlShared.GetOriginAvatar,
                  fetchPolicy:'network-only',
                })
                .pipe(map((({data}) => data['GetOriginAvatar'])));  /// User

    return query;
  }
  
  public uploadAvatar(image:FormData) : Observable<any> {
     let path = this.globalUserProService.isCompanyActive() ?
                 `${COMPANY_PATH}${this.globalUserProService.getProfileId()}/company_avatar/` : /// Company
                 `${API_PATH}avatar/`; /// User
      
      return this.http.post(path , image)

  }

  public uploadAvatarOrigin(image:FormData){
      let path = this.globalUserProService.isCompanyActive() ?
                `${COMPANY_PATH}${this.globalUserProService.getProfileId()}/company_avatar_origin/` : /// Company
                `${API_PATH}avatar_origin/`; /// User 

      return this.http.post(path , image)
  }

  public uploadFilesFeedback(id:string , file: FormData, type: string) : Observable<any>{
    let path = `${API_PATH}${type}/${id}`;
    return this.http.post(path , file);
  }

  public uploadInterest(id:string , file:Blob) : Observable<any>{
    let interest = `${API_PATH}interest/${id}`,
        formData = new FormData();
        formData.append('file' , file);

      return this.http.post(interest , formData);
  }

  public uploadAccomplishment(files:IFile[] , id?:string) : Observable<any>{
    let acoomp = `${API_PATH}accomplishment${id ? '/' + id : '/'}?base64=true`,
        result = [];
    
      files.map(file => {
        if(file.file && file.name){
          result.push(
            this.http.post(acoomp, {
              file: file.file,
              name: file.name
            }));
        }
      });

    return forkJoin(result);
              
  }


   /***_______________ USER  _______________***/

  /**
   * Upload Image for sercive in company 
   * 
   * @param companyId 
   * @param serviceId 
   * @param file 
   */
  public uploadService(companyId:string , serviceId:string , item:Blob) : Observable<any>{
    
     let service = `${COMPANY_PATH}${companyId}/service/${serviceId}`,
          formData = new FormData();

        formData.append('file' , item);

     return this.http.post(service ,formData)
  }

  /**
   * Upload image for product in company 
   * 
   * @param companyId 
   * @param productId 
   * @param file 
   */
  public uploadProduct(companyId:string , productId:string , item:Blob) : Observable<any>{
    let product = `${COMPANY_PATH}${companyId}/product/${productId}`,
        formData = new FormData();

        formData.append('file' , item)
  
     return this.http.post(product ,formData)
  }

  /**
   * Upload Award 
   * 
   * @param company_id 
   * @param files 
   */
  public uploadAward(company_id:string , files:IFile[] , id?:string) : Observable<any>{
    let result = [],
        url = `${COMPANY_PATH}${company_id}/company_award${id ? '/' + id : '/'}?base64=true`;
    
    files.forEach(file => {  
      if(file.file && file.name){

        result.push(
          this.http.post(url, {
            file: file.file,
            name: file.name
          }));
      }
    });

    return forkJoin(result);
  }

  /**
   * Uplaod gallery image 
   * 
   * @param company_id 
   * @param files 
   * @param id 
   */
  public uploadGallery(company_id:string , files:FormData , id?:string) : Observable<any>{
    let url = `${COMPANY_PATH}${company_id}/gallery${id ? '/' + id : '/'}`;
    
    return this.http.post(url, files  , {
      reportProgress:true,
      observe:'events'
    })
    .pipe(
      map((event) => {
         switch(event.type){
           /// Uploading ///
           case HttpEventType.UploadProgress: {
             const progress = Math.round(100 * event.loaded / event.total );

             return {
               status:'progress',
               progress
             }
           }

           /// Upload 
           case HttpEventType.Response:{
             return {
               ...event.body['info'][0],
               status:'done'
             }
           }

           /// Error 
           default: {
             return {
               status:'error',
               type:event.type
             }
           }
         }
      })
    )
  }

  /**
   * Delete gallery file
   * 
   * @param company_id 
   * @param files_id 
   */
  public delteGalleryFile(company_id:string , files_id: string[]) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlCompanyProfile.RemoveFilesInCompanyGallery,
      variables:{ company_id , files_id }
    })
  }


  /**
   * Delete image production
   * 
   * @param companyId 
   * @param id 
   */
  public deleteImage(companyId:string,id:string):Observable<any>{
        
      return this.apollo.mutate({
        mutation:graphqlCompanyProfile.RemoveProductImage,
        variables:{
          'company_id':companyId,
          'id':id
        }})       

   }
  /**
   * Delete image service 
   * 
   * @param companyId 
   * @param id 
   */
    public deleteImageServices(companyId:string,id:string){

      return this.apollo.mutate({
        mutation:graphqlCompanyProfile.removeServiceImage,
        variables:{
          'company_id':companyId,
          'id':id
        }}) 
  
    }


    /**
     * Upload founder image
     * 
     * @param companyId 
     * @param founderId 
     * @param item 
     */
    public uploadFounderImage(companyId:string,founderId:string , item:any) : Observable<any>{
      let milestone = `${COMPANY_PATH}${companyId}/founder/${founderId}`;
 
      return this.http.post(milestone , item );

    }
    /**
     * 
     * @param files 
     */

  public uploadPorfolioImage(files:FormData, id: string): Observable<any>{
        const api_path = `${API_PATH}portfolio/${id}`;     
        return  this.http.post( api_path, files );
  }

  public uploadOfficeService(office_id: string, serviceId: string, files: FormData): Observable<any>{
    const office = `${API_PATH}v_service/${office_id}/${serviceId}`;     
    return  this.http.post(office, files );
  };


          public uploadOfficePort(files: FormData, office_id, portflioid: string): Observable<any>{
 
            const office = `${API_PATH}v_portfolio/${office_id}/${portflioid}`;     
                return  this.http.post(office, files , {
                  reportProgress:true,
                  observe:'events'
                })
                .pipe(
                  map((event => {
        
                    switch(event.type){
                      //Upload
                      case HttpEventType.UploadProgress:{
                        const progress = Math.round(100 * event.loaded / event.total );
                        return{
                          status:'progress',
                          progress,
        
                        }        
                      }
                     //Response
                    case HttpEventType.Response:{
                      return {
                        ...event.body['info'],
                        status:'done'
                      }
                    }
                    //Error
                    default: {
                      return {
                        status:'error',
                        type:event.type
                      }
                    }
         
                  }}))
                
                )
        
              }



   public removeFilesPortfolio( id:string , files_id:string[] ) : Observable<any> {

       return this.apollo.mutate({
              mutation:graphqlUserProfile.removeFIlesPortfolio,
              variables:{
                id,
                files_id
              }
          })
      }

    public uploadImageOffice(id: string, image: FormData ) : Observable<any>{
        const path = `${API_PATH}v_office/${id}`;
        return    this.http.post( path , image );
    };

    public uploadFiles(id: string, image: FormData, enPath: string ) : Observable<any>{
      const path = `${API_PATH}${enPath}${id}`;
      return    this.http.post( path , image );
  };

    public uploadPostServiceRequestFiles(id: string, image: FormData ) : Observable<any>{
      const path = `${API_PATH}service_request/${id}`;
      return    this.http.post( path , image );
  };

    public uploadImageOfficeOrigin(id: string,  originImage: FormData ) : Observable<any>{
      const origin =  `${API_PATH}v_office_origin/${id}`;
      return this.http.post( origin , originImage );
   };
   public uploadVOfficeServiceOrderFiles(id: string,  originImage: FormData ) : Observable<any>{
      const origin =  `${API_PATH}service_order/${id}`;
      return this.http.post( origin , originImage );
   }

   //upload Advert files
   public uploadAdvertImage(files:FormData, id: string): Observable<any>{
    const api_path = `${API_PATH}advert_gallery/${id}`;     
    return  this.http.post( api_path, files );
    }
    //upload Car images
    public uploadCarsImage(files:FormData, id:string): Observable<any>{
      const api_path = `${API_PATH}/vehicle/${id}`;
      return this.http.post( api_path, files );
    }

    public uploadPetsImage(files:FormData, id:string): Observable<any>{
      const api_path = `${API_PATH}pets_plants/${id}`;
      return this.http.post( api_path, files );
    }
    public uploadAdsServiceImage(files:FormData, id:string): Observable<any>{
      const api_path = `${API_PATH}ads_service/${id}`;
      return this.http.post( api_path, files );
    }
    public uploadImage(files:FormData, id:string, path: string): Observable<any> {
        const api_path = `${API_PATH}${path}/${id}`;
        return this.http.post( api_path, files );
    }
 }

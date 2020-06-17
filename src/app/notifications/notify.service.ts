import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GlobalUserProService } from '../_shared/services/global-user-pro.service';
import { Apollo } from 'apollo-angular';
import { graphqlShared } from '../_shared/graphql/shared/base-data';
import { graphQlRecommendation } from '../_shared/graphql/recommendation/recomendations';
import { graphqlNottification } from '../_shared/graphql/nottifications/nottification';
import { map } from 'rxjs/operators';
import { graphqlJobForCompany } from '../_shared/graphql/jobs/job-for-companies';
import { Manage } from '../_shared/graphql/network/manage';


const API_PATH = '/api/v1/notifications/';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  userId;

  constructor(
    private htpp:HttpClient,
    private apollo:Apollo,
    private globalService:GlobalUserProService
  ) { 
    this.userId = globalService.getUserProfile().id;
  }

  /**
   * Get nottifications 
   * 
   * @param ts 
   */
  public getNotifications(ts?:number) : Observable<any> {
    let timestamp = ts > 0 ? `&ts=${ts}` : '',
        isCompany = this.globalService.isCompanyActive(),

        profileId = !isCompany ?  
                    this.globalService.getUserProfile().id : /// User
                    this.globalService.getComapnyId();  /// Comapny 
   
    return this.htpp.get(`${API_PATH}${isCompany ? 'company/' : 'user/' }${profileId}?timeout=45${timestamp}`)
    
  }

  /**
   * Get company profile by id 
   * 
   * @param company_id 
   */
  public getCompanyProfile(company_id:string) : Observable<any> {
    return this.apollo.watchQuery({
      query:graphqlShared.GetCompanyProfileByID,
      variables:{company_id}
    }).valueChanges
  }


  /**
   * Get profile by id 
   * @param id 
   */
  public getUserProfile(user_id:string) : Observable<any>{
     return this.apollo.watchQuery({
       query:graphqlShared.getProfileByID,
       variables: { user_id }
     }).valueChanges
  }

  /**
   * Write reccomendation
   * 
   * @param variables 
   */
  public writeRecommendation(variables: object) : Observable<any>{
    return this.apollo
              .mutate({
                mutation: graphQlRecommendation.WriteRecommendation,
                variables
              })
  }

  /**
   * Ignore reccomendation 
   * 
   * @param id 
   */
  public ignoreReccomendation(id:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphQlRecommendation.IgnoreRecommendationRequest,
      variables:{ id }
    })
  }

 /**
  * Get User notiffication
  * 
  * @param first 
  * @param after 
  */
  public getUserNottifications(first?:number , after?:string) : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlNottification.getUserNottifications,
      fetchPolicy:'network-only',
      variables:{
        pagination:{
          first,
          after
        }
      }
    })
    .valueChanges
    .pipe(
      map(({data})  => {
        let nottifications  = data['getNotifications'];
        return {
          amount_not_seen:nottifications.amount_not_seen,
          nottifications:nottifications.notification_json.map(notify => JSON.parse(notify)),
        };
    }))
  }

  /**
   * Get company nottifications 
   * 
   * @param company_id 
   */
  public getCompanyNottification(company_id:string , first?:number , after?:string) : Observable<any> {
     return this.apollo.watchQuery({
       query:graphqlNottification.getCompanyNotifications,
       fetchPolicy:'network-only',
       variables:{ 
         company_id,
         pagination:{
          first,
          after
        }
       }
     })
     .valueChanges
     .pipe(
      map(({data})  => {
        let nottifications  = data['getCompanyNotifications'];

        console.log(nottifications);
        

        return {
          amount_not_seen:nottifications.amount_not_seen,
          nottifications:nottifications.notification_json.map(notify => JSON.parse(notify)),
        };
    }))
  }

  /**
   * Mark nottification as seen 
   * 
   * @param ids 
   */
  public markNottificationAsSeen(ids:string[]) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlNottification.MarkNotificationAsSeen,
      variables:{ids}
    })
  }

  /**
   * Mark nottification as seen for company 
   * 
   * @param company_id 
   * @param ids 
   */
  public markNottificationAsSeenCompany(company_id:string, ids:string[] ) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlNottification.MarkNotificationAsSeenForCompany,
      variables:{ company_id , ids }
    })

  }

  /**
   * Get Company job
   * 
   * @param companyId 
   * @param jobId 
   */
  public getJob(jobId:string) : Observable<any> { 
    return this.apollo.watchQuery({
      query:graphqlJobForCompany.GetJob,
      variables :{ jobId}
    }).valueChanges
  }

  /**
   * Remove nottification
   * 
   * @param ids 
   */
  public removeNottification(ids:string[]) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlNottification.RemoveNotification,
      variables:{ ids }
    })
  }

  /**
   * Approved founder request 
   * 
   * @param company_id 
   * @param request_id 
   */
  public approveFounder(company_id:string , request_id:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlNottification.ApproveFounderRequest,
      variables:{ company_id , request_id}
    });
  }

  /**
   * Ignore founder request 
   * 
   * @param company_id 
   * @param request_id 
   */
  public ignoreFounder(company_id:string , request_id:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlNottification.RemoveFounderRequest,
      variables:{ company_id , request_id}
    });
  }

  /**
   * Approved friend ship 
   * 
   * @param requestId 
   */
  public approvedFriendShip(requestId:string) : Observable<any> {
    return this.apollo.mutate({
      mutation:Manage.approveFriendRequest,
      variables: { requestId }
    })
  }
  /**
   * Ihnore friendship
   *
   * @param requestId 
   */
  public ignoreFriendRequest(requestId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:Manage.ignoreFriendRequest,
      variables:{ requestId }
    })
  }



}

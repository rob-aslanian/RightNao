import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { NetworCompany } from '../../graphql/network/network-company';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkCompanyService {

  constructor(
    private apollo:Apollo
  ) { }

  /**
   * Get company invitations 
   * 
   * @param company_id 
   */
  getInvitations(company_id:string) : Observable<any> {
    return this.apollo.watchQuery({
      query:NetworCompany.GetInvitationForCompany,
      fetchPolicy:'network-only',
      variables:{  company_id }
    }).valueChanges
  }

  /**
   * Get network import info  
   * 
   * @param url 
   */
  getNetworkImportInfo(url:string) : Observable<any>{
    return this.apollo.watchQuery({
      query:NetworCompany.GetNetworkImportInfo,
      fetchPolicy:'network-only',
      variables:{ url }
    }).valueChanges
  }

  /**
   * Sent Email Invitation 
   * 
   * @param email 
   * @param name 
   * @param company_id 
   */
  sentEmailInvitation(email:string, name:string , company_id?:string ) : Observable<any>{
    return this.apollo.mutate({
      mutation:NetworCompany.SentEmailInvitation,
      variables:{ email , name ,  company_id }
    })
  }


  /**
   * Get blocked users or compannies 
   * 
   */
  public getBlockedUserOrCompany() : Observable<any> {
    return this.apollo.watchQuery({
      fetchPolicy:'network-only',
      query:NetworCompany.getBlockedUsersOrCompanies,
    })
    .valueChanges
    .pipe(map( ({data}) => data['getBlockedUsersOrCompanies']))
  }


  /**
   * Unblock user 
   * @param userId 
   */
  public unblockUser(userId:string) : Observable<any> {
    return this.apollo.mutate({
      mutation:NetworCompany.UnblockUser,
      variables:{ userId }
    })
  }

  /**
   * Unblock company 
   * 
   * @param companyId 
   */
  public unblocCompany(companyId:string) : Observable<any> {
    return this.apollo.mutate({
      mutation:NetworCompany.UnblockCompany,
      variables:{ companyId }
    })
  }

  /**
   * Follow for user  
   * 
   * @param companyId 
   * @param userId 
   */
  public followForCompany(companyId:string , userId:string) : Observable<any> {
    return this.apollo.mutate({
      mutation:NetworCompany.FollowForCompany,
      variables:{ companyId , userId }
    })
  }

  /**
   * Follow company for company 
   * 
   * @param companyId 
   * @param followId 
   */
  public followCompanyForComapny(companyId:string , followId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:NetworCompany.FollowCompanyForCompany,
      variables: { companyId , followId }
    })
  }

  /**
   * Get Friendship suggestions 
   */
  public getFriendSuggestions() : Observable<any>{
    return this.apollo.watchQuery({
      fetchPolicy:'network-only',
      query:NetworCompany.getFriendSuggestions
    }).valueChanges
      .pipe(map(({data}) => data['getFriendSuggestions']))
  }

  /**
   * Get Company suggestions 
   * 
   * @param companyId 
   */
  public getCompanySuggestions(companyId:string) : Observable<any>{
    return this.apollo.watchQuery({
      query:NetworCompany.getSuggestedCompaniesForCompany,
      fetchPolicy:'network-only',
      variables:{ companyId }
    })
    .valueChanges
    .pipe(map(({data}) => data['getSuggestedCompaniesForCompany']))
  }
}

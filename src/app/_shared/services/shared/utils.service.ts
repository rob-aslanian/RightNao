import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { graphqlShared } from '../../graphql/shared/base-data';
import { graphqlUserProfile } from '../../graphql/user-profile';
import { ICompanyConversation } from '../../models/shared/shared.models';
import { map } from 'rxjs/operators';
import { graphQlRecommendation } from '../../graphql/recommendation/recomendations';
import { CookieService } from 'ngx-cookie-service';
import { IGroupRegistration } from '../../models/groups/groups.model';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  

  constructor(
    private apollo:Apollo,
    private cookieService:CookieService
  ) { }


  /**
   * Get city by id 
   * 
   * @param city_id 
   */
  public getCityById(city_id:string) : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlShared.getCities,
      variables:{ city_id }
    }).valueChanges

  }


   
  public GetCompanyProfileInfo( company_id:string ) : Observable<any>{
    return this.apollo.query({
      fetchPolicy: 'network-only',
      query:graphqlShared.getCompanyProfileInfo,
      variables:{ company_id }
    }).pipe(
      map( ({ data }) => data['GetCompanyProfileByID'])
   )
  }

  public getUserProfileInfo( user_id:string ) : Observable<any>{
    return this.apollo.query({
      fetchPolicy: 'network-only',
      query:graphqlShared.getUserProfileInfo,
      variables:{ user_id }
    }).pipe(
       map( ({ data }) => data['getProfileByID'])
    )

  }


  public ActivateUser(code:String , user_id:String) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlShared.ActivateUser,
      variables: { code , user_id }
    })
    .pipe(map(({ data }) => data['ActivateUser'] ))
  }

  /**
   * Register user 
   * 
   * @param input 
   */
  public RegisterUser(input) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlShared.RegisterUser,
      variables: { input  } 
    })
    .pipe(map(({ data }) => data['Register'] ))
  }


  /**
   * VoteForComingSoon 
   * 
   * @param email 
   * @param type 
   */
  public VoteForComingSoon(email:string , type:string) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlShared.VoteForComingSoon,
      variables:{ email , type }
    })
  }

  /**
   * Check username 
   * 
   * @param username 
   */
  public checkUserName(username:string ) : Observable<any> {
    return this.apollo.watchQuery({
      query:graphqlShared.checkUsername,
      variables:{ username }
    })
    .valueChanges
  }

  /**
   * Search jobs 
   * @param input 
   */
  public searchJobsById(id:Object , keyword?:string):Observable<any>{
    return this.apollo.watchQuery({
        query:graphqlShared.searchJobsById,
        fetchPolicy:'network-only',
        variables:{
          company_ids:[id],
          keyword:keyword ? keyword : undefined,
        }
    })
    .valueChanges
    .pipe(map(({data}) => data['searchJobs']))
  }

  /**
     * Create Conversation for company 
     * 
     * @param result 
     */
    public openSmallChatBoxForComapny(result:ICompanyConversation , is_company:boolean = false) : Observable<any> {
      return this.apollo.mutate({
        mutation:graphqlUserProfile.CreateConversationCompany,
        variables:{
          companyId:result.companyId,
          name:result.name,
          avatar:result.avatar,
          participants: [
            {
              id: result.id,
              is_company,
              is_admin: false
            }
          ]
        }
      })
    };

    public searchUsers(first: number, after: string): Observable<any> {

       return this.apollo.watchQuery({
            fetchPolicy: 'network-only',
            query: graphqlShared.searchUsersDetail,
            variables: {
              input: { 
                full_name: '' 
              },
              pagination: {
                  first,
                  after
              }
            }

       }).valueChanges.pipe(
           map( ( { data } ) => data['searchUsers']['profiles'] )
       )
    }


  /**
   * Open message
   * 
   * @param param0 
   */
   public  openSmallChatBox({ id , name , avatar}  , is_company:boolean = false) : Observable<any> {
    return this.apollo
      .mutate({
        mutation: graphqlUserProfile.CreateConversation,
        variables: {
          name,
          avatar,
          participants: [
            {
              id: id,
              is_company,
              is_admin: false
            }
          ]
        }
      })
  }

  /**
   * Sign out 
   */
  public signOut() : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlShared.sighOut
    })
  }

  /**
   * Get Current location 
   */
  public getCurrentLocation() : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlShared.getLocation
    }).valueChanges
  }


  /**
   * Save feedback 
   * 
   * @param feedback 
   */
  public saveFeedback(feedback:
    {
      name?: string;
      email?: string;
      message?: string
    }
  ){
    return this.apollo.mutate({
      mutation:graphqlShared.SaveFeedback,
      variables:{ feedback }
    })
  }



  /**
   * Get Company profile 
   * 
   * @param company_id 
   */
  public getCompanyProfileById(company_id:string) : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlShared.GetCompanyProfileByID,
      variables:{ company_id },
      fetchPolicy:'network-only'
    })
    .valueChanges
    .pipe(map(({data}) => data['GetCompanyProfileByID']))
  }

  /**
   * Get Profile by id 
   * 
   * @param user_id 
   */
  public getProfileById(user_id:string) : Observable<any>{
    let lang = this.cookieService.get('selected_lang') || 'en';

    return this.apollo.watchQuery({
      query:graphqlShared.getProfileByID,
      variables:{ user_id , lang },
      fetchPolicy:'network-only'
    })
    .valueChanges
    .pipe(map(({data}) => data['getProfileByID']))
  }

  /**
   * Get user or company profile 
   * 
   * @param id 
   * @param type 
   */
  public getShortProfile(id:string ,type:string) : Observable<any>{
    const QUERIES = {
      user:'getProfileById',
      company:'getCompanyProfileById'
    };

    let query = QUERIES[type];

    return this[query](id);

  }

  /**
   * Get user companies 
   */
  public getMyCompanies() : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlUserProfile.getMyCompany,
      fetchPolicy:'network-only'
    })
    .valueChanges
    .pipe(map(({data}) => data['getMyCompanies']))
  }



  /**
   * Get user profile for CV
   * 
   * @param user_id 
   */
  public getUserProfileForCv(user_id:string) : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlShared.getProfileForCV,
      variables:{ user_id },
      // fetchPolicy:'network-only'
    })
    .valueChanges
    .pipe(map(({data}) => data["getProfileByID"]))
  }


  /**
   * Follow user to user 
   * 
   * @param userId 
   */
  public follow(userId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlShared.Follow,
      variables:{ userId }
    })
  }

  /**
   * Unfollow user to user 
   * 
   * @param userId 
   */
  public unFollow(userId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlShared.Unfollow,
      variables:{ userId }
    })
  }


  /**
   * Follow user to company 
   * 
   * @param companyId 
   * @param userId 
   */
  public followUserToCompany(companyId:string , userId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlShared.FollowForCompany,
      variables:{ companyId , userId }
    })
  }

  // * Unfollow user to company 
  public unFollowCompany(companyId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlShared.UnfollowCompany,
      variables:{ companyId }
    })
  }

  // * Follow user to  company     for User
  followCompanyForUser(companyId: string) : Observable<any> {
    return this.apollo.mutate({
      mutation: graphqlShared.FollowCompany,
      variables: { companyId }
    })
  }

  /**
   * Unfollow user to company 
   * 
   * @param companyId 
   * @param userId 
   */
  public unFollowUserToCompany(companyId:string , userId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlShared.UnfollowForCompany,
      variables:{ companyId , userId }
    })
  }


  /**
   * Follow company for company 
   * 
   * @param companyId 
   * @param followId 
   */
  public followCompnayForCompany(companyId:string , followId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlShared.FollowCompanyForCompany,
      variables:{ companyId , followId }
    })
  }

  /**
   * Unfollow company for company 
   * 
   * @param companyId 
   * @param followId 
   */
  public unFollowCompnayForCompany(companyId:string , followId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlShared.UnfollowCompanyForCompany,
      variables:{ companyId , followId }
    })
  }


  /**
   * Add user to user to favorite 
   * 
   * @param userId 
   */
  public addUserToFavorite(userId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlShared.AddToFavourites,
      variables:{ userId }
    })
  }

  /**
   * Remove user from favorites 
   * 
   * @param userId 
   */
  public removeUserFromFavorite(userId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlShared.RemoveFromFavourites,
      variables:{ userId }
    })
  }

  /**
   * Add company to favorite 
   * 
   * @param companyId 
   */
  public addCompanyToFavorite(companyId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlShared.AddCompanyToFavourites,
      variables:{ companyId }
    })
  }

  /**
   * Remove company fro favorite 
   * 
   * @param companyId 
   */
  public removeCompanyFromFavorite(companyId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlShared.RemoveCompanyFromFavourites,
      variables:{ companyId }
    })
  }

  /**
   * Unblock user 
   * 
   * @param userId 
   */
  public unBlockUser(userId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlShared.UnblockUser,
      variables:{ userId }
    })
  }

  /**
   * Unblock company 
   * 
   * @param companyId 
   */
  public unBlockCompany(companyId) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlShared.UnblockCompany,
      variables:{ companyId }
    })
  }

  /**
   * Unblock user for company
   * 
   * @param company_id 
   * @param user_id 
   */
  public unBlockUserForCompany(company_id:string , user_id) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlShared.UnblockUserForCompany,
      variables:{ company_id , user_id }
    })
  }

  /**
   * Disconnect / unfriend 
   * 
   * @param userId 
   */
  public disconnect(userId:string) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlShared.Unfriend,
      variables:{ userId }
    })
  }

   /**
   * Write reccomendation
   * 
   * @param variables 
   */
  public writeRecommendation(variables: object) : Observable<any>{
    return this.apollo.mutate({
        mutation: graphQlRecommendation.WriteRecommendation,
        variables
      })
  }

  /**
   * Ask reccomendation 
   * 
   * @param variables 
   */
  public  askRecomendation(variables: object) : Observable<any> {
   return this.apollo.mutate({
        mutation: graphQlRecommendation.AskRecommendation,
        variables
      })
  }

  /**
   * Send friend request 
   * 
   * @param userId 
   * @param description 
   */
  public  SendFriendRequest (userId:string , description?:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlShared.SendFriendRequest,
      variables:{  userId , description }
    })
  }

  public registerGroups (input: IGroupRegistration): Observable<any> {
     return this.apollo.mutate({
        mutation: graphqlShared.registerGroup,
        variables: {
           input
        }
     })
  };

  public  companySuggestionsForCompany( companyId: string, after: string, first: number ) {
     return this.apollo.watchQuery({
            fetchPolicy: 'network-only',
            query: graphqlShared.getSuggestedCompaniesForCompany,
            variables: {
              companyId,
              pagination: {
                first,
                after: after  
              }  
            }
        }).valueChanges
   }
}

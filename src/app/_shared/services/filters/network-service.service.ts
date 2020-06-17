import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Followers } from "../../graphql/network/followers";
import { Observable } from "rxjs";
import { graphqlUserProfile } from "../../graphql/user-profile";
import { graphqlCompanyProfile } from "../../graphql/company-profile";
import { graphqlJobForCompany } from "../../graphql/jobs/job-for-companies";
import { graphqlShared } from "../../graphql/shared/base-data";

@Injectable({
  providedIn: "root"
})
export class NetworkService {
  constructor(private apollo: Apollo) {}

  public connectUser(input: Object): Observable<any> {
    return this.apollo.mutate({
      mutation: Followers.SendFriendRequest,
      variables: input
    });
  }

  public openChat(
    fullName: string,
    avatar: string,
    id: string
  ): Observable<any> {
    return this.apollo.mutate({
      mutation: graphqlUserProfile.CreateConversation,
      variables: {
        name: fullName,
        avatar: avatar,
        participants: [
          {
            id: id,
            is_company: false,
            is_admin: false
          }
        ]
      }
    });
  }
 
   public createConversationCompany( companyId: string , name: string  , avatar:string , id  ) : Observable<any> {

        return this.apollo.mutate({
            mutation:graphqlUserProfile.CreateConversationCompany,
             variables : {
                  companyId,
                  name,
                  avatar,
                  participants:[
                    {
                       id,
                       is_company:true,
                       is_admin:false
                    }
                  ]
             }
        })

   }

  public getProfile(): Observable<any> {
    return this.apollo.query({
      fetchPolicy: "network-only",
      query: graphqlCompanyProfile.searchCompanyProfile,
      variables: {
        input: {
          with_jobs: false,
          search_for_companies: false,
          search_for_organizations: false,
          size:'size_unknown',
          type:'type_unknown',
        }
      }
    });
  }

  public searchProfile(input: Object): Observable<any> {
    return this.apollo.watchQuery({
      fetchPolicy:'network-only',
      query: graphqlCompanyProfile.searchCompanyProfile,
      variables: {
        input: input
      }
    }).valueChanges
  }

  public followCompany(companyId: string): Observable<any> {
    return this.apollo.mutate({
      mutation: Followers.FollowCompany,
      variables: {
        companyId: companyId
      }
    });
  }
  public SaveUserSearchFilter(name: string, filter: object): Observable<any> {
    let obj = {
      name: name,
      filter: filter
    };
    return this.apollo.mutate({
      mutation: Followers.saveusersearchfilter,
      variables: {
        user_filter: obj
      }
    });
  }
  public saveUserSearchFiltersForCompany(filters:Object):Observable<any>{
      return this.apollo.mutate({
           mutation:Followers.saveUserSearchFiltersForCompany,
              variables:{
                user_filter:filters
              }
      });
  }
  public getlistOfFiltersByType(): Observable<any> {
    return this.apollo.query({
      fetchPolicy: "network-only",
      query: Followers.getAalFilters
    });
  }
  public getAllFiltersForCompany(companyId):Observable<any>{
    return this.apollo.watchQuery({
     fetchPolicy:'network-only',
       query:Followers.getAalFiltersForCompany,
         variables:{
           company_id:companyId
        }
     }).valueChanges
   }

  public removefilter(id?: string): Observable<any> {
    return this.apollo.mutate({
      mutation: Followers.removefilter,
      variables: {
        filter_id: id
      }
    });
  }
  public removefilterForCompany(id:string,companyID:string): Observable<any> {
    return this.apollo.mutate({
      mutation: Followers.removefilter,
      variables: {
        filter_id: id,
        companyID:companyID
      }
    });
  }
  public SaveCompanySearchFilter(company_filter: object): Observable<any> {
    return this.apollo.mutate({
      mutation: Followers.saveCompanySearchFilter,
      variables: {
        company_filter: company_filter
      }
    });
  }
  public saveCompanySearchFilterCompany(company_filter:object):Observable<any>{
        return this.apollo.mutate({
           mutation:Followers.saveCompanySearchFilterCompany,
            variables:{
              company_filter
            }
        })
  }
  public SaveCandidateSearchFilter(companyId:string,filter:object,name:string): Observable<any> {
    let input = {
      name:name,
      companyID:companyId,
      candidateSearchFilter:filter
    }
    return this.apollo.mutate({
      mutation: Followers.saveCandidateSearchFilter,
      variables: {
        candidate_filter:input
      }
    });
  }
  public SaveJobsSearchFilter(job_filter: object): Observable<any> {
    return this.apollo.mutate({
      mutation: Followers.saveJobSearchFilter,
      variables: {
        job_filter: job_filter
      }
    });
  }
  public saveJobsSearchFiltersCompany(job_filter:Object ):Observable<any>{
    return this.apollo.mutate({
       mutation:Followers.saveJobsSearchFilterCompany,
        variables:{
          job_filter
        }
    })
  }

  public getCandidates(companyId:string): Observable<any> {
  let   searchCandidats = {
    experience_level:'experience_unknown',
    is_student:false,
    is_willing_to_travel:false,
    is_willing_to_work_remotly:false,
    is_possible_to_relocate:false,
    period:'Any'
    };
  
    return this.apollo.query({
      fetchPolicy: "network-only",
      query: graphqlJobForCompany.getCandidate,
      variables: {
        companyId,
        input: searchCandidats
      }
    });
    
  }
  public getCandidatess(candidatesFilter,companyId:string): Observable<any> {
   
    return this.apollo.query({
      fetchPolicy: "network-only",
      query: graphqlJobForCompany.getCandidate,
      variables: {
        companyId,
        input: candidatesFilter
      }
    });
  }

  public getListOfCities(countryId: string, cityTypeahead?: string):Observable<any> {
    return this.apollo.watchQuery({
      query: graphqlShared.getListOfCities,
      variables: {
        search_city: {
          country_id: countryId,
          find_city: cityTypeahead
        }
      }
    }).valueChanges;
  }
  public getUser(id):Observable<any>{
    return this.apollo.query({
         query:graphqlShared.getProfileByID,
           fetchPolicy:'network-only',
             variables:{
              user_id:id
            }
    });
  }
  public getCities(cityId:string):Observable<any>{
       return this.apollo.watchQuery({
         query:graphqlShared.getCities,
          fetchPolicy:'network-only',
          variables:{
            city_id:cityId
          }
       }).valueChanges;
  }
  
  public searchJobs(input:Object):Observable<any>{
        return this.apollo.watchQuery({
            query:graphqlShared.searchJobs,
            fetchPolicy:'network-only',
            variables:{
              input:input
            }
        }).valueChanges
  }

  public followUserCompany( companyId:string , userId:string ) : Observable<any> {

      return this.apollo.mutate({
           mutation:graphqlShared.FollowForCompany, 
              variables:{     
                companyId,
                userId
            }     
      })
   }


 public getCompanyNetworkInfo( company_id: string ): Observable<any> {
     return this.apollo.watchQuery({
              fetchPolicy:'network-only',
              query: graphqlUserProfile.getCompanyNetworkInfo,
              variables: {
                 company_id
              }
     }).valueChanges
 }

 public getUserNetworkInfo( user_id: string ): Observable<any> {
      return this.apollo.watchQuery({
              fetchPolicy:'network-only',
              query: graphqlUserProfile.getUserNetworkInfo,
              variables: {
                 user_id
              }
     }).valueChanges
  }  
}

import { Injectable } from "@angular/core";
import { Apollo } from "apollo-angular";
import { GlobalUserProService } from "./global-user-pro.service";
import { graphQlRecommendation } from "../graphql/recommendation/recomendations";
import { Subject } from "rxjs";
import { Followers } from "../graphql/network/followers";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class RecommendationService {
  user: any;
  firends = new Subject<any>();
  recommendations = new Subject<any>();

  constructor(
    private apollo: Apollo,
    private userService: GlobalUserProService
  ) {
    this.user = this.userService.getUserProfile();
  }

  get getFriends() {
    this._getFriends();
    return this.firends;
  }

  get getReccomendations() {
    this._getRecommendation();
    return this.recommendations;
  }

  private _getFriends() {
    this.apollo
      .watchQuery({
        query: graphQlRecommendation.getFriendships
      })
      .valueChanges.subscribe(({ data }) => {
        if (data["getFriendships"]) {
          let friends = data["getFriendships"].filter(
            friend => friend["status"] === "Approved"
          );
          this.firends.next(friends);
        }
      });
  }

  /**
   * Private
   * [GET]
   *
   * Get all information for recommendation
   * component
   */
  private _getRecommendation() {
    this.apollo
      .watchQuery({
        query: graphQlRecommendation.GetRecommendation,
        variables: {
          url: this.user["url"]
        }        
      })       
      .valueChanges.subscribe(({ data }) => {
        let _data = data["getProfile"],
          result = {
            recieved: _data["recieved_recommendation"],
            given: _data["given_recommendations"],  
            request: _data["received_recommendation_requests"],
            requested: _data["requested_recommendation_requests"],
            me: _data["me"]   
          };


        this.recommendations.next(result);  
      });
  }

  addToFavourites(id) {
    this.apollo  
      .mutate({  
        mutation: Followers.AddToFavourites,   
        variables: {  
          userId: id  
        }  
      })   
      .subscribe();   
  }   

  deleteUser(id) {   
    this.apollo
      .mutate({
        mutation: Followers.Unfriend,
        variables: {
          userId: id
        }
      }) 
      .subscribe();
  }


  reportUser(id, reportReason:string, text?:string) {
    this.apollo
      .mutate({
        mutation: Followers.ReportUser,
        variables: {
          user_id: id,
          input: {
            reason:reportReason,
            text
          }
        }
      })
      .subscribe();
  }

  reportCompany(company_id:string, report:string , explanation?:string){

    this.apollo.mutate({
      mutation:Followers.AddCompanyReport,
      variables:{
        company_id,
        input:{
          report,
          explanation
        }
      }
    }).subscribe();

  }

  blockUser(id) {
    this.apollo
      .mutate({
        mutation: Followers.BlockUser,
        variables: {
          userId: id
        }
      })
      .subscribe();
  }
  unblockUser(id:string):Observable<any>{
  return  this.apollo.mutate({
     mutation:Followers.unblockUser,
     variables:{
         userId:id
     }
  });

  }
  blockCompany(companyId:string){
    this.apollo.mutate({
      mutation:Followers.BlockCompany,
      variables:{
        companyId
      }
    }).subscribe(({ data }) => {
    })
  }

  followCompany(companyId: string) {
    this.apollo
      .mutate({
        mutation: Followers.FollowCompany,
        variables: {
          companyId
        }
      })
      .subscribe();
  }

  followUser(id) {
    this.apollo
      .mutate({
        mutation: Followers.Follow,
        variables: {
          userId: id
        }
      })
      .subscribe();
  }
  removeFromFavourites(id):Observable<any>{
  return this.apollo
    .mutate({
      mutation: Followers.removeFromFavourites,
      variables: {
        userId: id
      }
    })



  }
  unfollow(id) {
    this.apollo
      .mutate({
        mutation: Followers.Unfollow,
        variables: {
          userId: id
        }
      })
      .subscribe();
  }

  askRecomendation(variables: object): Observable<any> {
   return  this.apollo
      .mutate({
        mutation: graphQlRecommendation.AskRecommendation,
        variables
      })

  }
  writeRecommendation(variables: object): Observable<any> {
  return  this.apollo
      .mutate({
        mutation: graphQlRecommendation.WriteRecommendation,
        variables
      })

  }

  ignoreRequest(id: string): Observable<any> {
   return this.apollo    
      .mutate({    
        mutation: graphQlRecommendation.IgnoreRecommendationRequest,
        variables: {
          id: id               
        }
      })
 
  }

  setVisibility(id:string, is_visible:boolean): Observable<any>{
     return this.apollo
          .mutate({
            mutation:graphQlRecommendation.SetVisibilityRecommendation,
            variables:{
              id,
              is_visible
            }
          }) 
        }
      
  
    askRecommendation(id:string,text:string):Observable<any>{

     return this.apollo.mutate({
      mutation:graphQlRecommendation.AskRecommendation,
      variables:{
      "user_id":id,
      'text':text
       }
    })
  }
  unblockCompany(id):Observable<any>{
   return this.apollo.mutate({
     mutation:graphQlRecommendation.unblockCompany,
      variables:{
        companyId:id
      }
   });
  }
  

  /**
   * 
   * @param companyId 
   * @param userId 
   */
  followCompanyUser(companyId:any,userId:string):Observable<any>{
      
        return this.apollo.mutate({
             mutation:Followers.followCompanyUser,
              variables:{
                 companyId,
                 userId
              }
        })
   }

   unfollowCompanyUser(companyId:any,userId:string):Observable<any>{
      
    return this.apollo.mutate({
         mutation:Followers.unfollowCompanyUser,
          variables:{
             companyId,
             userId
          }
    })
}

}

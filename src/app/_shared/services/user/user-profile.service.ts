import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject, of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { graphqlUserProfile } from '../../graphql/user-profile';
import { IInterest } from '../../models/user/interest.interface';
import { IUserConversation, ICompanyConversation } from '../../models/shared/shared.models';
import { Followers } from '../../graphql/network/followers';
import { Connections } from '../../graphql/network/connections';
import { Following } from '../../../_shared/graphql/network/following';
import { throwError } from 'rxjs';
import { map, catchError, share, tap } from 'rxjs/operators';
 



@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  data:any;
  constructor(
    private apollo:Apollo
  ) {    
   
  }

  setData(data){
     this.data = data;
  }

  get profileData(){
    return this.data;
  }

  public userProfileSource = new BehaviorSubject(null); 
  public userProfileData = this.userProfileSource.asObservable(); 

  public urlSource = new BehaviorSubject(null);
  public getUrl = this.urlSource.asObservable(); 


  portfolioEventEmitter: Subject<any> = new Subject();


  /**
   * Login 
   * 
   * @param input 
   */
  public Login(input) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlUserProfile.Login,
      variables:{ input }
    })
  }

  /**
   * Get user info 
   * @param url 
   */
  public getProfileInfo(url:string) : Observable<any> {
    return this.apollo.watchQuery({
      query:graphqlUserProfile.getUserInfo,
      variables:{ url },
    }).valueChanges
  }; 

  public getUserProfile(isAuth: boolean, url: string ) {
    let query = isAuth ? graphqlUserProfile.getProfile : graphqlUserProfile.getUnAuthProfile;

    return this.apollo
               .watchQuery({
                  fetchPolicy: 'network-only',
                  query,
                  variables: {
                  url // get url
                    }
                }).valueChanges; 
  }; 


  /**
   * Get user profile 
   * 
   * @param url 
   */
  public getProfile(url:string) : Observable<any> {
    return this.apollo.watchQuery({
      query:graphqlUserProfile.getProfile,
      variables:{ url }
    }).valueChanges
  }
  
  public getProfileByLanguage(url:string, lang: string ) : Observable<any> {
   return this.apollo.query({
      fetchPolicy:'network-only', 
      query:graphqlUserProfile.getTranslatedLanguage,
      variables:{ url , lang }
    })
  }


  /**
   * Add skils 
   * 
   * @param skills 
   */
  public addSkills(skills:any[]) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlUserProfile.addSkill,
      variables:{ skills }
    })
  }

  /**
   * Remove skills 
   * 
   * @param skill_id 
   */
  public removeSkill(skill_id:string[]) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlUserProfile.deleteSkill,
      variables:{  skill_id }
    })
  }

  /**
   * Change skills order 
   * 
   * @param skill 
   */
  public  changeSkillsOrder(skill:{ id:string , position:number }) : Observable<any>  {
    return this.apollo.mutate({
      mutation:graphqlUserProfile.ChangeOrderOfSkill,
      variables:{ skill }
    })
  }

  /**
   * Verify skill 
   * 
   * @param user_id 
   * @param skill_id 
   */
  public verifySkill(user_id:string , skill_id:string) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlUserProfile.VerifySkill,
      variables:{ user_id , skill_id }
    })
  }

  /**
   * Unverify skill 
   * 
   * @param user_id 
   * @param skill_id 
   */
  public unVerifySkill(user_id:string , skill_id:string) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlUserProfile.UnverifySkill,
      variables:{ user_id , skill_id }
    })
  }

  /**
   * Add interest 
   * 
   * @param data 
   */
  public addInterest(data:IInterest) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlUserProfile.addInterest,
      variables:{
        input:{
          interest:data.interest,
          description:data.description
        }
      }
    })
  }

  /**
   * Edit interest 
   * 
   * @param data 
   */
  public editInterest(data:IInterest) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlUserProfile.editInterest,
      variables:{
        id:data.id,
        interest:{
          interest:data.interest,
          description:data.description
        }
      }
    })
  }

  /**
   * Remove interest 
   * 
   * @param id 
   */
  public removeInterest(id:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlUserProfile.deleteInterest,
      variables:{ id }
    })
  }

  /**
   * Remove image in interest 
   * 
   * @param id 
   */
  public removeInterestImage(id:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlUserProfile.removeImageInterst,
      variables:{ id }
    })
  }
   // languages
  public addLanguage(language:object):Observable<any>{
       return this.apollo.mutate({
           mutation:graphqlUserProfile.addLanguage,
            variables:{
              language
            }
       });
  }

  public  removeLanguage(id:string):Observable<any>{
      return this.apollo.mutate({
          mutation:graphqlUserProfile.removeLanguage,
           variables:{
              id
           }
      });
  }
  public changeLanguage(id:string,language:Object):Observable<any>{
      return this.apollo.mutate({
           mutation:graphqlUserProfile.changeKnownLanguage,
             variables:{
                 id,
                 language
             }
      });

  }
  //stroy 
   public changeStory(input:string):Observable<any>{
        return this.apollo.mutate({
            mutation:graphqlUserProfile.changeStory,
            variables:{
              input
            }
          });
      }
  // headline
  public changeHeadline(input:string):Observable<any>{
        return this.apollo.mutate({
           mutation:graphqlUserProfile.changeHeadline,
            variables:{
              input
            }
        })
     }


    /**
     * Get User Reviews 
     */
    public getReviews(user_id:string) : Observable<any> {
      return this.apollo
        .watchQuery({
          query: graphqlUserProfile.GetReviews,
          fetchPolicy:'network-only',
          variables: {
            user_id,
            pagination: {
              first: 999
            }
          }
        })
        .valueChanges
    };


    /**
     * Open message box for user
     * @param result 
     */
    public openSmallChatBox(result:IUserConversation) : Observable<any> {
      return this.apollo.mutate({
        mutation:graphqlUserProfile.CreateConversation,
        variables:{
          name:result.name,
          avatar:result.avatar,
          participants: [
            {
              id: result.id,
              is_company: false,
              is_admin: false
            }
          ]
        }
      })

    }

    /**
     * Opne message box for company 
     * @param result 
     */
    public openSmallChatBoxForComapny(result:ICompanyConversation) : Observable<any> {
      return this.apollo.mutate({
        mutation:graphqlUserProfile.CreateConversationCompany,
        variables:{
          companyId:result.companyId,
          name:result.name,
          avatar:result.avatar,
          participants: [
            {
              id: result.id,
              is_company: false,
              is_admin: false
            }
          ]
        }
      })

    }; 


    public addToolTechnology(tools_technologies:any[]) : Observable<any>{
      return this.apollo.mutate({
        mutation:graphqlUserProfile.AddToolTechnology,
        variables:{ tools_technologies }
      })
    }

    public removeToolTechnology(id:string[]) :Observable<any>{
      return this.apollo.mutate({
        mutation: graphqlUserProfile.RemoveToolTechnology,
        variables:{id}
      })
    }

    public ChangeToolTechnology(tools_technologies:any[]) : Observable<any>{
       return this.apollo.mutate({
         mutation: graphqlUserProfile.ChangeToolTechnology,
         variables:{ tools_technologies }
       })
    }

   /**
    * 
    * @param portfolio 
    */

   public addPorfolio( portfolio ) : Observable<any>{

       return this.apollo.mutate({
            mutation:graphqlUserProfile.addPortfolio,
             variables:{
                  portfolio
             }
       }).pipe(
            map( ( { data } ) => data['AddPortfolio']['id']  )
       )
    };

 

  public removePortfolio( id:string ) : Observable<any> {

     return this.apollo.mutate({
          mutation:graphqlUserProfile.removePortfolio,
           variables:{
               id
           }
      })
    }

  public getPortfolioByContentType( user_id: string, 
                                    content_type, 
                                    after: number, 
                                    first: number,
                                    company_id: (string | undefined) 
                                  ) : Observable<any> {

      return this.apollo.query({
          fetchPolicy: 'network-only',
          query: graphqlUserProfile.getUserPortfolioByContentType,
          variables: {
              user_id,
              content_type,
              pagination: {
                   first,
                   after: after.toString()
              },
              company_id
          }
      })

  };

  public changePortfolio( id: string, portfolio: any ) {
     return this.apollo.mutate({
         mutation: graphqlUserProfile.changePortfolio,
         variables: {
            id,
            portfolio
         }
     }).pipe(
        map( ({ data }) => data['ChangePortfolio']['id'] )
     )
  }

  public getUserPortfolioById( user_id: string, portfolio_id: string ): Observable<any> {

       return this.apollo.query({
           fetchPolicy: 'network-only',
           query: graphqlUserProfile.getDetailedPortfolio,
           variables: {
              user_id, 
              portfolio_id
           }
       })

  };

   public addLikesInPortfolio(company_id: string, owner_id: string, portfolio_id: string ): Observable<any> {
      
      return this.apollo.mutate({
          mutation: graphqlUserProfile.likeUserPortfolio,
          variables: {
             company_id,
             owner_id,
             portfolio_id
          }
      })
   }

   public unlikeUserInPortfolio(company_id: string, owner_id: string, portfolio_id: string ): Observable<any> {
      
    return this.apollo.mutate({
        mutation: graphqlUserProfile.unlikeUserPortfolio,
        variables: {
           company_id,
           owner_id,
           portfolio_id
        }
    })
 };

   public addCommentsInPortfolio( comment: any ): Observable<any> {
       
     return this.apollo.mutate({
        mutation: graphqlUserProfile.addCommentsInportfolio,
        variables: {
            comment
        }
     })
   };

   public getCommentsInPortfolio( portfolio_id: string , after: number, first: number = 4): Observable<any> {
     
      return this.apollo.mutate({
          mutation: graphqlUserProfile.getCommentsInPortfolio,
          variables: {
            portfolio_id,
            pagination: {
              first,
              after: after.toString()
            }
          }
      })
   };

  


   public deleteCommentPortfolio( company_id: string ,portfolio_id: string, comment_id: string ) : Observable<any> {
      
       return this.apollo.mutate({
            mutation:graphqlUserProfile.deleteCommentPortfolio,
             variables:{
                company_id,
                portfolio_id,
                comment_id
             }
       })
   }

 

  public changeOrdersInPorfolio( file:any ): Observable<any> {

      return this.apollo.mutate({
        mutation:graphqlUserProfile.changeOrdersInPorfolio,
         variables:{
                 file
         }
      })
   }

 
  
 

  // Send friend request
  SendFriendRequest(id) {
    return this.apollo
      .mutate({
        mutation: graphqlUserProfile.SendFriendRequest,
        variables: {
          "userId": id,
          "description": ""
        }
      })  
  }
  acceptFriendRequest(requestId: string): Observable<any> {
      return this.apollo
        .mutate({
          mutation: graphqlUserProfile.approveFriendRequest,
          variables: { requestId }
        })  
  }

  // * * Follow user to user * * 
  follow(userId: string) {
    return this.apollo
               .mutate({
                 mutation: Followers.Follow,
                 variables: { userId }
               }); 
  }


  // Cancel friend request  
  disconnect(id){
    return this.apollo.mutate({
      mutation: Following.Unfriend,
      variables: {
        userId: id
      }
    })
  }

// *****  Connections *****
  getConnections(userId){
    return this.apollo.watchQuery({
      query: Connections.getConnectionsOfUser,
      variables: {
        user_id: userId,
        pagination: {
          first: 999
        }
      }
    }).valueChanges 
  }

  getMutualConnectionsOfUser(userId){
    return this.apollo.watchQuery({
      query: Connections.getMutualConnectionsOfUser,
      variables: {
        user_id: userId,
        pagination: {  
          first: 999
        }
      }
    }).valueChanges.pipe(
      map((data) => data.data,
      
    )); 
  }

  // ***** Following poeple for User  *****
  getFollowsOfUser(userId){
    return this.apollo.watchQuery({
      query: Following.getFollowsOfUser,
      variables: {
        user_id: userId,
        pagination: {
          first:999
        }
      }
    }).valueChanges.pipe(
      map((data) => data.data,
      
    ));
  }

  // ***** Follower people for User  *****
  getFollowersOfUser(userId){
    return this.apollo.watchQuery({
      query: Followers.getFollowersOfUser,
      variables:{
        user_id: userId,
        pagination:{
          first:999
        }
      }
    }).valueChanges.pipe(
      map((data) => data.data,
     
    ));
  }

  // ***** Following Companies Of user  *****
  getFollowsCompaniesOfUser(userId){
    return this.apollo.watchQuery({
      query: Following.getFollowsCompaniesOfUser,
      variables: {
        user_id: userId,
        pagination:{
          first: 999
        }
      }
    }).valueChanges.pipe(
      map((data) => data.data,
     
    ));
  }

  // ***** Follower Companies Of user  *****
  getFollowersCompaniesOfUser(userId){
    return this.apollo.watchQuery({
      query: Followers.getFollowersCompaniesOfUser,
      variables: {
        user_id: userId,
        pagination: {
          first: 999
        }
      }
    }).valueChanges.pipe(
      map((data) => data.data,
      
    ));
  }

  saveCounterPorfolio( owner_id: string, portfolio_id: string ): Observable<any> {

      return this.apollo.mutate({
           mutation: graphqlUserProfile.AddSavedCountToPortfolio,
           variables: {
            owner_id,
            portfolio_id
           }
      })
  };

  AddViewCountToPortfolio( company_id: ( string | undefined ), owner_id: string, portfolio_id: string ): Observable<any> {

     return this.apollo.mutate({
          mutation: graphqlUserProfile.AddViewCountToPortfolio,
          variables: {
            company_id,
            owner_id,
            portfolio_id,
          }  
     });
  };

  getPortfolioStatistics( user_id: string ) : Observable<any> {
      return this.apollo.query({
          query: graphqlUserProfile.GetPortfolioInfo, 
          variables: {
               user_id
          }
      }).pipe(
          map( ({ data }) => data['GetUserPortfolioInfo'] )
      )
  }
   

};

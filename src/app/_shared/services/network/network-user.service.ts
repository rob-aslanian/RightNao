import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { NetworUser } from '../../graphql/network/network-user';
import { map } from 'rxjs/operators';
import { filter } from 'minimatch';

@Injectable({
  providedIn: 'root'
})

export class NetworkUserService {

  constructor(
        private apollo:Apollo
  ) { }

  /**
   * @param 
   * network services starts
   * 
   * 
   */

   public  getInvitations():Observable<any>{

        return this.apollo.watchQuery({

            fetchPolicy:'network-only',
              query:NetworUser.getInvitations,

        }).valueChanges
  
    }
    /**
     * 
     * @param user_id 
     */
   public getUserInfo(user_id:string):Observable<any>{
   
       return this.apollo.watchQuery({

            fetchPolicy:'network-only',
               query:NetworUser.getUserInfo,
                  variables:{
                    user_id
                  }

       }).valueChanges
    } 
    /**
     * 
     * @param email 
     * @param name 
     * 
     */
   public SentEmailInvitation(email:string,name:string):Observable<any>{
        
      return this.apollo.mutate({
             
             mutation:NetworUser.SentEmailInvitationUser,
              variables:{
                 email,
                 name
            } 
      })
   }
   /**
    * 
    * @param name 
    * @param avatar 
    * @param participants 
    */

   public CreateConversationUser(name:string,avatar:string,participants:Object):Observable<any>{

      return this.apollo.mutate({
              
            mutation:NetworUser.CreateConversationUser,
             variables:{
                name,
                avatar,
                participants
             }
         })
      }
  
  /**
   * 
   * network connections 
   */
   public getCategoryTree():Observable<any>{

   return   this.apollo.watchQuery({
            fetchPolicy: "network-only",
            query: NetworUser.getCategoryTree, 
            variables: {}
     }).valueChanges

   }


   /**
    * 
    * @param query 
    * @param category 
    * @param sort_by 
    */

  public getFriendships( query ,category ,sort_by):Observable<any>{

     return this.apollo.query({
          fetchPolicy:'network-only',
          query:NetworUser.getFriendships,
          variables: {
             query,
             category,
             sort_by,
          }
     })
   } 
   
   
   public getContactInfo(  ): Observable<any> {
        
      return this.apollo.watchQuery({
            fetchPolicy: 'network-only',
            query: NetworUser.getConnectionInfo
      }).valueChanges.pipe(
         map( ( { data } ) => data['getFriendships'] )
      )

   }

   public getContacts( query ,category ,sort_by, isContact: boolean):Observable<any>{

    return this.apollo.query({
         fetchPolicy:'no-cache',
         query:NetworUser.getFriendships,
         variables: {
            query,
            category,
            sort_by,
         }
    })    
    .pipe(
      map(  ({ data }) => data['getFriendships'].filter(item => {
            if( isContact ) {
                 return item.status == "Approved" && item.categories.length 
            } else  {
                return  item.status == "Approved" && !item.categories.length    
            }
      }))
     )
  }  

 


   
  /**
   * 
   * @param name 
   * @param parent 
   */
 public createCategories(name,parent):Observable<any>{

      return  this.apollo.mutate({
                mutation: NetworUser.createCategories,
                variables: {
                  name,
                  parent
                }
            })
        }
  
   /**
    * 
    * @param name 
    * @param parent 
    */
  public RemoveCategory(name,parent):Observable<any>{

      return this.apollo.mutate({
            mutation: NetworUser.RemoveCategory,
            variables: {
              name,
              parent 
            }
          })
        }

   /**
    * 
    * @param userIds 
    */
  public BatchRemoveFromCategory(userIds):Observable<any>{

    return this.apollo.mutate({
          mutation: NetworUser.BatchRemoveFromCategory,
          variables: {
            userIds,
            category_name: "",
            all: true
          }
        })
      }

  
  /**
   * 
   * @param userId 
   */
    public Unfriend(userId:string):Observable<any>{

      return  this.apollo.mutate({
            mutation: NetworUser.Unfriend ,
              variables: {
              userId
        }
      })
  }

  public getFriendSuggestions( first:number, after: string ) : Observable<any> {
    return this.apollo.watchQuery({
      query:NetworUser.getFriendSuggestions,
      fetchPolicy:'network-only',
      variables : {
          pagination: {
            first,
            after
          }
      }
    }).valueChanges.pipe(
       map( ({ data }) => data['getFriendSuggestions'].map( ( {user_profile} )  => user_profile ) )
    )

  }


  /**
   * Get muttural connections 
   * 
   * @param user_id 
   */
  public getMutualConnectionsOfUser(user_id:string) : Observable<any> {
    return this.apollo.watchQuery({
      query:NetworUser.getMutualConnectionsOfUser,
      variables:{ user_id }
    }).valueChanges
  }
  /**
   * 
   * get suggest companies for user network
   */
  
  public getSuggestedCompanies( first:number, after: string ) : Observable<any>{
 
      return this.apollo.query({
          fetchPolicy:'network-only',
          query:NetworUser.getSuggestedCompanies,
          variables: {
              pagination: {
                  first,
                  after
              }
          }

      })
  };

  public getFriendSuggestionsPag( after: number ) : Observable<any> {
    return this.apollo.watchQuery({
      query:NetworUser.getFriendSuggestions,
        fetchPolicy:'network-only',
        variables : {
            pagination: {
              first:   3,
              after:   after.toString()
            }
        }
      }).valueChanges

  }

  public getSuggestedCompaniesPag( after: number ) : Observable<any>{
 
    return this.apollo.watchQuery({
        fetchPolicy: 'network-only',
        query:NetworUser.getSuggestedCompanies,
        variables: {
            pagination: {
                first:  3,
                after: after.toString()
            }
        }

    }).valueChanges
}
  

  /**
   * 
   * @param companyId 
   * follow suggested Companies as user
   */
  public followCompanyUser( companyId:string ) : Observable<any>{
  
      return this.apollo.mutate({
        mutation:NetworUser.FollowCompany,
         variables:{
             companyId
         }

      })
  }

  /**
   * 
   * @param userId 
   */
  public sendFriendRequest( userId: string ): Observable<any> {
   
      return this.apollo.mutate({
       mutation:NetworUser.SendFriendRequest,
        variables:{
             userId
        }
      })



  }
/**
 * 
 * @param userId 
 */
  public followUser( userId: string ): Observable<any>{
     
     return this.apollo.mutate({
      mutation:NetworUser.followUser,
       variables:{
          userId
       }
     })

  }
/**
 * 
 * @param userId 
 */
  public unfollowUser( userId: string ): Observable<any>{
     
    return this.apollo.mutate({
     mutation:NetworUser.unfollowUser,
      variables:{
         userId
      }
    })

 }

 /**
  * 
  * @param query 
  */
 public getFollowingsPeople( query: string ): Observable<any> {

   return  this.apollo.watchQuery({
              fetchPolicy: "network-only",
              query: NetworUser.getFollowingsPeople,
              variables: {
                "query":query,
                "category": "",
                "letter": "",
                "sort_by": "recently_added",
                "companies": []
              }
            }).valueChanges
            
 }
 public getFollowingsCategoryTree(): Observable<any>{
  
    return this.apollo.watchQuery({
              fetchPolicy: "network-only",
              query: NetworUser.GetFollowingsCategoryTree,
              variables: {}
            }).valueChanges
 }
 

 /**
  * 
  * @param query 
  * @param category 
  * @param sort_by 
  */
 public getFollowingCompanies( query, category, sort_by ): Observable<any> {

    return this.apollo.watchQuery({
      fetchPolicy: "network-only",
      query: NetworUser.getFollowingCompanies,
      variables: {
        "query":query,
        "category": category,
        "letter": "",
        "sort_by": sort_by
      }
    }).valueChanges

 }

 /**
  * 
  * @param name 
  * @param parent 
  */
 public CreateFollowingsCategory( name, parent ): Observable<any> {

    return  this.apollo.mutate({
              mutation: NetworUser.CreateFollowingsCategory,
              variables: {
                name,
                parent
              }
            })

 }

 /**
  * 
  * @param name 
  * @param parent 
  */
 public RemoveFollowingsCategory( name, parent ): Observable<any> {

    return this.apollo.mutate({
              mutation: NetworUser.RemoveFollowingsCategory,
              variables: {
                   name,
                   parent
                }
            })

 }

 /**
  * 
  * @param companyIds 
  */
 public BatchRemoveFromFollowingsCategory(companyIds): Observable<any> {

    return   this.apollo.mutate({
                mutation: NetworUser.BatchRemoveFromFollowingsCategory,
                variables: {
                  companyIds,
                  category_name: "",
                  all: true
                }
              })

    }

    /**
     * 
     * @param companyId 
     */
 public unfollowCompany( companyId: string ): Observable<any> {
   
     return this.apollo.mutate({
              mutation:NetworUser.UnfollowCompany,
               variables:{
                  companyId
               }
          })

  }

  /**
   * 
   * @param query 
   */
 public getFollowers( query ): Observable<any> {
   
  return this.apollo.watchQuery({
    fetchPolicy: "network-only",
            query: NetworUser.getFollowers,
            variables: {
              "query":query,
              "category": "",
              "letter": "",
              "sort_by": "recently_added",
              "companies": []
            }
          }).valueChanges

    }

/**
 * 
 * @param query 
 */
    public getFollowerCompanies( query: string ): Observable<any> {
   
      return   this.apollo.watchQuery({
                  fetchPolicy: "network-only",
                  query: NetworUser.getFollowerCompanies,
                  variables: {
                    query,
                    "sort_by": "recently_added"
                  }
                }).valueChanges
  
    
        }
    
    public getFriendRequests( sent: boolean ): Observable<any> {

      return   this.apollo.watchQuery({
                  fetchPolicy: "network-only",
                  query: NetworUser.getFriendRequests,
                  variables: {
                    status: "Requested",
                    sent
                  }
                })
            .valueChanges
  
        }
/**
 * 
 * @param requestId 
 */
    public approveFriendRequest( requestId: string  ): Observable<any> {

      return    this.apollo.mutate({
                    mutation: NetworUser.approveFriendRequest,
                    variables: {
                      requestId 
                    }
             })
         }

   public ignoreFriendRequest( requestId: string  ): Observable<any> {

        return    this.apollo.mutate({
                      mutation: NetworUser.ignoreFriendRequest,
                      variables: {
                        requestId 
                      }
                })
            }

   public getFriendshipsForBox() : Observable<any> {
         
       return this.apollo.watchQuery({
                query:NetworUser.getFriendshipsForInfoBox
              }).valueChanges

   }


   // Connection Categories

   public addToCategories( userId: string, category_name: string ): Observable<any> {
      
      return this.apollo.mutate({
          mutation: NetworUser.addToCategory,
          variables: {
              userId,
              category_name
          }
      })
   }

   public removeFromCategories( userId: string, category_name: string ): Observable<any> {

     return this.apollo.mutate({
         mutation: NetworUser.removeFromCategory,
         variables: {
          userId,
          category_name
         }
     })
   }
}


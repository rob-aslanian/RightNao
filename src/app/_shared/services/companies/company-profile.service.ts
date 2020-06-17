import { Injectable } from '@angular/core';
import { IMilestone } from '../../models/company/milestone.interface';
import { Apollo } from 'apollo-angular';
import { Observable, throwError } from 'rxjs';
import { graphqlCompanyProfile } from '../../graphql/company-profile';
import { IFounder } from '../../models/company/founders.interface';
import { Followers } from '../../graphql/network/followers';
import { graphqlUserProfile } from '../../graphql/user-profile';
import { IProduct } from '../../models/company/product.interface';
import { IService } from '../../models/company/services.interface';
import { IAward } from '../../models/company/awards.interface';
import { graphQlRecommendation } from '../../graphql/recommendation/recomendations';
import { graphqlShared } from '../../graphql/shared/base-data';
import { ICompanyConversation } from '../../models/shared/shared.models';
import { catchError, map } from 'rxjs/operators';
import { Followers as FollowersCompany } from 'src/app/_shared/graphql/network-company/followers';
import { Following } from '../../graphql/network-company/following';
import { Following as FollowingCompany } from 'src/app/_shared/graphql/network-company/following'
import { BenefitType } from '../../models/jobs/jobs.interface';
"src\app\_shared\graphql\network\following.ts"; 

@Injectable({
  providedIn: 'root'
})
export class CompanyProfileService {
 
  constructor(
    private apollo:Apollo,
    
   
  ) { }


  /**
   * Get changed lang 
   * 
   * @param url 
   * @param lang 
   */
  public getCompanyTranslation(url: string, lang: string ) : Observable<any> {
    return this.apollo.query({
      fetchPolicy:'network-only',
      query:graphqlCompanyProfile.GetTranslationCompanyProfile,
      variables:{ url , lang },
      
    })
  
    .pipe(map(({data}) => data['GetCompanyProfile']))
  }

  /**
   * Add to favorites 
   * 
   * @param companyId 
   */
  public addComapnyToFavorite(companyId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:Followers.AddCompanyToFavourites,
      variables: { companyId }
    })
  }

  /**
   * Remove From favorites 
   * 
   * @param companyId 
   */
  public removeComapnyFromFavorite(companyId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:Followers.RemoveCompanyFromFavourites,
      variables: { companyId }
    })
  }

  /**
   * Follow Company 
   * 
   * @param companyId 
   */
  public followCompany(companyId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:Followers.FollowCompany,
      variables: { companyId }
    })
  }

  /**
   * Unfollow company 
   * 
   * @param companyId 
   */
  public unfollowCompany(companyId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:Followers.UnfollowCompany,
      variables: { companyId }
    })
  }
  /**
   * Add milestone 
   * 
   * @param company_id 
   * @param input 
   */
  public addMileStone(company_id:string , input:IMilestone) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlCompanyProfile.addMilestone,
      variables: { company_id , input  }
    })
  }

  /**
   * Edit milestone 
   * 
   * @param company_id 
   * @param input 
   */
  public editMilestone(company_id:string , changes:IMilestone) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlCompanyProfile.editMilestone,
      variables: { company_id , changes  }
    })
  }

  /**
   * Remove milestone 
   * 
   * @param company_id 
   * @param id 
   */
  public removeMileStone(company_id:string , id ) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlCompanyProfile.deleteMilestone,
      variables:{ company_id , id  }
    })
  }

  /**
   * Delete image in milestone 
   * 
   * @param company_id 
   * @param id 
   */
    public removeImageInMilestone(company_id:string , id ) : Observable<any>{
      return this.apollo.mutate({
        mutation:graphqlCompanyProfile.deleteImageinMilestone,
        variables:{  company_id , id}
      })
    }


  /**
   * Search all users 
   * 
   * @param keywords 
   */
    public  searchUsers(full_name:string) : Observable<any> {
      return this.apollo.watchQuery({
        query:graphqlCompanyProfile.searchUsers,
        variables:{ full_name }
      }).valueChanges
    }

    /**
     * Add founder
     * 
     * @param company_id 
     * @param input 
     */
    public addFounder(company_id:string , input:IFounder) : Observable<any> {
      return this.apollo.mutate({
        mutation:graphqlCompanyProfile.addFounder,
        variables:{ company_id , input }
      })
    }

    /**
     * Edit founder
     * 
     * @param company_id 
     * @param changes 
     */
    public editFounder(company_id:string, changes:IFounder) : Observable<any>{
      return this.apollo.mutate({
        mutation:graphqlCompanyProfile.editFounder,
        variables:{  company_id , changes}
      })
    }
    
    public  searchUsersList(input:Object) : Observable<any> {
      return this.apollo.watchQuery({
        query:graphqlShared.searchUsersDetail,
        fetchPolicy:'network-only',
        variables:{
          input
        }
      }).valueChanges
    }

    /**
     * Delete founder
     *      
     * @param company_id 
     * @param id 
     */
    public removeFounder(company_id:string, id:string) : Observable<any>{
      return this.apollo.mutate({
        mutation:graphqlCompanyProfile.deleteFounder,
        variables:{  company_id , id}
      })
    }

    /**
     * Add company review 
     * 
     * @param input 
     */
    public addCompanyReview(input){
      return this.apollo.mutate({
        mutation:graphqlCompanyProfile.addCompanyReview,
        variables:input
      })
   }

  
   /**
    * Add product 
    * 
    * @param company_id 
    * @param input 
    */
    public addProduct(company_id:string, input:IProduct) : Observable<any>{
      return this.apollo.mutate({
        mutation:graphqlCompanyProfile.addProduct,
        variables:{  company_id , input}

      })
    }

   /**
    * Edit product
    * 
    * @param company_id 
    * @param changes 
    */
    public editProduct(company_id:string, changes:IProduct) : Observable<any>{
      return this.apollo.mutate({
        mutation:graphqlCompanyProfile.editProduct,
        variables:{  company_id , changes}

      })
    }

  /**
   * Remove product 
   * 
   * @param company_id 
   * @param id 
   */
    public removeProduct(company_id: string , id:string) : Observable<any> {
      return this.apollo.mutate({
        mutation:graphqlCompanyProfile.deleteProduct,
        variables:{  company_id , id}

      })
    }

    /**
     * Remove image in product
     * @param company_id 
     * @param id 
     */
    public removeImageInProduct(company_id:string , id ) : Observable<any>{
      return this.apollo.mutate({
        mutation:graphqlCompanyProfile.RemoveProductImage,
        variables:{  company_id , id}
      })
    }


      /**
      * Add Service 
      * 
      * @param company_id 
      * @param input 
      */
    public addService(company_id:string, input:IService) : Observable<any>{
      return this.apollo.mutate({
        mutation:graphqlCompanyProfile.addService,
        variables:{  company_id , input}

      })
    }

  /**
    * Edit service
    * 
    * @param company_id 
    * @param changes 
    */
    public editService(company_id:string, changes:IService) : Observable<any>{
            return this.apollo.mutate({
        mutation:graphqlCompanyProfile.editService,
        variables:{  company_id , changes}

      })
    }

  /**
   * Remove service 
   * 
   * @param company_id 
   * @param id 
   */
    public removeService(company_id: string , id:string) : Observable<any> {

      return this.apollo.mutate({
        mutation:graphqlCompanyProfile.deleteService,
        variables:{  company_id , id}

      })
    }

    /**
     * Remove image in service
     * @param company_id 
     * @param id 
     */
    public removeImageInService(company_id:string , id ) : Observable<any>{

      return this.apollo.mutate({
        mutation:graphqlCompanyProfile.removeServiceImage,
        variables:{  company_id , id}
      })
    }

     /**
      * Add Award 
      * 
      * @param company_id 
      * @param input 
      */
     public addAward(company_id:string, input:IAward) : Observable<any>{

      return this.apollo.mutate({
        mutation:graphqlCompanyProfile.addAward,
        variables:{  company_id , input}

      })
    }

  /**
    * Edit award
    * 
    * @param company_id 
    * @param changes 
    */
    public editAward(company_id:string, changes:IService) : Observable<any>{
      return this.apollo.mutate({
        mutation:graphqlCompanyProfile.editAward,
        variables:{  company_id , changes}

      })
    }

  /**
   * Remove service 
   * 
   * @param company_id 
   * @param id 
   */
    public removeAward(company_id: string , id:string) : Observable<any> {
      return this.apollo.mutate({
        mutation:graphqlCompanyProfile.deleteAward,
        variables:{  company_id , id}

      })
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
     * Unblock 
     * 
     * @param id 
     */

    unblockCompany(id):Observable<any>{
      return this.apollo.mutate({
        mutation:graphQlRecommendation.unblockCompany,
        variables:{
          companyId:id
        }
      });

  }

  /**
   * Get company review 
   * 
   * @param company_id 
   */
  public getReviews(company_id:string) : Observable<any> {
    return this.apollo
      .watchQuery({
        query: graphqlCompanyProfile.GetCompanyReviews,
        fetchPolicy:'network-only',
        variables: {
          company_id,   
        }
      })
      .valueChanges
    };


     /**
   * Get company rate  
   * 
   * @param company_id 
   */

    public getCompanyRate(company_id: string) : Observable<any> {
      return this.apollo
      .watchQuery({
        query: graphqlCompanyProfile.GetCompanyRate,
        fetchPolicy:'network-only',
        variables: {
          company_id,   
        }
      })
      .valueChanges
    }

    public getAmountOfEachRate(company_id: string) : Observable<any> {
      return this.apollo
      .watchQuery({
        query: graphqlCompanyProfile.GetAmountOfEachRate,
        fetchPolicy:'network-only',
        variables: {
          company_id,   
        }
      })
      .valueChanges
    };

   addCompanyAdmin(input):Observable<any>{ 
      return this.apollo.mutate({
        mutation:graphQlRecommendation.addCompanyAdmin,
         variables:input
      })
   }

   deleteCompanyAdmin(input:Object):Observable<any>{
      return this.apollo.mutate({
        mutation:graphQlRecommendation.deleteCompanyAdmin,
         variables:input
      });
   }

   checkPassword(password):any{
    return this.apollo.watchQuery({
      query:graphQlRecommendation.checkPassword,
      variables:{
        password
      }
    }).valueChanges
   }

   public  getUsers() : Observable<any> {
    return this.apollo.watchQuery({
      query:graphqlCompanyProfile.searchUsers,
      variables:{
         full_name:''  
     }
    }).valueChanges
  }

  //***  Get Follower people for company profile ***
  getFollowersOfCompany(companyId){
    return this.apollo.watchQuery({
      query: FollowersCompany.getFollowersOfCompany,
      variables:{
        user_id: companyId,
        pagination:{
          first: 999
        }
      }
    }).valueChanges 
  }

  //*** Get Follower companies for company profile ***
  getFollowersCompaniesOfCompany(companyId){
    return this.apollo.watchQuery({
      query: FollowersCompany.getFollowersCompaniesOfCompany,
      variables: {
        user_id: companyId,
        pagination: {
          first:999
        }
      }
    }).valueChanges.pipe(
      map((data) => data.data,
  
    ));
  }


    //*** Get Following companies for company profile ***
    getFollowsCompaniesOfCompany(companyId){
      return this.apollo.watchQuery({
        query: FollowingCompany.getFollowsCompaniesOfCompany,
        variables: {
          user_id: companyId,
          pagination: {
            first: 999
          }
        }
      }).valueChanges.pipe(
        map((data) => data.data,
      ));
    }

    //*** Get Following People for company profile ***
    getFollowsOfCompany(companyId){
      return this.apollo.watchQuery({
        query: FollowingCompany.getFollowsOfCompany,
        variables:{
          user_id: companyId,
          pagination:{
            first: 999
          }
        }
      }).valueChanges.pipe(
        map((data) => data.data,
       
      ));
    }

    followCompanyInCompany(companyId:string,followId:string):Observable<any>{
        return this.apollo.mutate({
          mutation:FollowingCompany.followCompanyInCompany,
            variables:{
                companyId,
                followId

            }
        }) 
    }

    unfollowCompanyInCompany(companyId:string,followId:string):Observable<any>{
      return this.apollo.mutate({
        mutation:FollowingCompany.UnfollowCompanyForCompany,
          variables:{
              companyId,
              followId

          }
      }) 
    } 

    /**
     * Change company benefits 
     * 
     * @param company_id 
     * @param benefits 
     */
    public ChangeCompanyBenefits(company_id:string , benefits:BenefitType[]) : Observable<any>{
      return this.apollo.mutate({
        mutation:graphqlCompanyProfile.ChangeCompanyBenefits,
        variables:{
          company_id,
          benefits
        }
      })
    }

}

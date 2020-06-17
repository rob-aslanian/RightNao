import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { IUserProfileTranslation, IUserExperienceTranslation, IUserEducationTranslation, IUserInterestTranslation, IUserPortfolioTranslation, IUserToolsTranslation, IUserSkillTranslation, IUserAccomplishmentTranslation, ICompanyProfileTranslation, ICompanyMilestoneTranslation, ICompanyAwardTranslation } from '../../models/profile-langs/profileLangs.model';
import { graphqlProfileLangs } from '../../graphql/shared/profile-langs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileLangsService {

  constructor(
    private apollo:Apollo
  ) { }

  //// User ////

  /**
   * Save user profile translation 
   * 
   * @param languageID 
   * @param translations 
   */
  public SaveProfileTranslation(languageID:string , translations:IUserProfileTranslation) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlProfileLangs.SaveProfileTranslation,
      variables:{ languageID ,  translations },
      
    })
  }

  /**
   * Save user experience translation
   * 
   * @param languageID 
   * @param translations 
   */
  public SaveUserExperienceTranslation(languageID:string , translations:IUserExperienceTranslation) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlProfileLangs.SaveUserExperienceTranslation,
      variables:{ languageID ,  translations }
    })
  }

  /**
   * Save user education translation 
   * 
   * @param languageID 
   * @param translations 
   */
  public SaveUserEducationTranslation(languageID:string , translations:IUserEducationTranslation) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlProfileLangs.SaveUserEducationTranslation,
      variables:{ languageID ,  translations }
    })
  }

  /**
   * Save user interest translation
   * 
   * @param languageID 
   * @param translations 
   */
  public SaveUserInterestTranslation(languageID:string , translations:IUserInterestTranslation) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlProfileLangs.SaveUserInterestTranslation,
      variables:{ languageID ,  translations }
    })
  }

  /**
   * Save user portfolio translation
   * 
   * @param languageID 
   * @param translations 
   */
  public SaveUserPortfolioTranslation(languageID:string , translations:IUserPortfolioTranslation) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlProfileLangs.SaveUserPortfolioTranslation,
      variables:{ languageID ,  translations }
    })
  }

  /**
   * Save user tools translation 
   * 
   * @param languageID 
   * @param translations 
   */
  public SaveUserToolTechnologyTranslation(languageID:string , translations:IUserToolsTranslation) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlProfileLangs.SaveUserToolTechnologyTranslation,
      variables:{ languageID ,  translations }
    })
  }

  /**
   * Save user sklll translation 
   * 
   * @param languageID 
   * @param translations 
   */
  public SaveUserSkillTranslation(languageID:string , translations:IUserSkillTranslation) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlProfileLangs.SaveUserSkillTranslation,
      variables:{ languageID ,  translations }
    })
  }

  /**
   * Save user accomplishment translation 
   * 
   * @param languageID 
   * @param translations 
   */
  public SaveUserAccomplishmentTranslation(languageID:string , translations:IUserAccomplishmentTranslation) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlProfileLangs.SaveUserAccomplishmentTranslation,
      variables:{ languageID ,  translations }
    })
  }


  //// Company ///

  /**
   * Save company profile translation 
   * 
   * @param company_id 
   * @param translations 
   */
  public SaveCompanyProfileTranslation(company_id:string , translations:ICompanyProfileTranslation) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlProfileLangs.SaveCompanyProfileTranslation,
      variables:{ company_id ,  translations }
    })
  }

  /**
   * Save company milestone translation 
   * 
   * @param company_id 
   * @param languageID 
   * @param translations 
   */
  public SaveCompanyMilestoneTranslation(company_id:string , languageID:string , translations:ICompanyMilestoneTranslation) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlProfileLangs.SaveCompanyMilestoneTranslation,
      variables:{ company_id , languageID , translations }
    })
  }


  /**
   * Save company award translation 
   * 
   * @param company_id 
   * @param languageID 
   * @param translations 
   */
  public SaveCompanyAwardTranslation(company_id:string , languageID:string , translations:ICompanyAwardTranslation) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlProfileLangs.SaveCompanyAwardTranslation,
      variables:{ company_id , languageID , translations }
    })
  }

}

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { IAddExperience } from '../../models/user/experience.interface';
import { graphqlUserProfile } from '../../graphql/user-profile';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserExperienceService {

  constructor(
    private apollo:Apollo
  ) { }


  /**
   * Add experience 
   * 
   * @param experience 
   */
  public addExperience(experience:IAddExperience) : Observable<any>{
    return this.apollo.mutate({
        mutation:graphqlUserProfile.addExperience,
        variables:{ experience }
      })
  }

  /**
   * Edit experience 
   * 
   * @param id 
   * @param experience 
   */
  public editExperience(id:string, experience:IAddExperience) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlUserProfile.editExperience,
      variables:{ 
        id,
        experience
      }
    })
  }


  /**
   * Delete Experience 
   * 
   * @param id 
   */
  public deleteExperience(id:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlUserProfile.deleteExperience,
      variables:{ id }
    })
  }


}

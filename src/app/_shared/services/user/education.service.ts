import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { graphqlUserProfile } from '../../graphql/user-profile';
import { IEducation } from '../../models/user/education.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  constructor(
    private apollo:Apollo
  ) { }


  public addEducation(education:IEducation) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlUserProfile.addEducation,
      variables:{ education }
    })
  }

  public editEducation(id:string, education:IEducation) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlUserProfile.editEducation,
      variables: { id , education }
    })
  }

  public removeEducation(id:string) :Observable<any>{
     return this.apollo.mutate({
       mutation:graphqlUserProfile.deleteEducation,
       variables: { id }
     })
  }
}

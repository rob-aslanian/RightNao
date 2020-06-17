import { Injectable } from '@angular/core';
import { ICareerInterest } from 'src/app/jobs/models/userJobs.model';
import { Observable, throwError } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { graphqlJobForUser } from '../../graphql/jobs/jobs-for-users';
import { graphqlUserProfile } from '../../graphql/user-profile';
import { IApplyJob } from '../../models/jobs/applyJob.interface';
import { catchError, map } from 'rxjs/operators';
import { GlobalUserProService } from '../global-user-pro.service';

@Injectable({
  providedIn: 'root'
})
export class UserJobsService {

  private _newOpp:boolean = false;

  constructor(
    private apollo:Apollo,
    private globalService:GlobalUserProService
  ) { }


  set newOpp(val:boolean)  {
    this._newOpp = val;
  }

  get newOpp() : boolean {
    return this._newOpp;
  }


  /**
   * Get user profile 
   * 
   * @param url 
   */
  public getProfile(url:string) : Observable<any> {
    return this.apollo.watchQuery({
      query:graphqlJobForUser.getUserProfile,
      variables:{ url }
    })
    .valueChanges

  }

  /**
   * Get All job 
   */
  public getAllJob(country?:string[] , keywords?: string[] ) : Observable<any> {
    return this.apollo.watchQuery({
      query:graphqlJobForUser.getAllJob,
      fetchPolicy:'network-only',
      variables:{ keywords , country }
    })
    .valueChanges
  
  }

  /**
   * Get profile for job matching 
   */
  public getProfileForMatching() : Observable<any> {
    let user_id = this.globalService.getProfileId();

    return this.apollo.query({
      query:graphqlJobForUser.getProfileForJobMatcher,
      variables:{ user_id },
      fetchPolicy:'network-only'
    })
    .pipe(map(({data}) => data['getProfileByID']))
  }
  /**
   * Get job profile (career interest)
   */
  public getJobProfile() : Observable<any> {
    return this.apollo.query({
      query:graphqlJobForUser.GetJobProfile,
      fetchPolicy:'network-only'
       
    })
    .pipe(map(({data}) => data['GetJobProfile']))
    
  }
  /**
   * Set career interests
   * 
   * @param interests 
   */
  public setCareerInterests(interests:ICareerInterest) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlJobForUser.SetCareerInterests,
      variables:{ interests}
    })
  
  }

  /**
   * Set flag open in career interest
   * 
   * @param open 
   */
  public setFlagOpen(open:boolean) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlJobForUser.SetOpenFlag,
      variables:{ open }
    })
    
  }

  /**
   * Get user companies 
   */
  public getMyCompanies() : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlUserProfile.getMyCompany,
    })
    .valueChanges
   
  }

  /**
   * Get reccomended jobs 
   */
  public getReccomendedJobs(first:number = 3 , after:string = "0") : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlJobForUser.GetRecommendedJobs,
      variables: { 
        pagination:{
          first , 
          after
        }
       },
      fetchPolicy:"network-only"
    })
    .valueChanges
    .pipe(map(({data}) => data['GetRecommendedJobs']))
    
  }

  /**
   * Get saved jobs 
   */
  public getSavedJobs() : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlJobForUser.GetSavedJobs,
      fetchPolicy:'network-only'
    })
    .valueChanges
   
  }

  /**
   * Get Skipped jobs 
   */
  public getSkippedJobs() : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlJobForUser.GetSkippedJobs,
      fetchPolicy:'network-only'
    })
    .valueChanges
   
  }

  /**
   * Get Applied jobs 
   */
  public getAppliedJobs() : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlJobForUser.GetAppliedJobs,
      fetchPolicy:'network-only'
    })
    .valueChanges
   
  }

  /**
   * Get invited jobs 
   */
  public getInvitedJobs() : Observable<any> {
    return this.apollo.watchQuery({
      query:graphqlJobForUser.getInvitedJobs,
      fetchPolicy:'network-only'
    })
    .valueChanges
   
  }


  /**
   * Apply job 
   * 
   * @param application 
   */
  public applyJob(application:IApplyJob) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlJobForUser.ApplyJob,
      variables: { application }
    })
  }

  /**
   * Report job
   * 
   * @param jobId 
   * @param text 
   */
  public reportJob(jobId:string , type:any ,  text: string) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlJobForUser.ReportJob,
      variables: {  jobId , type , text}
    })
     
  }
  

  

  /**
   * Skip job 
   * 
   * @param jobId 
   */
  public skipJob(jobId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlJobForUser.SkipJob,
      variables:{ jobId }
    })
    
  }

  /**
   * Unskip job 
   * 
   * @param jobId 
   */
  public unskipJob(jobId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlJobForUser.UnskipJob,
      variables:{ jobId }
    })
   
  }

  /**
   * Save job 
   * 
   * @param jobId 
   */
  public saveJob(jobId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlJobForUser.SaveJob,
      variables:{ jobId }
    })
     
  }

  /**
   * Unsave job 
   * 
   * @param jobId 
   */
  public unsaveJob(jobId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlJobForUser.UnsaveJob,
      variables:{ jobId }
    })
   
  }

  /**
   * Follow  company
   * 
   * @param companyId 
   * @param userId 
   */
  public followCompany(companyId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlJobForUser.FollowCompany,
      variables:{ companyId  }
    })
  }

  /**
   * Unfollow company
   * 
   * @param companyId 
   */
  public unFollowCompany(companyId:string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlJobForUser.UnfollowCompany,
      variables:{ companyId  }
    })
  }


}

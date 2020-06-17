import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable, throwError } from 'rxjs';
import { graphqlJobForCompany } from '../../graphql/jobs/job-for-companies';
import { IJobMeta, IJob } from '../../models/jobs/jobs.interface';
import { ISetJobCategory, ISetSeenJob } from '../../components/jobs/user-box/userbox.models';
import { IInviteJob } from '../../models/jobs/applyJob.interface';
import { catchError, switchMap, map } from 'rxjs/operators';
import { FileUploadService } from '../file-upload.service';

@Injectable({
  providedIn: 'root'
})
export class JobsCompanyService {

  constructor(
    private apollo:Apollo,
    private uploadService:FileUploadService
  ) { }


  /**
   * Get all candidates 
   * 
   * @param keywords 
   */
  public getAllCandidate(keywords?:string[]) : Observable<any> {
    return this.apollo.watchQuery({
      query:graphqlJobForCompany.getAllCandidate,
      variables: { keywords },
      fetchPolicy:'network-only',
    })
    .valueChanges
  }


   //////___  Post job   ___//////

  /**
   * Get plan prices
   * 
   * @param company_id 
   * @param countries 
   * @param currency 
   */
  public GetPlanPrices(company_id:string, countries:string[] , currency:string) : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlJobForCompany.GetPlanPrices,
      variables:{company_id , countries , currency}
    })
    .valueChanges

  }

  /**
   * Get pricing for 
   * 
   * @param companyId 
   * @param meta 
   */
  public getPricingFor(companyId:string , meta:IJobMeta) : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlJobForCompany.getPricingFor,
      variables:{ companyId , meta  }
    })
    .valueChanges
   
  } 

  private postJobWithoutFiles(data:IJob) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlJobForCompany.PostJob,
      variables:data
    })
   
  }

  /**
   * Post job 
   * 
   * @param data
   */
  public postJob(data:IJob) : Observable<any>{
    let files = data.details._files;

    if( files.length === 0 ) { return this.postJobWithoutFiles(data) }
    else {  
      return this.postJobWithoutFiles(data)
                 .pipe(switchMap(job => {
                    return this.uploadService.uploadJobDocs(job.id , files)
                 }))
    }
  }

  /**
   * Save as draft 
   * 
   * @param data 
   */
  public saveDraft(data:IJob) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlJobForCompany.SaveDraft,
      variables:data
    })
   
  }

  /**
   * Get posted jobs 
   * 
   * @param companyId 
   */
  public getPostedJob(companyId:string) : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlJobForCompany.GetPostedJobs,
      fetchPolicy:'network-only',
      variables:{ companyId  }
    })
    .valueChanges
  
  }
  
  
  /**
   * Get Company job
   *  
   * @param companyId 
   * @param jobId 
   */
  public getCompanyJob(companyId:string , jobId:string) : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlJobForCompany.GetJobForCompany,
      variables:{ companyId , jobId }
    })
    .valueChanges
  
  }


  //////___  My jobs   ___//////

  /**
   * Active  job 
   * 
   * @param companyId 
   * @param jobId 
   */
  public activeJob(companyId:string, jobId:string) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlJobForCompany.ActivateJob,
      variables:{companyId , jobId}
    })
   
  }

  /**
   * Pause job 
   * 
   * @param companyId 
   * @param jobId 
   */
  public pauseJob(companyId:string, jobId:string) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlJobForCompany.PauseJob,
      variables:{companyId , jobId}
    })
   
  }

  



  //////___  Aplicants   ___//////

  /**
   * Get applicants amount
   * 
   * @param company_id 
   */
  public getApplicantsCount(company_id:string,) : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlJobForCompany.GetAmountOfApplicantsPerCategory,
      fetchPolicy:'network-only',
      variables:{ company_id }
    })
    .valueChanges
   
  }

  /**
   * Get applicants 
   * 
   * @param company_id 
   */
  public getApplicants(company_id:string) : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlJobForCompany.GetListOfJobsWithSeenStat,
      fetchPolicy:'network-only',
      variables:{ company_id }
    })
    .valueChanges
    
  }

  /**
   * Get all applicants 
   * 
   * @param companyId 
   * @param jobId 
   */
  public getAllApplicants(companyId:string , jobId:string) : Observable<any> {
    return this.apollo.watchQuery({
      query:graphqlJobForCompany.GetJobApplicants,
      fetchPolicy:'network-only',
      variables:{  companyId , jobId}
    })
    .valueChanges
 
  } 

  /**
   * Set Job category 
   * 
   * @param result 
   */
  public setJobCategory(result:ISetJobCategory) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlJobForCompany.SetJobApplicationCategory,
      variables:result
    })
   
  }

  /**
   * Set job as seen
   * 
   * @param result 
   */
  public setSeenJob(result:ISetSeenJob) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlJobForCompany.SetJobApplicationSeen,
      variables:result
    })
   
  }

  /**
   * Get posted jobs 
   * 
   * @param companyId 
   */
  public getPostedJobs(companyId:string) : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlJobForCompany.getPostedJobs,
      fetchPolicy:'network-only',
      variables:{ companyId }
    })
    .valueChanges
    
  }

  /**
   * Invite user to apply
   * 
   * @param result 
   */
  public inviteUserToApply(result:IInviteJob) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlJobForCompany.inviteUserToApply,
      variables:result
    })
   
  }

  /**
   * Get skipped candidates
   * 
   * @param companyId 
   */
  public getSkippedCandidates(companyId:string) : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlJobForCompany.getSkippedCandidates,
      fetchPolicy:'network-only',
      variables:{
        companyId,
        first:999
      }
    })
    .valueChanges
   
  }

  /**
   * Get saved candiates
   * @param companyId 
   */
  public getSavedCandidates(companyId:string) : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlJobForCompany.getSavedCandidates,
      fetchPolicy:'network-only',
      variables:{
        companyId,
        first:999
      }
    })
    .valueChanges
   
  }


  /**
   * Save Candidate 
   * 
   * @param companyId 
   * @param candidateId 
   */
  public saveCandidate(companyId:string ,candidateId: string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlJobForCompany.saveCandidate,
      variables:{
        companyId,
        candidateId
      }
    })
    
  }

  /**
   * UnSave Candidate 
   * 
   * @param companyId 
   * @param candidateId 
   */
  public unsaveCandidate(companyId:string ,candidateId: string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlJobForCompany.unsaveCandidate,
      variables:{
        companyId,
        candidateId
      }
    })
 
  }


  
  /**
   * Skip Candidate 
   * 
   * @param companyId 
   * @param candidateId 
   */
  public skipCandidate(companyId:string ,candidateId: string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlJobForCompany.skipCandidate,
      variables:{
        companyId,
        candidateId
      }
    })
     
  }

   /**
   * Un Skip Candidate 
   * 
   * @param companyId 
   * @param candidateId 
   */
  public unskipCandidate(companyId:string ,candidateId: string) : Observable<any>{
    return this.apollo.mutate({
      mutation:graphqlJobForCompany.unskipCandidate,
      variables:{
        companyId,
        candidateId
      }
    })
  
  }


  /**
   * Change job  
   * 
   * @param companyId 
   * @param draftId 
   * @param details 
   */
  public changePost(companyId: string, 
                    draftId: string , 
                    details:IJob['details'] ) : Observable<any> {

      return this.apollo.mutate({
        mutation:graphqlJobForCompany.ChangePost,
        variables:{ companyId ,  draftId , details}
      })
    
  }


  /**
   * Change draft job 
   * 
   * @param companyId 
   * @param draftId 
   * @param job 
   */
  public changeDraft(companyId: string, 
                    draftId: string , 
                    job:IJob ) : Observable<any> {

    return this.apollo.mutate({
      mutation:graphqlJobForCompany.ChangeDraft,
        variables:{ 
          companyId ,  
          draftId ,
          details:job['details'],
          meta:job['meta']
        }
      })
   
    }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { IFile } from "../models/files.interface";
import { Observable, Subject, of, forkJoin } from "rxjs";
import { Apollo } from "apollo-angular";
import { graphqlUserProfile } from "../graphql/user-profile";
import { IFileRemove } from "../models/fileRemove.interface";
import { graphqlCompanyProfile } from "../graphql/company-profile";
import { GlobalUserProService } from "./global-user-pro.service";
import { merge, mergeAll, mergeMap } from "rxjs/operators";

const API = "/api/v1/uploading/",
      EDUCATION = API + "education/",
      EXPERIENCE = API + "experience/",
      JOBS_APPLICANTS  =   API + 'job_applicant/',
      COMPANY = API + 'company/',
      AWARD   = COMPANY + '/company_award/';


@Injectable({
  providedIn: "root"
})
export class FileUploadService {
  files: any;

  constructor(
    private http: HttpClient,
    private apollo: Apollo,
    private globalService:GlobalUserProService
  ) {}

  get uploadeFiles() {
    return this.files;
  }


  mutations = {
    link:{
      education:graphqlUserProfile.RemoveLinksInEducation,
      experience:graphqlUserProfile.RemoveLinksInExperience,
      accomplishment:graphqlUserProfile.RemoveLinksInAccomplishment,
      award:graphqlCompanyProfile.RemoveLinksInCompanyAward
    },
    files:{
      education:graphqlUserProfile.RemoveFilesInEducation,
      experience:graphqlUserProfile.RemoveFilesInExperience,
      accomplishment:graphqlUserProfile.RemoveFilesInAccomplishment,
      award:graphqlCompanyProfile.RemoveFilesInCompanyAward
    

    }
  }

  get companyId() : string{
    return this.globalService.isCompanyActive() &&
           this.globalService.getComapnyId();
  }

  
  /**
   * Upload job applied files
   * 
   * @param jobId 
   * @param files 
   */
  public uploadAppliedDocs(jobId:string , files:IFile[]) : Observable<any> {
    let url = `${JOBS_APPLICANTS}${jobId}`,
        result = [];
    
    files.map(file => {
      if(file.file && file.name){
        result.push(
          this.http.post(`${url}`, file.file));
      }
    });

    return forkJoin(result);
  }

  /**
   * Uplaod file for job 
   * 
   * @param jobId 
   * @param files 
   */
  public uploadJobDocs(jobId: string , files:IFile[]) : Observable<any> {
    let path = `${COMPANY}${this.globalService.getProfileId()}/job_post/${jobId}`,
        result = [];

    files.map(file => {
      if(file.file && file.name){
        result.push(
          this.http.post(path, file.file));
      }
    });

    return forkJoin(result);
  }

  public edit(postId:string , files:IFile[]) : Observable<any>{
    let result = [];
    
    files.forEach(file => {  
      if(file.file && file.name){

        result.push(
          this.http.post(`${EDUCATION}${postId}?base64=true`, {
            file: file.file,
            name: file.name
          }));
      }
    });

    return forkJoin(result);
  }

  public editLink(postId:string , {id , url}){
    if(postId && !!postId && id && !!id && url && !!url){
      return this.apollo.mutate({
        mutation:graphqlUserProfile.ChangeLinkInEducation,
        variables:{
          id:postId,
          link_id:id,
          url
        }
      }).subscribe(({ data }) => {

      })
    }else{
      let links = [];
      links.push({ url });
      return this.addLinks(postId , links)
          .subscribe();
    }
  }

  public upload(files: IFile[]) : Observable<any> {
    let result = [];
    files.map(file => {
      result.push(this.http
        .post(`${EDUCATION}?base64=true`, {
          file: file.file,
          name: file.name
        }));
    });

    return forkJoin(result);
  }

  public uploadExperience(postId: string, files: IFile[]) : Observable<any> {
    let result = [];
    files.map(file => {
      result.push(this.http
        .post(`${EXPERIENCE}${postId}?base64=true`, {
          file: file.file,
          name: file.name
        }));
    });

    
    return forkJoin(result);
  }

  public addLinks(id:string , links)  : Observable<any> {
  
    return this.apollo.mutate({
      mutation:graphqlUserProfile.AddLinksInEducation,
      variables:{
        id,
        input:links
      }
    })
  }

  public deleteFiles({ files_id , id,}:IFileRemove , type?:string){
    let mutation = this.mutations['files'][type],
        companyId = this.companyId ? { company_id : this.companyId } : undefined;
    
     if(id && files_id){
       this.apollo.mutate({
         mutation,
         variables:{
           id,
           files_id,
           ...companyId
         }
       }).subscribe(
         (data) => {},
         (err) => {
          
         }
       )
     }
  }

  public deleteLinks(id:string , links_id , type?:string) : Observable<any>{
    let mutation = this.mutations['link'][type],
        companyId = this.companyId ? { company_id : this.companyId } : undefined;

      if(id && links_id){
        return  this.apollo.mutate({
           mutation,
           variables:{
             id,
             links_id,
             ...companyId
           }
         })
      }
  }


}

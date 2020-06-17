import { Component, OnInit } from '@angular/core';
import { JobsCompanyService } from 'src/app/_shared/services/jobs/jobs-company.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { Observable, Subject } from 'rxjs';
import { map, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-jobs-applicant',
  templateUrl: './jobs-applicant.component.html',
  styleUrls: ['./jobs-applicant.component.scss', '../../../network/network.component.scss',
              '../company-jobs/company-jobs.component.scss' , '../../job-list/job-list.component.scss']
})
export class JobsApplicantComponent implements OnInit {

  destroy$:Subject<any> = new Subject<any>();

  companyID:string;
  jobId:string;
  jobTitle:string;
  applicantAmount:Observable<any>;


  /// Applicants data
  totalApplicants:any[] = [];
  newApplicants:any[] = [];
  favoriteApplicants:any[] = [];
  reviewApplicants:any[] = [];
  disqualifiedApplicants:any[] = [];



  constructor(
    private jobsService:JobsCompanyService,
    private globalServie:GlobalUserProService,
    private route:ActivatedRoute
  ) { 
    this.companyID = this.globalServie.getComapnyId();
    this.jobId = this.route.snapshot.params['id'];
    this.jobTitle = this.route.snapshot.params['title'];



  }


  ngOnInit() {

      // this.applicantAmount = this.jobsService
      //                         .getApplicantsCount(this.companyID)
      //                         .pipe(map(({ data }) => data.GetAmountOfApplicantsPerCategory)); /// Applicants amount
      /// Get applicants 
      this.getApplicants();
    
  }


  getApplicants(){
      if(this.companyID && this.jobId){
       return  this.jobsService
            .getAllApplicants(this.companyID , this.jobId)
            .pipe(
              distinctUntilChanged(),
              takeUntil(this.destroy$)
            )
            .subscribe(
              ({data}) => {
                let applicants = data['GetJobApplicants'];
                
                this.totalApplicants = applicants;

                return applicants.map(applicant => {
                    let metadata = applicant['application']['metadata'],
                        category = metadata['category'],
                        seen     = metadata['seen'];

                    
                     /// New Applicants 
                     if(!seen && !this.newApplicants.includes(applicant)) this.newApplicants.push(applicant);

                     switch(category){
                       //// Favorite Applicants 
                        case"Favorite":{
                            if(!this.favoriteApplicants.includes(applicant)){ 
                              this.favoriteApplicants.push(applicant);
                            }
                            break;
                        }
                        /// Review Applicants 
                        case"In_review":{
                            if(!this.reviewApplicants.includes(applicant)){
                              this.reviewApplicants.push(applicant);
                            }                           
                            break;
                        }
                        /// Disqualified Applicants 
                        case"Disqualified":{  
                            if(!this.disqualifiedApplicants.includes(applicant)){
                              this.disqualifiedApplicants.push(applicant);
                            }
                            break;
                        }

                        default:break;
                     }
                });
              }
            );
      }
  }

  selectTab(e:NgbTabChangeEvent){
    let tab = e.nextId;

    if(tab === 'new' && this.newApplicants.length > 0){
       this.newApplicants.map(appl => {
           this.jobsService
               .setSeenJob({
                 companyId:this.companyID,
                 jobId:this.jobId,
                 applicationId:appl.userId,
                 seen:true
               })
               .subscribe();
       })
    }
    
  }


}

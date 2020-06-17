import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalUserProService } from '../../../services/global-user-pro.service';
import { JobsCompanyService } from 'src/app/_shared/services/jobs/jobs-company.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';



@Component({
  selector:'app-invite-to-apply',
  templateUrl: './invite-to-apply.component.html',
  styleUrls: ['./invite-to-apply.component.scss', '../../../css/modals_shared_styles.scss']
})
export class InviteToApplyComponent implements OnInit {
  $destroy:Subject<any> = new Subject<any>();

  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() modalContent: any;
  
  postedJobs: any[] = [];
  vm: any = {
    jobId: "",
    text: "",
    errors: ""
  }
  isInvitationToApplyInProgress: boolean = false;
  companyId:string;

  constructor(
       private jobsService:JobsCompanyService,
       private globalUserProfileService: GlobalUserProService,
       private router:Router
       )
    {
      this.companyId = this.globalUserProfileService.getComapnyId();

    }

  ngOnInit() {
    // Get posted jobs
    
    this.getPostedJobs();
  }

  getPostedJobs(){

     if(this.companyId){
       this.jobsService
           .getPostedJob(this.companyId)
           .pipe(takeUntil(this.$destroy))
           .subscribe(
             ({data}) => {
               this.postedJobs = data["GetPostedJobs"];
             },
             (err) => {}
             
           )
     }
  }

  addJob(e){
    if(e === 'add_job'){
      this.closeModal.emit(true);
      return this.router.navigate(['/jobs/company/post-a-job']);
    }
    
  }

  submit() {
    // Clear errors if any
    this.vm.errors = "";

    if (!this.vm.jobId) {
      return;
    }

    if (this.isInvitationToApplyInProgress) {
      return;
    }
    this.jobsService
        .inviteUserToApply(
          {
            companyId:this.companyId,
            jobId:this.vm.jobId,
            text:this.vm.text,
            userId:this.modalContent.id
          }
        )
       .pipe(takeUntil(this.$destroy))
       .subscribe(
         ({ data }) => {
           this.closeModal.emit(true);
         },
         (err) => {}
         
       )
  }

  trackByFn =  (index) => index;

  ngOnDestroy() {
 
    this.$destroy.next();
    this.$destroy.complete();
  }

}

import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UserJobsService } from 'src/app/_shared/services/jobs/user-jobs.service';
import { Observable, Subject, merge } from 'rxjs';
import { map, takeUntil, zip } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { IPhone } from 'src/app/_shared/models/company/phone.interface';
import { IApplyJob } from 'src/app/_shared/models/jobs/applyJob.interface';
import { AddDocumentComponent } from 'src/app/_shared/components/add-document/add-document.component';
import { IFile } from 'src/app/_shared/models/files.interface';
import { FileUploadService } from 'src/app/_shared/services/file-upload.service';
import { WalletService } from 'src/app/wallet/shared/wallet.service';

@Component({
  selector: 'app-apply-modal',
  templateUrl: './apply-modal.component.html',
  styleUrls: ['./apply-modal.component.scss']
})
export class ApplyModalComponent implements OnInit , OnDestroy {

  destroy$:Subject<any> = new Subject<any>();

  @ViewChild(AddDocumentComponent, { static: false }) docs:AddDocumentComponent;

  @Output() closeModal:EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() userId:string;
  @Input() jobId:string;
  @Input() company:any;

  isChecked:boolean  = false;
  showNext:boolean = false;

  user:Observable<any>;
  applyForm:FormGroup;
  isFollow:boolean = false;
  newContact:{
    [type:string]:boolean
  } = {}

  constructor(
    public jobsService:UserJobsService,
    private fileService:FileUploadService,
    private f:FormBuilder,
    private walletService: WalletService
  ) { 
    this.applyForm = this.f.group({
      email: [''],
      phone: [''],
      cover_letter:[''],
      document_id: [''],
    })
  }

  ngOnInit() {
    if(this.userId){
      this.jobsService
          .getJobProfile()
          .pipe(takeUntil(this.destroy$))
          .subscribe((data) => this.jobsService.newOpp = data['is_open'])
    
      this.user = this.jobsService
                      .getProfile(this.userId)
                      .pipe(
                        takeUntil(this.destroy$),
                        map(({data}) => data['getProfile'])
                      )
            
    }

    if(this.company) {
      this.isFollow = this.company.follow;
    }
    
    
  }

  get files() : IFile[]{
    return this.docs.documents;
  }

  changeContact(e , type?:string){
    let target = e.target;

    if(target.value === 'new'){
      this.newContact[type] = true;
      this.applyForm.get(type).reset();
    }
  }

  cancelNew(type?:string){
    this.newContact[type] = false;
  }

  setNewPhone(phone:IPhone){
    this.applyForm.get('phone').setValue(phone[0].number);
  }

  followUnfollow(follow:boolean){
    follow ? this.jobsService
                .followCompany(this.company.id)
                .pipe(takeUntil(this.destroy$))
                .subscribe()  : /// Folow
            this.jobsService
                .unFollowCompany(this.company.id)
                .pipe(takeUntil(this.destroy$))
                .subscribe() /// UnFollow 
  }


  appliedJob(reuslt:IApplyJob){
    //test
    return merge( this.jobsService
      .applyJob(reuslt)
      .pipe(takeUntil(this.destroy$)),
      this.walletService.earnCoinsForWallet('apply_job', {silver_coins: 2})
      )
      .subscribe(
        (data) => {
          this.closeModal.emit(true);

          this.walletService.changindLocalCoins(1);
         },
        (err) => {
            console.log(err),
           this.closeModal.emit(true);
          }
        )

    //test
    // return  this.jobsService
    //             .applyJob(reuslt)
    //             .pipe(takeUntil(this.destroy$))
    //             .subscribe(
    //               (data) => {
    //                 this.closeModal.emit(true);
    //                },
    //               (err) => {
    //                   console.log(err),
    //                  this.closeModal.emit(true);
    //                 }
    //               )
  }

  submit(){
    let form = this.applyForm;

    if(form.valid){
      let { email , phone ,  cover_letter } = form.value,
          result:IApplyJob = {
            job_id:this.jobId,
            email,
            phone,
            cover_letter,
          }

      /// If has files 
      if(this.files && this.files.length > 0){
          this.fileService
              .uploadAppliedDocs(this.jobId , this.files)
              .pipe(takeUntil(this.destroy$))
              .subscribe(
                (data) => {
                  let ids = [];
                  
                  if(data.length > 0){
                    data.map(value =>  {
                        let infos = value['info'];
                        if(infos && infos.length > 0){                        
                          infos.map(info => {
                            ids.push(info.id);
                          });
                          result.document_id = ids;

                        }
                    });

                    return this.appliedJob(result);
                  }
                }
              )
      }else{
        return this.appliedJob(result);
      }

    }
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();

  }


}

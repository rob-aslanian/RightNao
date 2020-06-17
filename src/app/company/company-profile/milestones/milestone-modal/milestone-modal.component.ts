import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Years } from 'src/app/_shared/models/date.model';
import { IMilestone } from 'src/app/_shared/models/company/milestone.interface';
import { CompanyProfileService } from 'src/app/_shared/services/companies/company-profile.service';
import { share, finalize, takeUntil } from 'rxjs/operators';
import { AddImageComponent } from 'src/app/_shared/components/add-image/add-image.component';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { Subject } from 'rxjs';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { PasswordValidation } from 'src/app/_shared/register.validator';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { ProfileLangsService } from 'src/app/_shared/services/shared/profile-langs.service';

@Component({
  selector: 'app-milestone-modal',
  templateUrl: './milestone-modal.component.html',
  styleUrls: ['./milestone-modal.component.scss']
})
export class MilestoneModalComponent implements OnInit , OnDestroy{



  @Input() id:string;
  @Input() data:IMilestone;

  

  @Output() result:EventEmitter<IMilestone> = new EventEmitter<IMilestone>();

  destroy$:Subject<any> = new Subject<any>();
 
  milestoneForm:FormGroup;

  Years = Years;
  submited:boolean = false;
  milestone:IMilestone = {};
  utils = utilities;
  currentLang:string = 'en'

  constructor(
    private f:FormBuilder,
    private companyService:CompanyProfileService,
    private globalService:GlobalUserProService,
    private langService:ProfileLangsService

  ) {
     this.milestoneForm = this.f.group({
      title: ['', Validators.required],
      year: ['', Validators.required],
      image: [''],
      description: ['']
    });

    this.currentLang = this.globalService.getLanguage();

   }

   get mil(){
     return this.milestoneForm.controls;
   }

  ngOnInit() {
    if(this.data){
      this.pathData();
    }
  }


  pathData(){
    this.milestoneForm.patchValue({
      title:this.data.title,
      description:this.data.description,
      year:this.data.year
    })
  }

  clearForm(){
    this.submited = false;
    this.milestoneForm.reset();
    this.milestoneForm.clearValidators();
    
  }


  remove(){
    if(this.data){
       this.companyService
           .removeMileStone(this.id , this.data.id)
           .pipe(takeUntil(this.destroy$))
           .subscribe(
             () => {},
             (err) => console.log(err),
             () => {
                this.result.emit({
                  id:this.data.id,
                  _type:'delete',
                  _close:true,
                })
             }

           )
    }
  }


  submit(another?:boolean){

    let form = this.milestoneForm;
    this.submited = true;

    if(form.valid){
       let { year , title  , description } = form.value;

       this.milestone.year = +year;
       this.milestone.title = title;
       this.milestone.description = description !== null ? description : '';

       /// Edit
       if(this.data){
        this.milestone.id = this.data.id;

        let mutation =  this.currentLang === 'en' ?
                        this.companyService
                            .editMilestone(this.id , this.milestone) :
                        this.langService.SaveCompanyMilestoneTranslation(
                          this.id,
                          this.currentLang,
                          {
                            ...this.milestone,
                            milestone_id:this.milestone.id
                          }
                        )
      
       mutation
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              (data) => {
                return this.result.emit({
                  ...this.milestone,
                  _type:'edit',
                  _close:true,
                })

              },
              (err) => { console.log(err)},
            )
        
       }
       /// Add 
       else{
          this.companyService
              .addMileStone(this.id, this.milestone)
              .pipe(takeUntil(this.destroy$))
              .subscribe(
                ({ data }) => {
                  let id = data['AddCompanyMilestone'].id;
                  
                  this.milestone.id = id;

                  /// Clear form
                  another ? this.clearForm() : null;

                  return this.result.emit({
                    ...this.milestone,
                    _type:'add',
                    _close:!another || false,
                  });

                },
                (err) => { console.log(err)  },
              )
       }
       
    }
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

}

import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Years } from 'src/app/_shared/models/date.model';
import { IAward } from 'src/app/_shared/models/company/awards.interface';
import { CompanyProfileService } from 'src/app/_shared/services/companies/company-profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PasswordValidation } from 'src/app/_shared/register.validator';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { IFile } from 'src/app/_shared/models/files.interface';
import { MediaAndLinkComponent } from 'src/app/_shared/components/media-and-link/media-and-link.component';
import { ProfileLangsService } from 'src/app/_shared/services/shared/profile-langs.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';

@Component({
  selector: 'app-awards-modal',
  templateUrl: './awards-modal.component.html',
  styleUrls: ['./awards-modal.component.scss']
})
export class AwardsModalComponent implements OnInit , OnDestroy {


  @ViewChild(MediaAndLinkComponent, { static: true }) media:MediaAndLinkComponent;

  destroy$:Subject<any> = new Subject<any>();

  @Input() companyId:string;
  @Input() data:IAward;


  @Output() result:EventEmitter<IAward> = new EventEmitter<IAward>();

  Years = Years;

  awardForm: FormGroup;
  award:IAward = {
    files_id:[],
    link:[]
  };
  submited: boolean;
  currentLang:string = 'en';
  utils = utilities;

  files:IFile[] = [];
  
  constructor(
    private f:FormBuilder,
    private companyService:CompanyProfileService,
    private uploadService:ImageUploadService,
    private langService:ProfileLangsService,
    private globalService:GlobalUserProService
  ) {
     //form add award 
     this.awardForm = this.f.group({
      title: ['', Validators.required],
      issuer: [''],
      year: ['', Validators.required],
    });

    this.currentLang = this.globalService.getLanguage() || 'en';

   }

   get aw(){
     return this.awardForm.controls;
   }

  ngOnInit() {
    if(this.data){
      this.patchData();
    }
  }

  getFiles(e){
    this.files = e.files || this.media.data.files;    
  }

  
  clearForm(){
    this.submited = false;
    this.media.saveAndAddAnother();
    this.awardForm.reset();
    this.files = [];
  }

  isEqualFile(){
    if(this.files){
      return this.data.file
                 .some((el , i ) => el.id === this.files[i].id);
    }

    return false;
  }

  patchData(){
    let { issuer , title , year } = this.data;
    this.awardForm.patchValue({
      issuer,
      title,
      year
    })
  }

  uploadFile(cb:Function , id?:string){    
    this.uploadService
        .uploadAward(this.companyId , this.files , id)
        .subscribe(
          (data) => {
            data.map(value =>  {
              let infos = value['info'];                     
              
              if(infos && infos.length > 0){                        
                infos.map(info => {   
                  this.award['files_id'].push(info.id);
                  this.files.map(file => file.id = info.id); 
                  this.award['file'] = this.files;
                });
              }
              
            });

            if(this.data && this.data.file){
              this.award.file.push(...this.data.file);
            }

            return cb();
          }
        )
  }

  addAward(another?:boolean){
    
    this.companyService
        .addAward(this.companyId , this.award)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          ({data}) => {
            let id = data.AddCompanyAward.id;
            this.award.id = id;

            this.result.emit({
              ...this.award,
              _type:'add',
              _close:!another ||  false
            });

            another ? this.clearForm() : null;
            
          },
          (err) => console.log(err)
        )
  }

  editAward(){
    let mutation =  this.currentLang === 'en' ?
                    this.companyService
                        .editAward(this.companyId , this.award) :
                    this.langService
                        .SaveCompanyAwardTranslation(this.companyId ,  this.currentLang , { 
                            award_id:this.award.id,
                            issuer:this.award.issuer,
                            title:this.award.title
                         })


    mutation
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.result.emit({
              ...this.award,
              _type:'edit',
              _close:true
            })
          },
          (err) => console.log(err)
        )
  }


  remove(){
    if(this.companyId && this.data.id){
      this.companyService
          .removeAward(this.companyId , this.data.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            () => {
              this.result.emit({
                id:this.data.id,
                _type:'delete',
                _close:true
              })
            },
            (err) => console.log(err)
            
          )
    }
  }

  submit(another?:boolean){
     let form = this.awardForm;
     this.submited = true; 
         
     if(form.valid && this.companyId){
        let {  issuer, title, year} = form.value; 
        
        this.award = {
          issuer,
          title,
          year:+year,
          link:this.media.data.links,
          files_id:[]
        }

        /// Edit
        if(this.data){
          this.award.id = this.data.id;
          this.award.file = this.data.file;


          /// Has Files ///
          if(this.files && this.files.length > 0 &&
            (this.data.file && !this.isEqualFile())){
              return this.uploadFile(() => this.editAward() , this.award.id)
          }else{
            return this.editAward();
          }

        }
        /// Add
        else{
         
          
          /// Has files 
           if(this.files && this.files.length > 0) {
             return this.uploadFile(() => this.addAward(another))
           }

           return this.addAward(another);
        }
     }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    
  }

}

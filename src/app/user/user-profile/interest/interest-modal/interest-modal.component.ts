import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { IInterest } from 'src/app/_shared/models/user/interest.interface';
import { AddImageComponent } from 'src/app/_shared/components/add-image/add-image.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { PasswordValidation } from 'src/app/_shared/register.validator';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { ProfileLangsService } from 'src/app/_shared/services/shared/profile-langs.service';
import { IUserInterestTranslation } from 'src/app/_shared/models/profile-langs/profileLangs.model';

@Component({
  selector: 'app-interest-modal',
  templateUrl: './interest-modal.component.html',
  styleUrls: ['./interest-modal.component.scss']
})
export class InterestModalComponent implements OnInit , OnDestroy {

  @ViewChild(AddImageComponent, { static: true }) image:AddImageComponent;
  
  _getInterests;  
  @Input() data:IInterest;
  
  @Input() set getInterests(value){
            this._getInterests = value
          }
          
          get getInterests(){
            return this._getInterests;
          }
        
        

  @Output() result:EventEmitter<IInterest> = new EventEmitter<IInterest>();

  destroy$:Subject<any> = new Subject<any>();
  interestForm:FormGroup;
  submited:boolean = false;
  
  interest:IInterest = {};
  utils = utilities;
  selectedLang: string ;

  constructor(
    private f:FormBuilder,
    private userService:UserProfileService,
    private uploadServie:ImageUploadService,
    private globalUserProService: GlobalUserProService,
    private langService: ProfileLangsService
  ) { 
      this.interestForm = this.f.group({
        interest: ["", Validators.compose([Validators.required,PasswordValidation.detectOnlyEnglishCharacters()])],
        description: ["", PasswordValidation.detectOnlyEnglishCharacters()]
      });
  }

  get inter(){
    return this.interestForm.controls;
  }

  ngOnInit() {
    if(this.data){
      this.selectedLang = this.globalUserProService.getLanguage();
      this.pathData();
    }
    
  }


  pathData(){
    this.interestForm.patchValue({
      interest:this.data.interest,
      description:this.data.description,
    })

    
  }

  clearForm(){
    this.submited = false;
    this.interest.image = null ; 
    this.interestForm.reset();
    this.interestForm.get('description').setValue('');
   let { file , name } = this.image.getFile;
       if(file &&  name){
        this.image.clearAll(); 
       }
    
    
  }

  remove(){
    if(this.data){
      this.userService
          .removeInterest(this.data.id)
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

  uploadImage(interestId:string , type?:string , another?:boolean){
    console.log(this.image.getFile);
    
    return this.uploadServie
              .uploadInterest(interestId, this.image.getFile.file)
              .pipe(takeUntil(this.destroy$))
              .subscribe(
                (data) => {
                  let image = data['info'][0];
                  return  image ? this.interest.image = image.url : null;
                },
                (err) => {},
                () => {
                  this.result.emit({
                    ...this.interest,
                    _type:type,
                    _close:!another || false,
                  });

                  another ? this.clearForm() : null;
                }
              )
  }

  submit(another?:boolean){
 
    
    let form = this.interestForm;
    this.submited = true;
    this.data &&  this.data.interest?this.getInterests.map(element => {
 
       
       element.interest.toLowerCase().trim().includes(form.value.interest.toLowerCase().trim()) && this.data.interest !== element.interest? 
       this.interestForm.get("interest").setErrors({'already_exist': null}) : null;
     }):this.getInterests.map(element => {
 
       
      element.interest.toLowerCase().trim().includes(form.value.interest.toLowerCase().trim())?
      this.interestForm.get("interest").setErrors({'already_exist': null}) : null;
    })
     

    if(form.valid){
       let {interest , description } = form.value;

       this.interest.interest = interest;
       this.interest.description = description;

       /// Edit
       if(this.data){
        this.interest.image = this.data.image;
        this.interest.id = this.data.id;

        let { file , name } = this.image.getFile;

        /// Remove file
        if(!file){
           this.interest.image = '';
           this.userService
               .removeInterestImage(this.data.id)
               .pipe(takeUntil(this.destroy$))
               .subscribe();
          
        }
          if( this.selectedLang &&  this.selectedLang != 'en' ){
            let input: IUserInterestTranslation = {
              interest_id: this.data.id,
              interest: this.data.interest,
              description: this.data.description

            };
            this.langService
             .SaveUserInterestTranslation(this.selectedLang, input)
              .subscribe( data => {

                if(file){
                  return this.uploadImage(this.data.id , 'edit');
                }
                return this.result.emit({
                  ...this.interest,
                  _type:'edit',
                  _close:true,
                })
                
              } )
              

          } else {

            this.userService
            .editInterest(this.interest)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              (data) => {
                /// New image 
                if(file){
                  return this.uploadImage(this.data.id , 'edit');
                }
                return this.result.emit({
                  ...this.interest,
                  _type:'edit',
                  _close:true,
                })

              },
              (err) => { console.log(err)},
            )

          }
      
        
       }
       /// Add 
       else{
        this.getInterests.map(element => {
          element.interest.toLowerCase().trim().includes(form.value.interest.toLowerCase().trim()) ? 
          this.interestForm.get("interest").setErrors({'already_exist': null}) : null;
        })
          this.userService
              .addInterest(this.interest)
              .pipe(takeUntil(this.destroy$))
              .subscribe(
                ({ data }) => {
                  let id = data['AddInterest'].id,
                      { file , name } = this.image.getFile;
                  
                  this.interest.id = id;

                  /// Image exist 
                  if(file && name){
                    return this.uploadImage(id,'add' , another);
                  }

                  /// Clear form
                  another ? this.clearForm() : null;

                  return this.result.emit({
                    ...this.interest,
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

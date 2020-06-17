import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Years, MONTHS, ExperienceYears } from '../../../../_shared/models/date.model';
import { AccomplishmentService } from '../../../../_shared/services/accomplishment.service';
import { PasswordValidation } from '../../../../_shared/register.validator';
import { IFile } from 'src/app/_shared/models/files.interface';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { MediaAndLinkComponent } from 'src/app/_shared/components/media-and-link/media-and-link.component';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { IAccomplishents } from 'src/app/_shared/models/user/accomplishment.interface';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { ProfileLangsService } from 'src/app/_shared/services/shared/profile-langs.service';
import { IUserAccomplishmentTranslation } from 'src/app/_shared/models/profile-langs/profileLangs.model';

@Component({
  selector: 'app-accomplishment-modal',
  templateUrl: './accomplishment-modal.component.html',
  styleUrls: ['./accomplishment-modal.component.scss']
})
export class AccomplishmentModalComponent implements OnInit {

  @ViewChild(MediaAndLinkComponent, { static: false }) media:MediaAndLinkComponent;

  @Input() type: string;
  @Input() data: IAccomplishents;

  @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() result: EventEmitter<IAccomplishents> = new EventEmitter<IAccomplishents>();

  months: Object = MONTHS;
  years: Array<number> = Years;

  modalTitle: string;
  modalForm: FormGroup;
  selectForm:FormGroup;
  fieldTitle: string;
  isSubmetedForm: boolean = false;
  selectedLang: string;

  dataLength: number;
  files:IFile[] = [];
  ExperienceYears = ExperienceYears;
  utils = utilities;

  accomplishments:IAccomplishents = {
    files_id:[],
    links_Id:[],
    is_expire:false
  }
 

  constructor(
    private accomService: AccomplishmentService,
    private uploadService:ImageUploadService,
    private f: FormBuilder,
    private globalUserProService: GlobalUserProService,
    private langService: ProfileLangsService

  ) {

    /// First page
    this.selectForm = f.group({
      accomp: [null, Validators.required],
    })

    /// Second page
    this.modalForm = f.group({
      is_expire: [false],
      name: ['', Validators.compose([Validators.required,PasswordValidation.detectOnlyEnglishCharacters()])],
      authority: ['', Validators.compose([Validators.required, PasswordValidation.detectOnlyEnglishCharacters()])],
      license_number: ['', PasswordValidation.detectOnlyEnglishCharacters()],
      issuer: ['',Validators.compose([Validators.required, PasswordValidation.detectOnlyEnglishCharacters() ])],
      description: ['',PasswordValidation.detectOnlyEnglishCharacters()],
      publication: ['',PasswordValidation.detectOnlyEnglishCharacters()],
      score: ['',Validators.required],
      date: f.group({
        month: ['',Validators.required],
        year: ['',Validators.required],
      }),
      finish_date: f.group({
        month: ['',Validators.required],
        year: ['',Validators.required],
      }),

    });

  }


  getFiles(e){
    if(e){
      this.files = e.files;
    }
    
  }

  ngOnInit() {
    this.selectedLang = this.globalUserProService.getLanguage();
    this.parseValue();

  }


  parseValue(){
    if(this.data){

      
      let date = this.data.date || this.data.start_date,

          startMonth = (this.data.date && this.data.date !== null) ||
                      (this.data.start_date && this.data.start_date !== null)  ?
                      date.split('-')[0] : null,

          startYear = (this.data.date && this.data.date !== null) ||
                      (this.data.start_date && this.data.start_date !== null)  ?
                      date.split('-')[1] : null,

          endMonth = this.data.finish_date && this.data.finish_date !== null ?
                      this.data.finish_date.split('-')[0] : null,
 
          endYear  = this.data.finish_date && this.data.finish_date !== null ?
                     this.data.finish_date.split('-')[1] : null;
 
      this.modalForm.patchValue({
        name:this.data.name || this.data.title,
        score:this.data.score,
        authority: this.data['authority'] || this.data.certification_authority,
        is_expire:this.data.is_expire,
        issuer:this.data.issuer,
        license_number:this.data.license_number,
        description:this.data.description,
        publication:this.data.publisher,
        date:{
          month:startMonth,
          year:startYear
        },
        finish_date:{
          month:endMonth,
          year:endYear
        }
      });

      if(this.data.is_expire) this.modalForm.controls['finish_date'].disable();
    }
    
  }



  returnBack() {
    return this.back.emit(true);
  }

  check( e  ) {
    let isChecked = e.target.checked;

    if (isChecked) {

        return this.modalForm.controls['finish_date'].disable();
    }
    return this.modalForm.controls['finish_date'].enable();
  }


  addAccomplishment(type:string , input:IAccomplishents , isSave:boolean){

    
    
    return  this.accomService
                .addAccomplishment(type, input)
                .subscribe(
                  ({data}) => {
                    let key = Object.keys(data)[0];
                    this.result.emit({
                        id:data[key].id,
                        __typename:this.type,
                        ...input,
                        _close:isSave,
                        _type:'add'
                    });
                    this.resetAccop()
                  },
                  (err) => console.log(err),
                  
              )
  }

  updateAccomplishment(type:string , result:any){

     if( this.selectedLang &&  this.selectedLang !== 'en' ){
    let input: IUserAccomplishmentTranslation = {
       accomplishment_id: result.id,
       name: result.accomplishment.name ? result.accomplishment.name : '' ,
       issuer: result.accomplishment.issuer ?  result.accomplishment.issuer: '',
       description: result.accomplishment.description ? result.accomplishment.description : ''

    };
      this.langService
      .SaveUserAccomplishmentTranslation( this.selectedLang, input)
       .subscribe( data => {
 
         this.result.emit({
          __typename:this.type,
          ...this.accomplishments,
          _close:true,
          _type:'edit'

         })
       } )
     } else {
    return this.accomService
               .updateAccomplishment(this.type , result)
               .subscribe(
                 (data) => {
                   this.result.emit({
                    __typename:this.type,
                    ...this.accomplishments,
                    _close:true,
                    _type:'edit'
                   })
                 }
               )
          }
  }

  uploadFile(cb:Function , id?:string){
 
    
    this.uploadService
        .uploadAccomplishment(this.files , id)
        .subscribe(
          (data) => {
            data.map(value =>  {
              let infos = value['info'];                     
             
              if(infos && infos.length > 0){                        
                infos.map(info => {   
                  this.accomplishments['files_id'].push(info.id);
                  this.files.map(file => file.id = info.id); 
                  this.accomplishments['file'] = this.files;
                });
              }
              
            });

            if(this.data && this.data.file){
              this.accomplishments.file.push(...this.data.file);
           
 
            } 
        
            return cb();
          }
        )
  }

  isEqualFile(){
    if(this.files){
      return this.data.file
                 .some((el , i ) => el.id === this.files[i].id);
    }

    return false;
  }


  submitForm(form: FormGroup,isSave:boolean) {
    this.isSubmetedForm = true;
         
  let isValidForm = this.isFormValid();
 
 
    
    if (form.valid && isValidForm) {
  
      for (let field in form.controls) {

        if (field !== 'date' && field !== 'finish_date') {
          this.accomplishments[field] = form.controls[field].value;
        }
  let isExpire = this.modalForm.get('is_expire').value;

        this.accomplishments.link = this.media.data.links;
        this.accomplishments['date'] = (form.controls['date'].value['month'] && form.controls['date'].value['year'] ) ? `${form.controls['date'].value['month']}-${form.controls['date'].value['year']}` : null;
        this.accomplishments['finish_date'] = isExpire ? null :
        form.controls['finish_date'].value['month'] && form.controls['finish_date'].value['year']?
        `${form.controls['finish_date'].value['month'] }-${form.controls['finish_date'].value['year']}`:null;
      
        
      } 

      /// Add 
      if(!this.data){

        /// If files exist 
        if(this.files && this.files.length > 0){

            this.uploadFile(() => this.addAccomplishment(this.type , this.accomplishments , isSave ));
        }
        else {
            this.addAccomplishment(this.type , this.accomplishments, isSave);
            !isSave?this.resetAccop():null; 
        }

 
        this.modalForm.get('finish_date')['controls']['month'].enable();
        this.modalForm.get('finish_date')['controls']['year'].enable();


        this.isSubmetedForm = false;
      }
      /// Edit 
      else{
        this.accomplishments.id = this.data.id;
        this.accomplishments.file = this.data.file;

        let formValues = form.value,

            date = formValues.date && (formValues.date.month !== null || formValues.date.year) !== null ?
                     `${formValues.date.month}-${formValues.date.year}` : null,

            finish = (formValues.finish_date && formValues.finish_date.month !== null)  && 
                     (formValues.finish_date && formValues.finish_date.year !== null) ?
                    `${formValues.finish_date.month}-${formValues.finish_date.year}` : '',

             result = {
              id:this.data.id,
              accomplishment:{
                name:formValues.name,
                certification_authority:formValues.authority,
                license_number:formValues.license_number,
                is_expire:formValues.is_expire,
                issuer:formValues.issuer,
                description:formValues.description,
                publisher:formValues.publication,
                score:formValues.score,
                start_date:date,
                finish_date: formValues.is_expire ? null : finish ? finish : null ,
                link:this.accomplishments.link,
              } as IAccomplishents
            }

           let { inputEdit, typeEdit } =  this.accpolishmentEdit(result, this.type);

        /// Change name key to title ///
        if(this.type === 'test' || 
          this.type === 'publication' || 
          this.type === 'award'){
          result.accomplishment['title'] = formValues.name;
          delete result.accomplishment['name'];
        }


        /// If file exist 
        if(this.files && this.files.length > 0 && 
          (this.data.file && !this.isEqualFile())){
            
            this.uploadFile( 
              () => this.updateAccomplishment(typeEdit , inputEdit),
              this.data.id);
          
        }else{
          this.updateAccomplishment(typeEdit , inputEdit);
        }
 
      }


    }

  }
  removeAccomp() {
    if(this.data){
       let id = this.data['id'];  
       this.accomService
           .removeAccomplishment(id)
           .subscribe(
             () => {
                this.result.emit({
                  id:id,
                  _close:true,
                  _type:'delete'
                });
             },
             (err) => console.log(err)
           );

    }
  }
   isFormValid():boolean{    
    switch (this.type) {
      case 'certification':  {
        this.modalForm.get('issuer').setErrors(null);
        this.modalForm.get('score').setErrors(null);
         return this.modalForm.valid;

              }

       case 'license':{
           this.modalForm.get('authority').setErrors(null);
           this.modalForm.get('score').setErrors(null);
          return this.modalForm.valid;
 
            }

       case 'award':{
        this.modalForm.get('finish_date').get('month').setErrors(null);
        this.modalForm.get('finish_date').get('year').setErrors(null);
        this.modalForm.get('authority').setErrors(null);
        this.modalForm.get('score').setErrors(null);
        return this.modalForm.valid;

      }
      
       case 'project':{
        this.modalForm.get('authority').setErrors(null);
        this.modalForm.get('issuer').setErrors(null);
        this.modalForm.get('score').setErrors(null);
        return this.modalForm.valid;


         }

     case 'publication':{
      this.modalForm.get('score').setErrors(null);
      this.modalForm.get('finish_date').get('month').setErrors(null);
      this.modalForm.get('finish_date').get('year').setErrors(null);
      this.modalForm.get('issuer').setErrors(null);
      this.modalForm.get('authority').setErrors(null);
      return this.modalForm.valid;


         }

     case 'test':{
      this.modalForm.get('finish_date').get('month').setErrors(null);
      this.modalForm.get('finish_date').get('year').setErrors(null);
      this.modalForm.get('issuer').setErrors(null);
      this.modalForm.get('authority').setErrors(null);

         return this.modalForm.valid;
         } 

      }
      
   }
   getDate(){
    function _getTime(year: number, month: number): number {
      return new Date(year, month).getTime();
    }

   let endMonth = this.modalForm.controls.finish_date.get('month').value,
       endYear = this.modalForm.controls.finish_date.get('year').value,
       startMonth = this.modalForm.controls.date.get('month').value,
       startYear = this.modalForm.controls.date.get('year').value
  
      let startTime = _getTime(startYear, startMonth),
      endTime = _getTime(endYear, endMonth);
  
        if (endMonth && endYear && startMonth && startYear) {
          if (startTime > endTime) {
 
            this.modalForm.controls.finish_date.get('year').setErrors({date:true}); 
          }
          else if(startTime ===  endTime){
 
            this.modalForm.controls.finish_date.get('month').setErrors({date:true});     
          }
           else {
 
            this.modalForm.controls.finish_date.get('year').setErrors(null); 
            this.modalForm.controls.finish_date.get('month').setErrors(null); 
 

          }
  
        }  
   }
   accpolishmentEdit(result: any , type: string): any {
     
      if(type === 'certification' || type === 'license' || type === 'project'){        
            return {
              inputEdit: result,
              typeEdit: type
            }

      } else {
 
        
      let  { name , issuer, start_date, description, link, publisher , score } = result.accomplishment ;
        
        
          let input = {
               id: result.id,
               accomplishment:{
               title: name ? name : '',
               issuer: issuer ? issuer : '',
               date: start_date,
               description: description ? description : '',
               link: link ? link : [],
               publisher: publisher ? publisher : '',
               score: score ? score : null

          }
          }
          return {
            inputEdit: input,
            typeEdit:type
          }
          
      }
           
   }
   resetAccop(): void {
      this.modalForm.reset();
      this.media.saveAndAddAnother();
      this.files = [];
      this.accomplishments.file = [];
      this.accomplishments.files_id = [];
      this.accomplishments.link = [];
      this.accomplishments.links_Id = [];
      this.modalForm.get('license_number').setValue('');
      this.modalForm.get('is_expire').setValue(false)
   }

}

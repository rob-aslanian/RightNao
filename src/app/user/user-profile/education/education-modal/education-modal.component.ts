import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateToDate } from 'src/app/_shared/dateValidation';
import { Years, MONTHS } from 'src/app/_shared/models/date.model';
import { Observable, of, Subject } from 'rxjs';
import { distinctUntilChanged, filter, map, takeUntil, } from 'rxjs/operators';

import degress from 'src/assets/data/en/degries';
import fieldOfStudy from "src/assets/data/en/fieldOfStudy";
import { IFileResult } from 'src/app/_shared/models/fileUpload.interface';
import { IFile } from 'src/app/_shared/models/files.interface';
import { IEducation } from 'src/app/_shared/models/user/education.interface';
import { FileUploadService } from 'src/app/_shared/services/file-upload.service';
import { EducationService } from 'src/app/_shared/services/user/education.service';
import { IFileRemove } from 'src/app/_shared/models/fileRemove.interface';
import { MediaAndLinkComponent } from 'src/app/_shared/components/media-and-link/media-and-link.component';
import {utilities} from '../../../../_shared/utilities/utilities';
import { PasswordValidation } from 'src/app/_shared/register.validator';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { ProfileLangsService } from 'src/app/_shared/services/shared/profile-langs.service';
import { IUserEducationTranslation } from 'src/app/_shared/models/profile-langs/profileLangs.model';


@Component({
  selector: 'app-education-modal',
  templateUrl: './education-modal.component.html',
  styleUrls: ['./education-modal.component.scss']
})
export class EducationModalComponent implements OnInit {


  @ViewChild(MediaAndLinkComponent, { static: true }) filesAndLinks:MediaAndLinkComponent;
  @Input() data: IEducation;

  @Output() result: EventEmitter<IEducation> = new EventEmitter<IEducation>();
  

  destroy$:Subject<any> = new Subject<any>();
  educationForm:FormGroup;  
  ids;   
  Years = Years;   
  Months = MONTHS;    
  submited:boolean = false;
  files:any[] = [];    
  educationId:string;
  utils = utilities;
  selectedLang: string = 'en';


  educations:IEducation = {
    id:null,
    currently_study:false,
    degree:null,
    description:null,
    field_study:null,
    files_id:[],
    file:[],
    links:[],
    start_date:null,
    finish_date:null,
    grade:null,
    school:null,
  }
  hasErrorDate: boolean;

  constructor(

    private f: FormBuilder,
    private fileService: FileUploadService,
    private educationService: EducationService,
    private globalUserService: GlobalUserProService,
    private langService: ProfileLangsService
  ) {
    //form edit Education
    this.educationForm = this.f.group({
      id_education: [""],
      school: ["", Validators.required],
      degree: [""],
      field: ["", Validators.required],
      grade: [""],
      startMonth: ["", Validators.required],
      startYear: ["", Validators.required],
      endMonth: ["", Validators.required],
      endYear: ["", Validators.required],
      currently_study: [false],
      description: ["",]
    });
   } 

  ngOnInit() {
    if(this.data){
      this.selectedLang = this.globalUserService.getLanguage();
      this.patchData();
    }
  }

  get ed(){
    return this.educationForm.controls;
  }

  getFiles(e){    
    if(e.files){    
      this.files = e.files;   
    }   
  }   

  get links(){
    return this.filesAndLinks.data.links;
  }

  splitDate(date:string) {
    if(date){
      let date$ = date.split('-');
      return {
        month:date$[0],
        year:date$[1]
      }
    }
  }
  patchData(){
    
     let { id, currently_study ,  degree , grade ,
           start_date , finish_date , school , description , file , files_id,
            link , field_study} = this.data;
          
     this.educationId = id
     this.toogleFinishDate(currently_study); /// Disable finish date if true 
     
  

     /// Parse State date 
     if(start_date && start_date !== ''){

        let date = this.splitDate(start_date);

        this.educationForm.get('startMonth').setValue(date.month);
        this.educationForm.get('startYear').setValue(date.year);

     }

     /// Parse finish date
     if(finish_date && finish_date !== '' && !currently_study){

       let date = this.splitDate(finish_date);

       this.educationForm.get('endMonth').setValue(date.month);
       this.educationForm.get('endYear').setValue(date.year);

    }
     
     this.educationForm.patchValue({
        school,
        degree,
        field:field_study,
        grade,
        description,
        currently_study
     })
  }

  /// Values from sugetsetd in form  ///
  searchgDegree = (text:Observable<string>) =>  
    text.pipe(
      distinctUntilChanged(),
      filter(val => val.length >= 2 ),
      map(degree =>  (degree === '' ? degress
        : degress.filter(val => val.toLowerCase().includes(degree.toLowerCase()) ))
                 .sort((a,b) => a.length < b.length ? -1 : 1)
      )
   )
  
   /// Values from sugetsetd in form  ///
   searchFieldOfStudy = (text:Observable<string>) => 
    text.pipe(
      distinctUntilChanged(),
      filter(val => val.length >= 2 ),
      map(study =>  (study === '' ? degress
        : fieldOfStudy.filter(val => val.toLowerCase().includes(study.toLowerCase()) ))
                      .sort((a,b) => a.length < b.length ? -1 : 1)
      )
   )

   /// Toggle to date ///
  toogleFinishDate(study:boolean){
    if (study) {
      this.educationForm.controls.endMonth.disable();
      this.educationForm.controls.endYear.disable();
    } else {
      this.educationForm.controls.endMonth.enable();
      this.educationForm.controls.endYear.enable();
    }
  }

  currentlyStudy(e){
    let study = e.target.checked;
    this.toogleFinishDate(study);
  }

  addEducation(another?:boolean){
      return this.educationService
                 .addEducation(this.educations)
                 .pipe(takeUntil(this.destroy$))
                 .subscribe(({data}) => {
                     let id = this.ids =  data['AddEducation']['id'];

                     this.result.emit({
                       id,
                       file:this.files,
                       link:this.links,
                       ...this.educations,
                       _type:'add',
                       _close:!another || false
                     });
  
                     if(another){
                      this.toogleFinishDate(false);
                      this.educationForm.reset();
                      Object.keys(this.educationForm.controls).map(val => {
                          this.educationForm.get(val).setErrors(null);
                      });
                      this.filesAndLinks.saveAndAddAnother();
                      }
         })
  }


  editEducation(){
      if( this.selectedLang && this.selectedLang !== 'en'){
      let input: IUserEducationTranslation = {
          education_id: this.educationId,
          school: this.educations.school,
          degree: this.educations.degree,
          field_of_study: this.educations.field_study,
          grade: this.educations.grade,
          description: this.educations.description

      };
        this.educations.id = this.educationId;
        return this.langService
        .SaveUserEducationTranslation( this.selectedLang , input)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
  
          
              this.result.emit({
                // file: this.files,
                link:this.educations.links,
                ...this.educations,
                id:this.educationId || data.id,
                _type:'edit',
                _close:true
              })
          })
      
    } else {

      return this.educationService
      .editEducation(this.educationId , this.educations)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
    
            this.result.emit({
              // file: this.files,
              link:this.educations.links,
              ...this.educations,
              id:this.educationId || data.id,
              _type:'edit',
              _close:true
            })
        })
        

    }
  }
  /// For uploading files ///
  uploadFile(another?:boolean){
      if(this.files.length > 0){
        return this.fileService
            .upload(this.files)
            .pipe(takeUntil(this.destroy$))
            .subscribe((data) => {
              if(data.length > 0){
                 this.educations.file = this.files;
                  data.map(value =>  {
                      let infos = value['info'];   
                      if(infos && infos.length > 0){                        
                        infos.map(info => {
                          this.educations.files_id.push(info.id)
                        });
                      }
                  });
              }
              return this.addEducation(another);
            })
    }
  }

  removeEducation(){
    if(this.educationId){
      this.educationService
        .removeEducation(this.educationId)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data) => {
          /// Remove files /// 
          if(this.data.file.length > 0){
            let filesToDelete : IFileRemove = {
              id:this.educationId,
              files_id:[]
            }

            /// If new added 
            if(this.data.files_id){
              filesToDelete.files_id !== this.data.files_id;
            }else{
              this.data.file.map(file => filesToDelete.files_id.push(file.id));
              
            }
            this.fileService.deleteFiles(filesToDelete);
          }
          this.result.emit({
            id:this.educationId,
            // file: this.filesAndLinks.files,
            _type:'delete',
            _close:true,
          })
        },
        (err) => {
          console.log(err);
          
        })
    }
  }

  
  
  submit(another?:boolean){
    this.submited = true;
    let form = this.educationForm;
    //console.log(this.filesAndLinks.files);
    
    if(form.valid){

      let controls = form.value,
          files = this.files,
          { links } = this.filesAndLinks.data,
          { school , currently_study , degree , field , grade ,
            startMonth , startYear, endMonth , endYear ,  description } = controls,

          start_date = (startMonth && startYear) && (startMonth.value !== '' && startYear.value !== '') ?  /// Start date
                        `${startMonth}-${startYear}` : '',

          finish_date = (endMonth && endYear) && (endMonth.value !== '' && endYear.value !== '') ?  /// Finish date
                        `${endMonth}-${endYear}` : '';

      this.educations.school = school,
      this.educations.degree = degree; 
      this.educations.start_date = start_date;
      this.educations.finish_date = finish_date;
      this.educations.field_study = field;
      this.educations.grade = grade;
      this.educations.currently_study = currently_study;
      this.educations.description = description;
      this.educations.links = links; 
      this.educations.file = this.filesAndLinks.data.files;  

      /// Edit 
      if(this.data && this.educationId){ 
         
        /// If exist files ///
        if(files && files.length > 0){
          /// Change files /// 
          this.fileService    
              .edit(this.educationId , this.files)
              .pipe(takeUntil(this.destroy$))
              .subscribe((data) => {         
                  data.map(value =>  {
                    let infos = value['info'];                     
                    
                    if(infos && infos.length > 0){                        
                      infos.map(info => {   
                      
                        this.educations.files_id.push(info.id);
                        this.educations.file.map(file => file.id = info.id);  
                        this.educations.file = this.filesAndLinks.data.files;

                      });
                    }
                  });
                  //  this.editEducation();
                } , (err) =>  console.log(err), 
              () =>  this.editEducation()
              );
            } 
        else{
          return this.editEducation();
        }
      }
      /// Add 
      else{
        if(files && files.length > 0){
          // Add with files
          return this.uploadFile(another);   
        }
        // Add without files 
         return this.addEducation(another);
      }

    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

  }
 getDate(){
  function _getTime(year: number, month: number): number {
    return new Date(year, month).getTime();
  }

 let endMonth = this.educationForm.get('endMonth').value,
     endYear = this.educationForm.get('endYear').value,
     startMonth = this.educationForm.get('startMonth').value,
     startYear = this.educationForm.get('startYear').value

    let startTime = _getTime(startYear, startMonth),
    endTime = _getTime(endYear, endMonth);

      if (endMonth && endYear && startMonth && startYear) {
        if (startTime > endTime) {
          this.hasErrorDate = true;
  this.educationForm.get('endYear').setErrors({date:true}); 
        }
        else if(startTime ===  endTime){
          this.hasErrorDate = true;
  this.educationForm.get('endMonth').setErrors({date:true});          
        }
         else {
          this.educationForm.get('endMonth').setErrors(null);   
          this.educationForm.get('endYear').setErrors(null)
          this.hasErrorDate = false;
        }

      }  
 }
}

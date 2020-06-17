import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { validateToDate } from 'src/app/_shared/dateValidation';
import {  MONTHS, Years } from 'src/app/_shared/models/date.model';
import countries from 'src/assets/data/en/countries';
import { Observable, Subject } from 'rxjs';
import { map, distinctUntilChanged, debounceTime, takeUntil, switchMap, filter } from 'rxjs/operators';
import { RegionService } from 'src/app/_shared/region.service';
import { IAddExperience, IUserExperience, ILink, IAddLink } from 'src/app/_shared/models/user/experience.interface';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { UserExperienceService } from 'src/app/_shared/services/user/user-experience.service';
import { FileUploadService } from 'src/app/_shared/services/file-upload.service';
import { IFile } from 'src/app/_shared/models/files.interface';
import { MediaAndLinkComponent } from 'src/app/_shared/components/media-and-link/media-and-link.component';
import { PasswordValidation } from 'src/app/_shared/register.validator';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { ProfileLangsService } from 'src/app/_shared/services/shared/profile-langs.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { IUserExperienceTranslation } from 'src/app/_shared/models/profile-langs/profileLangs.model';
 

@Component({
  selector: 'app-experience-modal',
  templateUrl: './experience-modal.component.html',
  styleUrls: ['./experience-modal.component.scss']
})

export class ExperienceModalComponent implements OnInit , OnDestroy {

  destroy$:Subject<any> = new Subject<any>();
  files:any[] = [];  

  @ViewChild(MediaAndLinkComponent, { static: true }) filesAndLinks:MediaAndLinkComponent;

  @Output() result: EventEmitter<IUserExperience> = new EventEmitter<IUserExperience>();

  @Input() data: IUserExperience; 

  submitedEducation:boolean = false;

  experienceForm: FormGroup;

  experienceId: string = null;

  experience: IAddExperience = {
    id:null,
    position:null,
    company:null,
    start_date:null,
    finish_date:null,
    city_id:null,        
    country:null,    
    currently_work:false, 
    description:null,
    links:[] = [],
    files_id:[] = [],
    file:[] = [],
    

  };
  
  exFiles: string[] = [];
  experienceFiles: IFile[] = [];
  experienceLinks: IAddLink[]= [];
  PasswordValidation = PasswordValidation;
  Months = MONTHS;
  Years = Years;

  submitted:boolean = false;
  
  cities: any[];
  selectedCity?: any = null;
  selectedCountry?: string;
  countries: any;
  utils = utilities;
  selectedLang: string;

  constructor(

    private f: FormBuilder,
    private region: RegionService,
    private experienceService:UserExperienceService,
    private fileUploadService: FileUploadService,
    private langService:ProfileLangsService,
    private globalUserService: GlobalUserProService

  ) {
    this.experienceForm = this.f.group({
      id_experience: [""],
      position: ["", Validators.required ],
      company: ["", Validators.required],
      city_id: ["", Validators.required],
      country: ["", Validators.required],
      startMonth: ["", Validators.required],
      startYear: ["", Validators.required],
      endMonth: ["",  Validators.required],
      endYear: ["", Validators.required],
      currentlyWork: [false],
      description: [""]
    });
   }


   get exp(){
     return this.experienceForm.controls;
   }

  getFiles(e: any){  
    console.log(e);
      
    if(e.files){    
      return this.files = e.files;
      
    }   
  }   

  get links(){
    return this.filesAndLinks.data.links;
  }

  ngOnInit() {
    /// Get list of countries ///
    this.countries = this.region.Countries;
    
    /// If edit , parse data 
    if(this.data){
      this.selectedLang = this.globalUserService.getLanguage();
      this.patchData();
    }
    
  }


  toogleFinishDate(work:boolean){
    if (work) {
      this.experienceForm.controls.endMonth.disable();
      this.experienceForm.controls.endYear.disable();
    } else {
      this.experienceForm.controls.endMonth.enable();
      this.experienceForm.controls.endYear.enable();
    }
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
     let { id , company , title , location ,
           start_date , finish_date , currently ,
           description , file , link } = this.data;           

      if(id) {
        this.experienceId = id;
      } else {
      }
      this.toogleFinishDate(currently); /// Disable finish date if true 


      /// Parse State date 
      if(start_date && start_date !== ''){

         let date = this.splitDate(start_date);

         this.experienceForm.get('startMonth').setValue(date.month);
         this.experienceForm.get('startYear').setValue(date.year);

      }

      /// Parse finish date
      if(finish_date && finish_date !== '' && !currently){

        let date = this.splitDate(finish_date);

        this.experienceForm.get('endMonth').setValue(date.month);
        this.experienceForm.get('endYear').setValue(date.year);

     }     

     /// Parse location 
     if(location){
        this.selectedCity = location.city;
        this.experienceForm.patchValue({city_id: location.city});
        let country = location.country.id;
        this.selectedCountry = country;
     } 
     
     this.experienceForm.patchValue({
      position: title,
      company,
      currentlyWork: currently,
      description,
      country: this.selectedCountry
    });
    
  }


  /// Location /// 
    formatLocation = (result : any) => {

      if(!result && result === '') return;


      let countryName = '',
          city = result.city && result.city !== '' ?  result.city : '', /// City 
          subdivision = result.subdivision && result.subdivision !== '' ? ` - ${result.subdivision}` : ''; /// Subdivision 


      if(result.country && result.country !== ''){
         countryName = countries[result.country] ?  
                       countries[result.country] :
                       result.country;
      }


      return countryName !== '' || city !== '' || subdivision !== ''  ? 
             `${result.city} ${countryName || '' } ${result.subdivision || '' }` : '';
    }



    selectCountry(loc){
      let target = loc.target;
      
      target ? this.selectedCountry = target.value : null;
      this.experience.country = target.value;
      this.selectedCountry = target.value;
  
      
      /// Reset city ///       
      this.selectedCity = '';    

    }     


   /// City ///
   cityFormatter = (result: any) => result.city;    
    
   /// Search City ///
    searchCity = (text$: Observable<string>) =>    
      text$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((term ) =>  term.length > 1? this.getCities(term):[])
      )
      

    /// Get Cities ///
    getCities(term?:string){

      if(this.selectedCity === null && this.selectedCountry === null) return;
  
  
      let city = this.selectedCity !== null ? 
                 this.selectedCity.city || this.selectedCity : '';
  
  
     if(city !== '' && term !== ''){
  
      return this.region
                 .getCities(this.selectedCountry ,city)
                 .pipe(
                   map(({data}) => data['getListOfCities']),
                   filter(cities => {
                     return cities.filter(c => c.city.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
                   })
                  )
     }
    }
    
    /// Selected City ///

   selectCity(e:NgbTypeaheadSelectItemEvent){
    if(!e || !e.item){
        return;
    }
    
    this.experience.city_id = e.item.id || '';
  }
    ////// *******  ////// 


  currentWorkhere(e){
    let currentWorkHere = e.target.checked;
    this.toogleFinishDate(currentWorkHere);
    
  }

  removeExperience(){
     if(this.data && this.experienceId){
       this.experienceService
           .deleteExperience(this.experienceId)
           .pipe(takeUntil(this.destroy$))
           .subscribe(({ data }) => {
              this.result.emit({
                ...this.data,    
                _type:'delete',   
                _close:true
              })
           },
           (err) => {
             console.log(err);
           })
     }
  }


  get parseDataToResult() : IUserExperience{
    return {
      title:this.experience.position,  
      company:this.experience.company,    
      // location:this.experience.city,   
      start_date:this.experience.start_date,    
      finish_date:this.experience.finish_date,    
      currently:this.experience.currently_work,   
      description:this.experience.description,   
      link: this.experience.links,   
      file: this.filesAndLinks.data.files       
    }
  }


  uploadFile(file?: any , another?:boolean) { 
    if(!this.experienceId) {
      this.experienceId = '';
    }
    

    if(this.files.length > 0){
      this.fileUploadService   
          .uploadExperience(this.experienceId, this.files)
          .subscribe((data) => {
            if(data.length > 0){               
                data.map(value =>  {
                    let infos = value['info']; 
                    if(infos && infos.length > 0){                
                      infos.map(info => {
                        this.exFiles.push(info.id);
                        this.experience.files_id.push(info.id);
                        this.experienceFiles.map(el => el.id = info.id);     
                        
                      });

                    }
                });
                if(!this.data) {
                  return this.addExperiences(another);  
                }
              }

          })
        
        }
  }


  addExperiences(another:boolean = true) {  
 
    
    this.experienceService
              .addExperience(this.experience)
              .pipe(takeUntil(this.destroy$))
              .subscribe(({data}) => {
                  let id = this.experienceId = data['AddExperience']['id'];
                  this.result.emit({
                      id,
                      file: this.files,       
                      ...this.parseDataToResult,
                      location:{
                        city:{
                          city:this.selectedCity.city,
                          id:this.experienceForm.get('city_id').value,
                        },  
                        country:{
                          id:this.selectedCountry
                        }
                      },
                      _type:'add',
                      _close: another
                  })

                  if( !another ) {

                    this.submitted = false;
                    this.experienceForm.reset();
                    this.experienceForm.clearValidators();
                    this.toogleFinishDate(false);
                    this.filesAndLinks.saveAndAddAnother();
                  }
   });
}

  editExperience(another?:boolean) {      
  
    if( this.selectedLang &&  this.selectedLang !== 'en' ){
      let input: IUserExperienceTranslation  = {

        experience_id: this.experienceId,
        position: this.experience.position,
        company: this.experience.position,
        description: this.experience.description
      }

         this.langService
          .SaveUserExperienceTranslation(this.selectedLang, input)
           .subscribe( data => {
            this.result.emit({
              id:this.experienceId || data.id_experience,
              // file: this.files, 
              ...this.parseDataToResult,
              location:{
              
                city:{
                  city:this.selectedCity.city,
                  id:this.experienceForm.get('city_id').value,
                },  
                country:{
                  id:this.selectedCountry
                }
              },
              _type:'edit',
              _close: true
            })
    
           })

    }
  else{
    this.experienceService
    .editExperience(this.experienceId , this.experience)
    .pipe(takeUntil(this.destroy$)) 
    .subscribe(({ data } ) => { 
        this.result.emit({
          id:this.experienceId || data.id_experience,
          // file: this.files, 
          ...this.parseDataToResult,
          location:{
          
            city:{
              city:this.selectedCity.city,
              id:this.experienceForm.get('city_id').value,
            },  
            country:{
              id:this.selectedCountry
            }
          },
          _type:'edit',
          _close: true
        })

      
      });
    }
}

  /// Submiting form ///
  submit(form:FormGroup, another?:boolean){
    console.log(this.filesAndLinks.formLinks.value);
    
    this.submitted = true;

    let controls = form.value;

    if(form.valid){

      let  links = this.filesAndLinks.data.links, 
           files = this.files,
           { company , currentlyWork , description , startMonth , startYear, endMonth , endYear ,  position } = controls,
          start_date = (startMonth && startYear) && (startMonth.value !== '' && startYear.value !== '') ?  /// Start date
                       `${startMonth}-${startYear}` : '',
          finish_date = (endMonth && endYear) && (endMonth.value !== '' && endYear.value !== '') ?  /// Finish date
                       `${endMonth}-${endYear}` : '';
        

        this.experience.position = position;
        this.experience.company = company;
        this.experience.start_date = start_date;
        this.experience.finish_date = finish_date;
        this.experience.currently_work = currentlyWork;
        this.experience.description = description;
        this.experience.links = links;
        this.experience.country = this.selectedCountry;
        this.experienceFiles = this.filesAndLinks.data.files || this.files; 
        
        // **************************** Edit or  Add  Experience *************************************

        if(this.data){
          if(files && files.length <= 2){
            // Edit with files 
            this.uploadFile(files);

            
          }
          // Edit without files 
          this.editExperience();
        }else{
          if(files && files.length > 0){
            // Add with files 
            return this.uploadFile(files , another);
          }
          // Add without files 
          return this.addExperiences(another);
        }
    }
  }
  getDate(){
    function _getTime(year: number, month: number): number {
      return new Date(year, month).getTime();
    }
  
   let endMonth = this.experienceForm.get('endMonth').value,
       endYear = this.experienceForm.get('endYear').value,
       startMonth = this.experienceForm.get('startMonth').value,
       startYear = this.experienceForm.get('startYear').value
  
      let startTime = _getTime(startYear, startMonth),
      endTime = _getTime(endYear, endMonth);
  
        if (endMonth && endYear && startMonth && startYear) {
          if (startTime > endTime) {

    this.experienceForm.get('endYear').setErrors({date:true}); 
          }
          else if(startTime ===  endTime){
 
    this.experienceForm.get('endMonth').setErrors({date:true});          
          }
           else {
            this.experienceForm.get('endMonth').setErrors(null);   
            this.experienceForm.get('endYear').setErrors(null)

          }
  
        }  
   }
    ngOnDestroy(){
      this.destroy$.next();
      this.destroy$.complete();

    }
     
  }




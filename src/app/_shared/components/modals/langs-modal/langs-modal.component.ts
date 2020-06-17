import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { RegionService } from 'src/app/_shared/region.service';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IProfileTranslation, ICompanyProfileTranslation } from 'src/app/_shared/models/profile-langs/profileLangs.model';
import { ProfileLangsService } from 'src/app/_shared/services/shared/profile-langs.service';

@Component({
  selector: 'app-langs-modal',
  templateUrl: './langs-modal.component.html',
  styleUrls: ['./langs-modal.component.scss']
})
export class LangsModalComponent implements OnInit {


  @Input() data: IProfileTranslation;


  @Output() langAdded:EventEmitter<string> = new EventEmitter<string>();

  languages:any[]
  language:string = '';

  userForm:FormGroup;
  companyForm:FormGroup;
   
  submited: boolean = false;

  constructor(
    private globalService:GlobalUserProService,
    private regionService:RegionService,
    private langService:ProfileLangsService,
    private f:FormBuilder
  ) { 

    /// User form ///
    this.userForm = f.group({
      firstname:['', Validators.required],
      lastname:['', Validators.required],
      headline:['', Validators.required],
      nickname:[''],
      story:['']
    });

    /// Company form /// 
    this.companyForm = f.group({
      name: ['' , Validators.required],
      mission: [''],
      description: ['']
    })
  }

  ngOnInit() {
    this.languages = this.regionService.getListOfLanguages();
  }



  get cmpform(){
    return this.companyForm.controls
  }

  get usrform(){
    return this.userForm.controls;
  }

  get isCompany(){
    return this.data && this.data.type === 'company';
  }

  get profileId() {
     return this.globalService.getProfileId();
  }


  submit(type:string){
    this.submited = true; 
    /// Company 
    if(type === 'company'){
      let translitions:ICompanyProfileTranslation = {
        ...this.companyForm.value,
        language:this.language
      }
      
      if(this.companyForm.valid && this.language !== ''){
        this.langService
        .SaveCompanyProfileTranslation(this.profileId , translitions)
        .subscribe(
          (data) => {
            this.langAdded.emit(this.language);
            
          }
        )
      }
    }
    /// User
    else{
      let translitions = this.userForm.value;
      if(this.userForm.valid && this.language !== ''){
        this.langService
          .SaveProfileTranslation(this.language , translitions)
          .subscribe(
            (data) => {
              this.langAdded.emit(this.language)
              
            }
          )
      }
    }
  }

  trackByFn =  (index) => index;



}

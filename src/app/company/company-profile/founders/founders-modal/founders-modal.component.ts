import { Component, OnInit, Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CompanyProfileService } from 'src/app/_shared/services/companies/company-profile.service';
import { Observable } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { IFounder } from 'src/app/_shared/models/company/founders.interface';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { AddImageComponent } from 'src/app/_shared/components/add-image/add-image.component';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { PasswordValidation } from 'src/app/_shared/register.validator';

@Component({
  selector: 'app-founders-modal',
  templateUrl: './founders-modal.component.html',
  styleUrls: ['./founders-modal.component.scss']
})
export class FoundersModalComponent implements OnInit {


  @ViewChild(AddImageComponent, { static: false }) image:AddImageComponent;

  @Input() companyID:string;
  @Input() data:IFounder; 

  @Output() result:EventEmitter<IFounder> = new EventEmitter<IFounder>();

  foundersForm:FormGroup;
  profiles:Observable<any>;

  founder:{
    id?:string;
    avatar?:string;
    firstname?:string;
    lastname?:string;
    experiences?:string[];
    skills?:string[]
  };

  newFounder:IFounder = {
    avatar:'',
  };
  submited: boolean;
  manually:boolean = false;
  utils = utilities;
  hasImage:boolean = false;

  constructor(
    private f:FormBuilder,
    private companyService:CompanyProfileService,
    private imageService:ImageUploadService
  ) {
    
    this.foundersForm = this.f.group({
      name: ['', Validators.required],
      position: ['', Validators.compose([ Validators.required , PasswordValidation.detectOnlyEnglishCharacters()])],
    });
  }

  ngOnInit() {
    if(this.data){
      this.patchData();
    }
  }

  remove(){
    if(this.founder && this.companyID){
      this.companyService
          .removeFounder(this.companyID , this.founder.id)
          .subscribe(
            () => {
              this.result.emit({
                id:this.data.id,
                _close:true,
                _type:'delete'
              })
            }
          )
    }
  }

  patchData(){
    let { position_title  , name } = this.data;

    this.founder = this.data;

    this.foundersForm.patchValue({
      name,
      position:position_title
    });
    
  }

  get found(){
    return this.foundersForm.controls;
  }

  search(e){
    let target = e.target,
        value = target.value;

    if(value && value !== ''){
     this.profiles =  this.companyService
                          .searchUsers(value)
                          .pipe(
                            distinctUntilChanged(),
                            map(({data}) =>  data['searchUsers']['profiles'])
                          );
    }else { this.profiles = null }
    
  }

  selectUser(user){
    /// Clear previos position
    this.foundersForm.get('position').reset();

    if(user){
      this.profiles = null;
      this.manually = false;
      
      let experiences = user.experiences.slice(-1),
          skills      = user.skills.map(skill => skill.name),
          firstname   = user.firstname,
          lastname    = user.lastname;

      this.founder = {
        id:user.id,
        avatar:user.avatar,
        experiences,
        firstname,
        lastname,
      };
      
      
      if(experiences[0]) this.foundersForm.get('position').setValue(experiences[0].title);
      
      this.foundersForm.get('name').setValue(`${firstname} ${lastname}`);
    }
    
  }



  
  addManually(){
    this.manually = true;
    this.profiles = null;
    this.found['position'].reset();

    //this.submit();
    
  }

  uploadFile(founderId:string){
    let items = this.image.getFile;
    this.hasImage = true;

    let formData: FormData = new FormData();
   
    formData.append('file', items.originImage);
    
 

    this.imageService
        .uploadFounderImage(this.companyID , founderId , formData)
        .subscribe(
          (data) => {
            let image = data['info'][0];
            return  image ? this.newFounder.avatar = image.url : null;
          },
          (err) => {
            console.log(err);
          },
          () => {
              this.result.emit({
                ...this.newFounder,
                _close:true,
                _type:'add'
              });
          }
        )
  }

  submit(){
    this.submited = true;

    let form = this.foundersForm;


    if(form.valid){

        this.newFounder = {
          id:this.data ? this.data.id : undefined,
          name:form.get('name').value,
          avatar:this.founder ? this.founder.avatar : undefined,
          position_title:form.get('position').value,
          user_id:this.founder ? this.founder.id  : undefined
        }

        /// Edit
        if(this.data){
          this.companyService
              .editFounder(this.companyID,this.newFounder)
              .subscribe(
                () => {
                  this.result.emit({
                    ...this.newFounder,
                    _close:true,
                    _type:'edit'
                  })
                }
              )
        }
        /// Add
        else{
            if(!this.manually || (this.manually && this.image.getFile.file)){
              this.companyService
                .addFounder(this.companyID , this.newFounder)
                .subscribe(
                  ({data}) => {
                    let id = data.AddCompanyFounder.id;
                    this.newFounder.id = id;
            
                    if(this.manually && 
                      (this.image.getFile.file && this.image.getFile.name)){
                      return this.uploadFile(id);
                    }

                    this.result.emit({
                      ...this.newFounder,
                      approved:this.manually,
                      _close:true,
                      _type:'add'
                    });
                    
                    
                  },
                  (err) => console.log(err)
                  
                )
            }
        }
    }
  }

}

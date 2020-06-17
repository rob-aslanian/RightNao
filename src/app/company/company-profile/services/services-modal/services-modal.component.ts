import { Component, OnInit, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from 'src/app/_shared/register.validator';
import { AddImageComponent } from 'src/app/_shared/components/add-image/add-image.component';
import { IService } from 'src/app/_shared/models/company/services.interface';
import { CompanyProfileService } from 'src/app/_shared/services/companies/company-profile.service';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { utilities } from 'src/app/_shared/utilities/utilities';

@Component({
  selector: 'app-services-modal',
  templateUrl: './services-modal.component.html',
  styleUrls: ['./services-modal.component.scss']
})
export class ServicesModalComponent implements OnInit , OnDestroy{

  destroy$:Subject<any> = new Subject<any>();

  @ViewChild(AddImageComponent, { static: true }) image:AddImageComponent;

  @Input() data:IService;
  @Input() comapnyID:string;

  @Output() result:EventEmitter<IService> = new EventEmitter<IService>();

  servicesForm:FormGroup;
  service:IService = {
    id:null,
    image:null,
    name:null,
    website:null
  };
  submited:boolean = false;
  utils = utilities;

  constructor(
    private f:FormBuilder,
    private companyService:CompanyProfileService,
    private imageUploadService:ImageUploadService
  ) {
    this.servicesForm = this.f.group({
      name: ['', Validators.compose([Validators.required , PasswordValidation.detectOnlyEnglishCharacters()])],
      website: ['',  PasswordValidation.detectURL()]
    });
   }

    ngOnInit() {
      if(this.data){
        this.patchData();
      }
    }

    get serv(){
      return this.servicesForm.controls;
    }

    clearForm(){
      this.submited = false;
      this.servicesForm.reset();
      this.servicesForm.clearValidators();
      this.image.clearAll();
      
    }

    patchData(){
      let { name , website } = this.data;
      this.servicesForm.patchValue({
        name,
        website
      });
    }

    removeImage(){
      this.service.image = '';
      this.companyService
          .removeImageInService(this.comapnyID, this.data.id)
          .pipe(takeUntil(this.destroy$))
          .subscribe();
    }

    remove(){
      if(this.comapnyID && this.data.id){
        return this.companyService
                  .removeService(this.comapnyID , this.data.id)
                  .pipe(takeUntil(this.destroy$))
                  .subscribe(
                    () => {

                      if(!this.image.getFile.file){
                        this.removeImage();
                      }

                      this.result.emit({
                        id:this.data.id,
                        _type:'delete',
                        _close:true
                      })
                    }
                  )
      }
    }

    imageUpload(another?:boolean , type?:string){
      
      return this.imageUploadService
                .uploadService(this.comapnyID , this.service.id , this.image.getFile.file)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                  (data) => {
                      let image = data['info'][0];
                      return  image ? this.service.image = image.url : null;
                  },
                  (err) => console.log(err),
                  () => {
                    this.result.emit({
                      ...this.service,
                      _type:type,
                      _close:!another || false
                    });

                    another ? this.clearForm() : null;
                  }
                  
                )
    }

    submit(another?:boolean){

      let form = this.servicesForm;
      this.submited = true;

      if(form.valid && this.comapnyID && this.image.getFile.file){
        let { name  ,  website } = form.value,
            file = this.image.getFile.file,
            imageName = this.image.getFile.name;
            

        this.service.name = name;
        this.service.website = website;

        /// Edit
        if(this.data){
          this.service.image = this.data.image;
          this.service.id = this.data.id;

        let { file , name } = this.image.getFile;

        /// Remove file
        if(!file){
            this.removeImage();
          
        }

        this.companyService
            .editService(this.comapnyID , this.service)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              (data) => {
                /// New image 
                if(file){
                  return this.imageUpload(another, 'edit');
                }
                return this.result.emit({
                  ...this.service,
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
              .addService(this.comapnyID , this.service)
              .pipe(takeUntil(this.destroy$))
              .subscribe(
                ({data}) => {
                  let id = data.AddCompanyService.id;
                  this.service.id = id;

                  /// Exist image
                  if(file && imageName){
                    return this.imageUpload(another , 'add');
                  }

                  another ? this.clearForm() : null;

                  return this.result.emit({
                    ...this.service,
                    _close:!another || false,
                    _type:'add'
                  })
                  
                }
              )
        }

      }
  }
    ngOnDestroy(){
      this.destroy$.next();
      this.destroy$.complete();

    }


}

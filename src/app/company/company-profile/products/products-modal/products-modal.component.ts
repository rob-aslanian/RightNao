import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from 'src/app/_shared/register.validator';
import { IProduct, IProducts } from 'src/app/_shared/models/company/product.interface';
import { CompanyProfileService } from 'src/app/_shared/services/companies/company-profile.service';
import { AddImageComponent } from 'src/app/_shared/components/add-image/add-image.component';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { utilities } from 'src/app/_shared/utilities/utilities';

@Component({
  selector: 'app-products-modal',
  templateUrl: './products-modal.component.html',
  styleUrls: ['./products-modal.component.scss']
})
export class ProductsModalComponent implements OnInit , OnDestroy {

  destroy$:Subject<any> = new Subject<any>();

  @ViewChild(AddImageComponent, { static: true }) image:AddImageComponent;

  @Input() data:IProduct;
  @Input() comapnyID:string;

  @Output() result:EventEmitter<IProduct> = new EventEmitter<IProduct>();

  productsForm:FormGroup;
  product:IProduct = {
    id:null,
    name:null,
    image:null,
    website:null
  };

  submited:boolean = false;
  utils = utilities;

  constructor(
    private f:FormBuilder,
    private companyService:CompanyProfileService,
    private imageUploadService:ImageUploadService
  ) {
    this.productsForm = this.f.group({
      name: ['', Validators.compose([Validators.required , PasswordValidation.detectOnlyEnglishCharacters()])],
      website: ['',  PasswordValidation.detectURL()]
    });

   }

   get prod(){
     return this.productsForm.controls;
   }

  ngOnInit() {
    if(this.data){
      this.patchData();
    }
  }
  
  clearForm(){
    this.submited = false;
    this.productsForm.reset();
    this.productsForm.clearValidators();
    this.image.clearAll();
    
  }


  patchData(){
    let { name , website } = this.data;
    this.productsForm.patchValue({
      name,
      website
    });
  }


  removeImage(){
    this.product.image = '';
    this.companyService
        .removeImageInProduct(this.comapnyID, this.data.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
  }
  
  remove(){
    if(this.comapnyID && this.data.id){
      return this.companyService
                 .removeProduct(this.comapnyID , this.data.id)
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
               .uploadProduct(this.comapnyID , this.product.id , this.image.getFile.file)
               .pipe(takeUntil(this.destroy$))
               .subscribe(
                 (data) => {
                    let image = data['info'][0];
                    return  image ? this.product.image = image.url : null;
                 },
                 (err) => console.log(err),
                 () => {
                  this.result.emit({
                    ...this.product,
                    _type:type,
                    _close:!another || false
                  });

                  another ? this.clearForm() : null;
                 }
                 
               )
  }

  submit(another?:boolean){

     let form = this.productsForm;
     this.submited = true;

     if(form.valid && this.comapnyID && this.image.getFile.file){
        let { name  ,  website } = form.value,
            file = this.image.getFile.file,
            imageName = this.image.getFile.name;
            

        this.product.name = name;
        this.product.website = website;

        /// Edit
        if(this.data){
          this.product.image = this.data.image;
          this.product.id = this.data.id;

        let { file , name } = this.image.getFile;

        /// Remove file
        if(!file){
            this.removeImage();
          
        }

        this.companyService
            .editProduct(this.comapnyID , this.product)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              (data) => {
                /// New image 
                if(file){
                  return this.imageUpload(another, 'edit');
                }
                return this.result.emit({
                  ...this.product,
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
              .addProduct(this.comapnyID , this.product)
              .pipe(takeUntil(this.destroy$))
              .subscribe(
                ({data}) => {
                  let id = data.AddCompanyProduct.id;
                  this.product.id = id;

                  

                  /// Exist image
                  if(file && imageName){
                    return this.imageUpload(another , 'add');
                  }

                  another ? this.clearForm() : null;

                  return this.result.emit({
                    ...this.product,
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

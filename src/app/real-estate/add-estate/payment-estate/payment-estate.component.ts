import { Component, OnInit, ViewChild, QueryList, ViewChildren } from '@angular/core';
import { Observable, merge } from 'rxjs';
import { RegionService } from 'src/app/_shared/region.service';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { PaymentBoxComponent } from './payment-box/payment-box.component';
import { EstateFormService } from '../Service/estate-form.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RealEstateService } from '../Service/real-estate.service';
import { FileUploadService } from 'src/app/_shared/services/file-upload.service';
import { Router } from '@angular/router';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-payment-estate',
  templateUrl: './payment-estate.component.html',
  styleUrls: ['./payment-estate.component.scss']
})
export class PaymentEstateComponent implements OnInit {
  
  @ViewChildren( PaymentBoxComponent  ) _box: QueryList<PaymentBoxComponent>;

  $countries: Observable<any>;
  utils = utilities;
  payment: FormGroup;
  expire_days: string = '90';

  constructor(
    private regionService: RegionService,
    private estateFormService: EstateFormService,
    private estateService: RealEstateService,
    private fb: FormBuilder,
    private fileUploadService: ImageUploadService,
    private router: Router 
  ) { 
      this.payment = fb.group({
            country: ['GE',    Validators.required ],
            currency: ['ALL',  Validators.required ]
      })
   }

  ngOnInit() {
     this.$countries = this.regionService.Countries;   
 
  }

  makeActive(e: any, index: any ) {   
    this.expire_days = e.price; 
       this._box.map( (box, i) => {
            if( i !== index ) {              
                   box.isSelected = false; 
            } 
       } )
  };

  save() {
      const formData = new FormData();
      console.log(this.estateFormService.files.getValue());
      
      this.removeDimensions(this.estateFormService
                                .files.getValue())
                                .map( (file: Blob) => formData.append('file', file) )

      const input =  this.estateFormService.formInput.getValue();

      input['rental_info']['expired_days'] = +this.expire_days;
      input['rental_info']['post_currency'] = this.payment.get('currency').value;
 
   
      this.estateService
          .addRealEstate( input )
          .pipe(
             map(({ data }) => data['AddRealEstate']),
             switchMap( ({ id } ) => this.fileUploadService.uploadFiles(id, formData, 'real_estate/'))
          ).subscribe( data => this.router.navigateByUrl('/real-estate/landing/DealType_Any'),
                      err => this.router.navigate(['/real-estate', 'add-estate']) );

  }

  removeDimensions( images: any[] ) {
    const files = [];
         for (let index = 0; index < images.length; index++) {
                for (let j = 0; j < images[index].length; j++) {
                          if(images[index][j]['file'] && images[index][j]['file']['name']) {
                            files.push(images[index][j]['file'])
                          }
                }
         }
    return files;
  };
}

import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { RegionService } from 'src/app/_shared/region.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { Router } from '@angular/router';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { ObservableInput } from 'rxjs';
import { PaymentBoxComponent } from 'src/app/real-estate/add-estate/payment-estate/payment-box/payment-box.component';
import { AddAdsService } from '../add-ads.service';
import { AdsServicesService } from '../../ads-services.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  @ViewChildren( PaymentBoxComponent  ) _box: QueryList<PaymentBoxComponent>;

  $countries: ObservableInput<any>;
  utils = utilities;
  payment: FormGroup;
  expire_days: string = '90';

  constructor(
    private regionService: RegionService,
    private fb: FormBuilder,
    private fileUploadService: ImageUploadService,
    private router: Router,
    private addService:AddAdsService,
    private adsService:AdsServicesService
  ) {
    this.payment = fb.group({
      country: ['GE',    Validators.required ],
      currency: ['ALL',  Validators.required ]
    })
   }

  ngOnInit() {
    this.$countries = this.regionService.Countries; 
  }


  save() {
    const formData = new FormData();
    console.log(this.addService.files.getValue());
    
    this.removeDimensions(this.addService
                              .files.getValue())
                              .map( (file: Blob) => formData.append('file', file) )

    const input =  this.addService.addForm.value;
    input['phones'].forEach(el => el['country_code_id'] = +el['country_code_id']);
    input['expired_days'] = +this.expire_days;
    input['post_currency'] = this.payment.get('currency').value;
    console.log('input', input);
 
    this.adsService
        .AddAdService( input )
        .pipe(
           map(({ data }) => data['AddAdService']),
           switchMap( ({ id } ) => this.fileUploadService.uploadAdsServiceImage( formData, id))
        ).subscribe( data => console.log(data),
                    err => console.log(err) );

}

  makeActive(e: any, index: any ) {   
    this.expire_days = e.price; 
       this._box.map( (box, i) => {
            if( i !== index ) {              
                   box.isSelected = false; 
            } 
       } )
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
  }

}

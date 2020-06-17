import { PaymentBoxComponent } from 'src/app/real-estate/add-estate/payment-estate/payment-box/payment-box.component';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { RegionService } from 'src/app/_shared/region.service';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { Component, OnInit, QueryList, ViewChildren, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
 

@Component({
  selector: 'app-payment-sale',
  templateUrl: './payment-sale.component.html',
  styleUrls: ['./payment-sale.component.scss']
})
export class PaymentPetsComponent implements OnInit {

  @ViewChildren( PaymentBoxComponent  ) _box: QueryList<PaymentBoxComponent>;

  $countries: Observable<any>;
  utils = utilities;
  payment: FormGroup;
  expire_days: string = '90'; 

  @Output() result: EventEmitter<any> = new EventEmitter<any>();
  
  constructor(
    private regionService: RegionService,
    private fb: FormBuilder,
    private fileUploadService: ImageUploadService,
    private gu: GlobalUserProService
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


  parseData() {
   
  };

  back() {
     this.result.emit();
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

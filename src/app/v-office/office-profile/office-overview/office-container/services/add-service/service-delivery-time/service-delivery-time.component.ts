import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
 
import { utilities } from 'src/app/_shared/utilities/utilities';
import { deliveryTime,  price, modelText } from 'src/app/v-office/_shared/services.utils';

 
@Component({
  selector: 'app-service-delivery-time',
  templateUrl: './service-delivery-time.component.html',
  styleUrls: ['./service-delivery-time.component.scss',
               '../../../../../../_shared/style.scss']
})
export class ServiceDeliveryTimeComponent implements OnInit {

  @Input () delivery: FormGroup;

  @Input() set sumbitted( sub: boolean ) {
       this.isSubmited = sub;
  }
  @Input() type: string = 'office';

  price = price;
  priceKeys = Object.keys(price);
  deliveryTimeKeys = Object.keys(deliveryTime);
  deliveryTime = deliveryTime;
  utils = utilities;
  currency: string[]
  isSubmited: boolean = false;
  selectedModel: any = {};
  modelText = modelText;
  getToday = utilities.getToday();

  constructor() { }
  

  //Get Controls
  get pri() {
     return this.delivery.controls
  }

  ngOnInit() {
  
    
    this.selectedModel = modelText[this.type];

                 //  Clear Validators on Checkbox ValueChanges //
    this.delivery
      .get("price")
        .valueChanges
          .subscribe( price => {                
                if( price === 'Price_Negotiable' ) {
                      this.delivery.get('hourly').setValidators([Validators.required]);
                      this.delivery.get('hourly').updateValueAndValidity();
                } else {
                      this.delivery.get('hourly').clearValidators();
                      this.delivery.get('hourly').updateValueAndValidity();
                }    
    })
     this.currency =  this.utils.getAllCurency();
  }

}

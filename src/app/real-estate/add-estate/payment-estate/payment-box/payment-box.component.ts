import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JobMetaDays } from 'src/app/jobs/models/postJobmodels';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-payment-box',
  templateUrl: './payment-box.component.html',
  styleUrls: ['./payment-box.component.scss']
})
export class PaymentBoxComponent implements OnInit {

  @Input()
   price: string;
  @Input()
   days: string;
 

  @Output() 
      result: EventEmitter<any> = new EventEmitter<any>();

  JobMetaDays = JobMetaDays;
  
  @Input() 
     isSelected: boolean = false; 
  

  constructor() { }

  ngOnInit() {  };

  makeActive( ) {
      if( this.price === 'Custom' && !this.isSelected) {
             this.result.emit({ _case: 'active', price: '90' });
      } else if( this.price !== 'Custom' && !this.isSelected ) {
        this.result
            .emit({
                   _case: 'active', 
                    price: this.days.split(' ')[0]
            })
      }
      this.isSelected =  true;

  }

  dayss(e: any): any {   
     this.result.emit({ _case: 'active',  price: e });
  }
  
}

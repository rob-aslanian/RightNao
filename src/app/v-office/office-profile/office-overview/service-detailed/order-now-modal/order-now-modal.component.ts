import { Component, OnInit, OnDestroy, ViewChild, Input, Output, EventEmitter } from '@angular/core';
 import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { OfficeService } from 'src/app/_shared/services/v-office/office.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
 
 
 

@Component({
  selector: 'app-order-now-modal',
  templateUrl: './order-now-modal.component.html',
  styleUrls: ['./order-now-modal.component.scss']
})
export class OrderNowModalComponent implements OnInit {
  
  @Input() orderService: any;
  @Output() result: EventEmitter<any> = new EventEmitter<any>();
  
  delivery: FormGroup;
  files: Blob[] = [];
  submitted: boolean = false;
  activeProfileId: string = '';
  isCompanyActive: boolean = false;
  descriptionCtrl: FormControl;


  constructor(
    private fb: FormBuilder,
    private imageUploadService: ImageUploadService,
    private officeService: OfficeService,
    private globalUserProService: GlobalUserProService
  ) {
       this.delivery = fb.group({
            time: ['Up_To_24_Hours', Validators.required],
            price: ['Price_Fixed', Validators.required],
            amount: ['', Validators.required],
            hourly: [''],
            currency: ['USD', Validators.required],
            date: ['']
      })

    this.descriptionCtrl = new FormControl('');

   }

  ngOnInit() { 
      this.isCompanyActive = this.globalUserProService.isCompanyActive();

      this.activeProfileId = this.globalUserProService.getProfileId();
  }

  getFiles( files: any ) {
     if( files.case === 'add' )  this.files = files['files'];
  }

  submit() {

    this.submitted = true;
    if( this.delivery.get('time').value !== "Custom" ) {
        this.delivery.get('date').clearValidators();
        this.delivery.get('date').updateValueAndValidity();
    } else if( this.delivery.get('time').value === "Custom"  ) {
        this.delivery.get('date').setValidators([ Validators.required ]);
        this.delivery.get('date').updateValueAndValidity();
    }
        
    const { price, amount, currency, time, hourly, date } = this.delivery.controls;

    if( this.delivery.invalid ) return;
    
     const input = {
      owner_id: this.orderService.owner_id ,
      service_id: this.orderService.service_id,
      office_id: this.orderService.office_id,
      is_owner_company: this.orderService.is_owner_company,
      order_details: {
          profile_id: this.activeProfileId,
          is_company: this.isCompanyActive,
          description: this.descriptionCtrl.value,
          price_type: price.value,
          price_amount: price.value !== 'Price_Negotiable' ? amount.value : 0,
          currency: currency.value,
          min_price: price.value === 'Price_Negotiable' ? amount.value : 0,
          max_price: price.value === 'Price_Negotiable' ? hourly.value : 0,
          delivery_time: time.value,
          custom_date: time.value === 'Custom' ? `${date.value.day}-${date.value.month}-${date.value.year}` : undefined
      }
     };

     const formData: FormData = new FormData();

     this.files.map( (file: Blob) => formData.append('file', file['blob']) );

     this.officeService
      .orderVOffficeService( input ).pipe(
        switchMap( ( id: string ) =>  this.imageUploadService.uploadVOfficeServiceOrderFiles(  id, formData  ), )
      ).subscribe( () => this.result.emit() );
  }
  
  
}

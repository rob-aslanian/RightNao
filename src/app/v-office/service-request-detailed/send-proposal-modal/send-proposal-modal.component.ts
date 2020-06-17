import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OfficeService } from 'src/app/_shared/services/v-office/office.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';

@Component({
  selector: 'app-send-proposal-modal',
  templateUrl: './send-proposal-modal.component.html',
  styleUrls: ['./send-proposal-modal.component.scss']
})
export class SendProposalModalComponent implements OnInit {

  @Input() request: any ;
  proposal: FormGroup;
  days: number[] = [];
  day: number = 1;
  submitted: boolean = false;
  isCompanyActive: boolean = false;
  activeProfileId: any;
  services: any[] = [];
  @Output() result: EventEmitter<any> = new EventEmitter<any>();



  constructor(
    private fb: FormBuilder,
    private officeService: OfficeService,
    private globalUserProService: GlobalUserProService
  ) {
      this.proposal = fb.group({
        serviceId: ['', Validators.required],
        delivery: this.fb.group({
           time: ['Up_To_24_Hours', Validators.required],
           price: ['Price_Fixed', Validators.required],
           amount: ['', Validators.required],
           hourly: [''],
           currency: ['USD', Validators.required],
           date: ['']
        }),
        description: [''],
        expDate: ['1'],
        service: ['']
      })

    this.isCompanyActive = this.globalUserProService.isCompanyActive();
    this.activeProfileId = this.globalUserProService.getProfileId();

  }

  get deliverCtrls() {
      return this.proposal.get('delivery') as FormGroup;
  }

  ngOnInit() {

    // Remove validators or set  on price type change
    this.deliverCtrls.get('price')
    .valueChanges.subscribe( val  => {
        if( val  === 'Price_Negotiable' )  {
             this.deliverCtrls.get('hourly').setValidators([Validators.required]);
             this.deliverCtrls.get('hourly').updateValueAndValidity();
        } else {
            this.deliverCtrls.get('hourly').clearValidators();
            this.deliverCtrls.get('hourly').updateValueAndValidity();
        }
    })

     this.getStartDays();
     this.officeService
        .GetAllServices().subscribe( ( services ) => this.services = services  ); }

  getStartDays() {
       while( this.day < 30 ) {
             this.day++;
             this.days.push( this.day );
       }

  }

  submitForm() {
    this.submitted = true;
    console.log(this.proposal);

    if( this.deliverCtrls.get('time').value !== "Custom" ) {
          this.deliverCtrls.get('date').clearValidators();
          this.deliverCtrls.get('date').updateValueAndValidity();
    } else if( this.deliverCtrls.get('time').value === "Custom"  ) {
          this.deliverCtrls.get('date').setValidators([ Validators.required ]);
          this.deliverCtrls.get('date').updateValueAndValidity();
    }

    if( this.proposal.invalid ) return;

    const { price, amount, currency, time, hourly, date } = this.deliverCtrls.controls;

    const input = {
      ...this.request,
      proposal_detail: {
            profile_id: this.activeProfileId,
            is_company: this.isCompanyActive,
            service_id: this.proposal.get('service').value.id,
            office_id: this.proposal.get('service').value.officeID,
            message: this.proposal.get('description').value,
            price_type: price.value,
            price_amount: price.value !== 'Price_Negotiable' ? amount.value : 0,
            currency: currency.value,
            min_price: price.value === 'Price_Negotiable' ? amount.value : 0,
            max_price: price.value === 'Price_Negotiable' ? hourly.value : 0,
            delivery_time: time.value,
            custom_date: time.value === 'Custom' ? `${date.value.day}-${date.value.month}-${date.value.year}` : undefined,
            expertaion_time: +this.proposal.get('expDate').value
       }
     };

    this.officeService
         .SendProposalForServiceRequest(input).subscribe( () => this.result.emit() );
  }

  setService( { target } ) {
       const selectedService = this.services.filter( ( service ) => service.id === target.value )[0];

       this.proposal.get('service').patchValue({
            id: selectedService.id,
            officeID: selectedService.id
       })


  }
}

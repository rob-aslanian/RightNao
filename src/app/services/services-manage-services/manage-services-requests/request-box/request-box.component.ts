import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ServicesService } from 'src/app/services/services.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { deliveryTime } from 'src/app/v-office/_shared/services.utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-request-box',
  templateUrl: './request-box.component.html',
  styleUrls: ['./request-box.component.scss']
})
export class RequestBoxComponent implements OnInit {


  @Input() profileInfo; 

  isCompanyActive: boolean = false;
  deliveryTime = deliveryTime ;
  isActivated:boolean = false;
  @Input() item: any;
  
  @Output() result: EventEmitter<any> = new EventEmitter<any>();
 

  constructor(
    private servicesService: ServicesService,
    private globalUserProService: GlobalUserProService,
    private router: Router
  ) {
        this.isCompanyActive = globalUserProService.isCompanyActive();
   }

  ngOnInit() {
      console.log(this.item);

   }
  
    //  * * * M u t a t i o n s * * * 
  removeServicesRequest(reqId: string ) {
    return this.servicesService
               .removeServicesRequest(reqId)
               .subscribe(data => this.result.emit( reqId ) );

  }

  changeServicesRequestStatus( service_id: string, status: string ) {
    this.servicesService
        .ChangeServicesRequestStatus(service_id, status )
        .subscribe( data =>  this.item['status'] = status );
  }

  navigateToServiceDetailed( e: any ){

    console.log(e.target.classList);
      if( this.item.status === 'status_draft' || 
          this.item.status === 'status_paused' || 
          this.item.status === 'status_closed' ||
          e.target.classList.contains('dropdown-toggle') || 
          e.target.classList.contains('dropdown-item')   ) return ;
 
    this.router.navigate(['/v-office', 'service-request-detailed', this.item.id ]);
      
  }

  }

    

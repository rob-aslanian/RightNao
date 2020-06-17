import { Component, OnInit, ViewChild } from '@angular/core';
import { OfficeService } from 'src/app/_shared/services/v-office/office.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';


@Component({
  selector: 'app-manage-services-orders',
  templateUrl: './manage-services-orders.component.html',
  styleUrls: ['./manage-services-orders.component.scss']
})
export class ManageServicesOrdersComponent implements OnInit {
   
  @ViewChild( AppModalComponent, { static: true } ) _modal: AppModalComponent
  
  profileId: string ;
  orders: any[] = [];
  modalType: ( string  | null )= '';
  profileInfo: any = {};

  constructor(
    private officeService: OfficeService,
    private globalUserProfileService: GlobalUserProService
  ) {
      this.profileId = this.globalUserProfileService.getProfileId();
   }
 
  ngOnInit() {


     this.officeService
         .getServiceOrders( this.profileId, 'buyer', 'any', 0 ).subscribe(
            ( orders  ) => this.orders = orders['orders']
         )
  }

  getResult( e ) {
 
     if( e._case === 'review' ) {
          const { profileInfo, orderId }  = e;
          this.profileInfo = profileInfo;
          this._modal.title = 'Write a Review' ;
          this.modalType = 'review';
          this._modal.open();
     }
    
  }

  getResultFromReview( review: any ) {
 
      this.officeService
         .WriteReviewForService(
                this.profileInfo.service_id,
                this.profileInfo.office_id,
                this.profileInfo.id,
                review 
         ).subscribe( () => this._modal.close() )
        
  }


}

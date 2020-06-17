import { Component, OnInit, OnDestroy, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { OfficeService } from 'src/app/_shared/services/v-office/office.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { OrderBoxComponent } from 'src/app/_shared/components/order-box/order-box.component';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-v-office-orders',
  templateUrl: './v-office-orders.component.html',
  styleUrls: ['./v-office-orders.component.scss']
})
export class VOfficeOrdersComponent implements OnInit, OnDestroy {

  profileId: string  = '';
  officeId: string = '';
  newOrders: any[] = [];
  orders: any[] = [];
  orderLength: number = 0;
  $after: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  after: number = 0;
  page: number = 0;
  $destroy: Subject<any> = new Subject<any>();
  modalType: ( string | null ) = '';
  selectedReviewToWrite: any = {};

  @ViewChildren( OrderBoxComponent ) orderboxes: QueryList<OrderBoxComponent>;
  @ViewChild( AppModalComponent, { static: false } ) _modal: AppModalComponent;
  
  constructor(
     private officeService: OfficeService,
     private globalUserProService: GlobalUserProService,
     private activatedRoute: ActivatedRoute
  ) {
      
   }

  ngOnInit() {

     this.profileId = this.globalUserProService.getProfileId();
        
     this.officeId =  this.activatedRoute.parent.snapshot.params['officeId'];
     
     this.officeService
       .getServiceOrders( this.profileId, 'seller', 'new', 0, this.officeId  ).pipe(
         takeUntil( this.$destroy )
       ).subscribe( ( orders: any ) => this.newOrders = orders['orders'] );

      this.$after.subscribe( ( after: number ) => {
        this.officeService
        .getServiceOrders( this.profileId,  'seller', 'any', after, this.officeId ).pipe(
          takeUntil( this.$destroy )
        ).subscribe( ( orders: any ) => {
              this.orders = orders['orders']
                  .filter( order => order.status !== 'new' );     
              this.orderLength = orders['order_amount'];                      
          } );
      } )
    
  }

  getResult( e: any ) {
     const { _case, orderId } = e;
       if( _case === "cancel" || _case === "accept" ) {
         if(_case === "accept" ) {
              const selectedOrder = this.newOrders.filter( order => order.id === orderId )[0];
              selectedOrder['status'] = _case === "accept"  ?  'in_progress' : 'canceled';                           
              this.orders.unshift( selectedOrder );                     
          }
           this.newOrders = this.newOrders.filter( order => order.id !== orderId );
       }
       if( _case === 'toggle' ) {
           this.toggleView( orderId )
       }  
       if( _case === 'review' ) {
           this.selectedReviewToWrite = e.profileInfo;
           this._modal.title = 'Write a Review';
           this.modalType = 'review';
           this._modal.open();
       }
  }

  toggleView( orderId ) {
        this.orderboxes.map(
           ( orderBoxInstance ) => {
               if( orderBoxInstance.order.id !== orderId ) {
                   if(orderBoxInstance.toggledDetailedView) {
                        orderBoxInstance.toggledDetailedView = false;
                   } 
               }
           }
        )
  }

  changePage( e: any ) {
    
  }
  ngOnDestroy(): void {
      this.$destroy.next();
      this.$destroy.complete();
  }

  getWrittenReview( review: any ) {
 
    const { id, isCompanyActive } = this.selectedReviewToWrite;
     
     this.officeService
     .WriteReviewForServiceRequest( id, isCompanyActive, review )
     .subscribe( 
         () => this._modal.close()
      )
     
  }
}

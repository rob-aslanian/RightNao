import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { order_status } from '../../models/service/v-office/v-office-model';
import { OfficeService } from '../../services/v-office/office.service';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { deliveryTime } from 'src/app/v-office/_shared/services.utils';
import { UtilsService } from '../../services/shared/utils.service';
import { GlobalUserProService } from '../../services/global-user-pro.service';
import { AppComponent } from 'src/app/app.component';
import { map } from 'rxjs/operators';

 

@Component({
  selector: 'app-order-box',
  templateUrl: './order-box.component.html',
  styleUrls: ['./order-box.component.scss']
})

export class OrderBoxComponent implements OnInit {

   @Input() order;
   @Input() type: order_status;
   @Input() serviceType: string = 'office';
   toggledDetailedView: boolean = false;
   @Output() result: EventEmitter<any> = new EventEmitter<any>();
   note: string = '';
   deliveryTime = deliveryTime;
   isCompanyActive: boolean = false;
   activeProfile: any = {};
   profileInfo: any  = {};
   dueOn: string ;
 

  constructor(
    private officeService: OfficeService,
    private utilsService: UtilsService,
    private globalUserProService: GlobalUserProService,
    private appComponent:AppComponent,
  ) { }

 

  ngOnInit() { 
        this.note = this.order.note;
        
        this.isCompanyActive = this.globalUserProService.isCompanyActive();
        
        if(this.order.delivery_time) this.getDays( this.order.delivery_time );

        this.activeProfile = this.isCompanyActive ?
                             this.globalUserProService.getCompanyProfile() :
                             this.globalUserProService.getUserProfile();       
        
        this.parseProfileInfo()
  }

  declineOrder( orderId: string, type: string  ) {
     const mutation = type === 'new' ?  
                               this.officeService.DeclineServiceOrder( orderId ) :
                               this.officeService.CancelServiceOrder( orderId );

      mutation.subscribe( () => this.result.emit({ _case:  'decline', orderId: orderId }) );
      if( type !== 'new' ) this.order['status'] = 'canceled';

  }

  acceptOrder( orderId: string , serviceId: string ) {

    this.officeService
      .AcceptOrderService( serviceId, orderId )
      .subscribe( () => this.result.emit({ _case: 'accept', orderId: orderId }) );
  }

  devliverServiceOrder( orderId: string, serviceId: string ) {
        this.officeService
         .deliverServiceOrder( orderId ).subscribe( data => this.order.status = 'delivered' );
  }

  toggleView( event ) {
    const { target } = event;
    if( target.classList.contains('form-control') || target.classList.contains('dropdown-toggle') ) return;
    
      this.toggledDetailedView = !this.toggledDetailedView;
      this.result.emit({ _case: 'toggle', orderId: this.order.id })
  }

  handleModelChange( text: string, dropTemplRef: NgbDropdown ) {    
       this.officeService
       .AddNoteForOrderService( this.order.id, text ).subscribe( () => {
              this.order.note = text;
              dropTemplRef.close();
        })
  };

  message( {id, name, avatar }, isCompany: boolean ) {
       
       const mutation = this.isCompanyActive ?
                        //Company
                        this.utilsService.openSmallChatBoxForComapny({
                             avatar: avatar,
                             companyId: this.globalUserProService.getComapnyId(),
                             id,
                             name: name
                        }, isCompany ).pipe( map( ( { data } ) => data.CreateConversationForCompany.id )  ) : 
                        // User
                        this.utilsService.openSmallChatBox({
                             avatar: avatar,
                             id,
                             name: name
                        }, isCompany ).pipe( map( ( { data } ) => data.CreateConversation.id )  )
                        
      mutation.subscribe( ( id ) => this.appComponent.addChatBox(id) );
  }

  parseProfileInfo() {
        if( this.order.company_profile['id']) {
          console.log(this.order.company_profile['id']);
          
            this.profileInfo = {
                avatar: this.order.company_profile['avatar'],
                id: this.order.company_profile['id'],
                name: this.order.company_profile['name'],
                url: this.order.company_profile['url'],
                isCompanyActive: true,
                location: this.order.company_profile.addresses
            };
      } else {
            this.profileInfo = {
                  avatar: this.order.user_profile['avatar'],
                  id: this.order.user_profile['id'],
                  name: `${this.order.user_profile['firstname']} ${this.order.user_profile['lastname']}`,
                  url: this.order.user_profile['url'],
                  isCompanyActive: false,
                  location: {
                     country: this.order.user_profile.location.country,
                     city: this.order.user_profile.location.city,
                  }
              }
      }
  }

  CancelDeliverdServiceOrder( orderId: string ) {
      this.officeService
          .CancelDeliverdServiceOrder( orderId ).subscribe( () => this.order.status = 'in_progress' );
  }

  AcceptDeliverdServiceOrder( orderId: string ) {
      this.officeService
          .AcceptDeliverdServiceOrder( orderId ).subscribe( () => this.order.status = 'completed' );
  }

  writeReview() {
     this.result.emit({
         profileInfo:{...this.profileInfo, office_id: this.order.service.officeID, service_id: this.order.service.id },
            orderId: this.order.id,
         _case: 'review'
     })
  }

  getDays( deliveryTime: string ) {
 
   
     const currectDate = new Date(),
           year = currectDate.getUTCFullYear(),
           day  = currectDate.getUTCDate(),
           month = currectDate.getUTCMonth() + 1;

      switch ( deliveryTime ) {
        case 'Up_To_24_Hours': {
              return this.dueOn = this.getDate(year, month, day + 2);
        }
          
        case 'Up_To_3_Days': {
              return this.dueOn = this.getDate(year, month, day + 4);                 
        }

        case 'Up_To_7_Days': {
              return this.dueOn = this.getDate(year, month, day + 8);          
          
        }
        case 'Weeks_1_2': {
              return this.dueOn = this.getDate(year, month, day + 15);            
          
        }
        case 'Weeks_2_4': {
              return this.dueOn = this.getDate(year, month, day + 29);            
          
        }
        case 'Month_And_More': {
              return this.dueOn = 'Month and more';           
              
        }
        default: {
           return day;
        }
        
      }
      
  }

  getDate( year: number, month: number , day: number ) {
     const selectedDate  = new Date( year, month, day );
     return `${selectedDate.getUTCDate()}.0${selectedDate.getUTCMonth()}.${selectedDate.getUTCFullYear()}`;
  }

}

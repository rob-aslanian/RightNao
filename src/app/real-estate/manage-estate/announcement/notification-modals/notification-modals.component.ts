import { Component, OnInit, Input } from '@angular/core';
import { RealEstateService } from 'src/app/real-estate/add-estate/Service/real-estate.service';
import { Observable } from 'rxjs';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-notification-modals',
  templateUrl: './notification-modals.component.html',
  styleUrls: ['./notification-modals.component.scss']
})
export class NotificationModalsComponent implements OnInit {

  isOffers: boolean = true;
  isLoading: boolean = true;
  @Input()  
  notifications: { id: string, isDisabledAlert: boolean , isDisabledOffers: boolean };
     
  amount: number = 0;
  data: any[] = [];
  isCompany: boolean = false;
  companyId: string;
  isCheced: boolean = false;

  constructor(
    private realEstateService: RealEstateService,
    private utilsService:  UtilsService,
    private globalUserService: GlobalUserProService,
    private appComponent: AppComponent,

  ) {
     this.isCompany = globalUserService.isCompanyActive();
     this.companyId = globalUserService.getComapnyId();
   }

  ngOnInit() {
       this.handleSwitchTabs(true);
       this.isCheced = this.notifications.isDisabledOffers;
    
  }


  GetRealEstateAlertsByID(): Observable<any> {
    return this.realEstateService
               .GetRealEstateAlertsByID( this.notifications.id, 0 )
  };

  GetRealEstateOffersByID(): Observable<any> {
    return this.realEstateService
               .GetRealEstateOffersByID( this.notifications.id, 0 )
 };

 handleSwitchTabs( isOffer: boolean )  {
        this.isCheced = isOffer ? this.notifications.isDisabledOffers : this.notifications.isDisabledAlert;
        console.log(this.isCheced);
        
        this.isOffers = isOffer;
        (this.isOffers ? this.GetRealEstateOffersByID() :
                         this.GetRealEstateAlertsByID())
                             .subscribe( data =>{ this.amount = data['amount'] ; this.isLoading = false; this.data = data['offers'] } );
 }
 
 sendMessage( isCompany: boolean , profile: any ) {
    
    ( !isCompany ?   
        this.utilsService
            .openSmallChatBox({
              id: profile.id,
              avatar: profile.avatar,
              name: isCompany ? profile.name : `${profile.firstname} ${profile.lastname}`
            }, isCompany ) : 
        this.utilsService
            .openSmallChatBoxForComapny({
              id: profile.id,
              avatar: profile.avatar,
              name: isCompany ? profile.name : `${profile.firstname} ${profile.lastname}`,
              companyId: this.companyId
            }, isCompany ) ).subscribe( ({ data }) => {
                  let chatId = data.CreateConversation ? 
                            data.CreateConversation.id  :  /// User 
                            data.CreateConversationForCompany.id; /// Company 
                this.appComponent.addChatBox(chatId);
            } )
                    
 }

 handletoggle() {
      (this.isOffers ?
       this.realEstateService
           .ToggleRealEstateOffers( this.notifications.id, !this.notifications.isDisabledOffers ) :
       this.realEstateService 
           .ToggleRealEstateAlert( this.notifications.id,  !this.notifications.isDisabledAlert ))
           .subscribe( () => this.isOffers ? this.notifications.isDisabledOffers = !this.notifications.isDisabledOffers : 
                                             this.notifications.isDisabledAlert = !this.notifications.isDisabledAlert  )
 };
}

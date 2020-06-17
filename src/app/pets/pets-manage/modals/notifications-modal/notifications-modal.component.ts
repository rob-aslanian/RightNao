import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { PetService } from 'src/app/pets/pet.service';
import { BehaviorSubject } from 'rxjs';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { AppComponent } from 'src/app/app.component';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';

@Component({
  selector: 'app-notifications-modal',
  templateUrl: './notifications-modal.component.html',
  styleUrls: ['./notifications-modal.component.scss']
})
export class NotificationsModalComponent implements OnInit {
  @Input() pet;
  @Output() onClose:EventEmitter<boolean> = new EventEmitter<boolean>();

  data;
  isOffers: boolean = true;
  isLoading: boolean = false;

  first:number = 10;
  amount:number = 0;
  after:BehaviorSubject<string> = new BehaviorSubject<string>('0');
  page:number = 0;

  isCompany: boolean = false;
  companyId: string;


  
  
  
  

  constructor(
    private petService:PetService,
    private utilsService:UtilsService,
    private appComponent:AppComponent,
    private globalUserService: GlobalUserProService
  ) {
    this.isCompany = globalUserService.isCompanyActive();
     this.companyId = globalUserService.getComapnyId();
   }

  ngOnInit() {
    console.log('from not', this.pet);
    this.getAlertsOffers();
  }

  handleSwitchTabs(action) {
    this.isOffers = action;
    this.getAlertsOffers();
  }


  getAlertsOffers(){
    let pagination = {
      first: this.first,
      after: '0'
    };
    let mutate = this.isOffers ? this.petService.GetPetsPlantsOffersByID(this.pet.id, pagination) : 
                                  this.petService.GetPetsPlantsAlertsByID(this.pet.id, pagination);
    mutate.subscribe( data => { console.log(data);
                                this.amount = data['amount'];
                                this.data = data[ this.isOffers ? 'offers' : 'alerts' ]; } );
                                
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

  toggleNotifications(e){
    let mutate = this.isOffers ? this.petService.TogglePetsPlantsOffers(this.pet.id, e.target.checked) :
                                  this.petService.TogglePetsPlantsAlert(this.pet.id, e.target.checked);
    mutate.subscribe(data => console.log(e.target.checked));
  }

}

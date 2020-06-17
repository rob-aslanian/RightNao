import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserLandingPageServiceService } from '../user-landing-page-service.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { AppComponent } from 'src/app/app.component';
import { Observable } from 'rxjs';
import { NetworkService } from 'src/app/_shared/services/filters/network-service.service';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile-landing-active-connections',
  templateUrl: './user-profile-landing-active-connections.component.html',
  styleUrls: ['./user-profile-landing-active-connections.component.scss']
})
export class UserProfileLandingActiveConnectionsComponent implements OnInit, OnDestroy {

  activeConnections: [] = [];
  allConnections: [] = [];  
  isCompanyActive: boolean; 
  companyId: string; 
  userID: string; 

  constructor(
    private landingService :UserLandingPageServiceService, 
    private globalUserProService: GlobalUserProService, 
    private appComponent: AppComponent,
    private networkservice: NetworkService,
    private userProfService: UserProfileService
  ) { }

  ngOnInit() {
   
    this.isCompanyActive = this.globalUserProService.isCompanyActive(); 

    if (this.isCompanyActive) {
      this.companyId = this.globalUserProService.getCompanyProfile()['id'];
    }else {
      this.userID = this.globalUserProService.getUserProfile()['id']; 

      
    }; 

    // this.getActiveConnections();  
    this.getConnectionsOfUser(); 

    

   
    
  }

  getActiveConnections() {
    return this.landingService
               .getActiveConnections()
               .subscribe(data => {
                 this.activeConnections = data['data']['GetActiveConnections']; 
                 console.log(this.activeConnections);
              
               }); 
  }; 

  getConnectionsOfUser() {
    return this.landingService
               .getConnectionsOfUser(this.userID)
               .pipe(
                 map(({data}) => data['getConnectionsOfUser'] )
               )
               .subscribe(data => {
                this.allConnections = data['profiles']; 
                console.log(this.allConnections);
                 
               }, err => {
                 console.log(err);
                
               })
  }

  openSmallChatBox(user) {
    let fullName:string = user.firstname + ' ' + user.lastname;

    this.networkservice.openChat( fullName, user.avatar, user.id )
                      .subscribe(({data}) => {
                          let chatId = data.CreateConversation.id;
                          this.appComponent.addChatBox(chatId);
                      }, err => {
                        console.log(err);
        
                      });
     }; 

  openSmallChatBoxCompany(user) : void {
  let   { avatar , firstname , lastname , id } = user  
  let companyId = this.globalUserProService.getComapnyId(); 

  this.userProfService
      .openSmallChatBoxForComapny({
          avatar , 
          name: `${firstname} ${lastname}` , 
          id , 
          companyId
        }) 
        .subscribe( data => {
          const chatID = data['data']['CreateConversationForCompany']['id']; 
          this.appComponent.addChatBox(chatID); 
          
        }, err => {
          console.log(err);
        
        });                  
  }; 


  ngOnDestroy(): void {
    this.getActiveConnections().unsubscribe(); 
    this.getConnectionsOfUser().unsubscribe(); 

  }



}

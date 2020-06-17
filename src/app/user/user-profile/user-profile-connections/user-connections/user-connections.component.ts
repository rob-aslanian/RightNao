import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { IProfilePopup } from 'src/app/_shared/models/shared/shared.models';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';

// **styles** 
// '../_shared/css/modals_shared_styles.scss', '../../../network/network.component.scss',

@Component({
  selector: 'app-user-connections',
  templateUrl: './user-connections.component.html',
  styleUrls: [  './user-connections.component.scss']
})
export class UserConnectionsComponent implements OnInit,OnDestroy {
  private _userId;
  myUserId: string; 
  userConnections :any[] = []; 
  mutualConnections :any[] = []; 
  friendReq :boolean; 
  profilePopUp:IProfilePopup;
  isCompany: boolean; 

  @Input()  set getUserId(value){
                this._userId = value;
            }; 

            get getUserId(){
              return this._userId;
            }

  constructor(
    private userProfileService: UserProfileService,
    private globalService: GlobalUserProService,
  ) { }

  ngOnInit() {
    console.log(this.getUserConnections());
    this.myUserId = this.globalService.getUserProfile().id;
    this.getMutualConnectionsOfUser();
    this.isCompany = this.globalService.isCompanyActive();
  }

   // Get connections 
   getUserConnections(){
    let userId = this.getUserId;
    
     return this.userProfileService
      .getConnections(userId)
      .subscribe(
        (data) => {
          this.userConnections = data['getConnectionsOfUser'].profiles
        }
      )
  }

  getMutualConnectionsOfUser(){
    return this.userProfileService
    .getMutualConnectionsOfUser(this.getUserId)
    .subscribe(
      (data) => {
        this.mutualConnections = data['getMutualConnectionsOfUser'].profiles
      }
    )
  }

  // Send friend Request
  sendFriendRequest(id:string, index:number){
    return this.userProfileService
    .SendFriendRequest(id)
    .subscribe((data: any) => {
      if (data.data.SendFriendRequest.status == "Requested") { 
        this.userConnections[index].friend_request = true;      
        
      }
    });
  }


  disconnect(id, index){
      return this.userProfileService
      .disconnect(id)
      .subscribe(responce => {
      this.userConnections[index].friend = false;
    });
  }


 
  ngOnDestroy(): void {
    this.getMutualConnectionsOfUser().unsubscribe();
    this.getUserConnections().unsubscribe();
  }
 

}

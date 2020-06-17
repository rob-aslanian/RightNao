import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { map } from 'rxjs/operators';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';

@Component({
  selector: 'app-connections-modal',
  templateUrl: './connections-modal.component.html',
  styleUrls: ['./connections-modal.component.scss']
})
export class ConnectionsModalComponent implements OnInit, OnDestroy {

  @Input() profileID: string;
  @Output() onCloseModal: EventEmitter<boolean> = new EventEmitter(); 

  connectionsList: any[] = []; 
  myID: string; 
  isCompanyActive: boolean; 
  isMe: boolean; 
  isLoading: boolean = true; 

  constructor(
    private userProfService: UserProfileService,
    private globalUserProServ: GlobalUserProService,
    private utilService: UtilsService
  ) { }

  ngOnInit() {
      this.getUserConnections(); 
      this.isCompanyActive = this.globalUserProServ.isCompanyActive(); 
      this.isCompanyActive ? this.myID = this.globalUserProServ.getCompanyProfile()['id'] : this.myID = this.globalUserProServ.getUserProfile()['id']; 
  }

  getUserConnections() {
    return this.userProfService
               .getConnections(this.profileID)
               .pipe(
                 map(data => data['data']['getConnectionsOfUser']['profiles'])
               )
               .subscribe(data => {
                 this.connectionsList = data; 
                 this.isLoading = false; 
                 console.log(this.connectionsList);
               }, err => {
                 console.log(err);
               });
  };

    //   * *  $ * * For User  Profile  * *  $ * *
  connect(id:string, index:number){
    return this.userProfService
               .SendFriendRequest(id)
               .subscribe((data: any) => {
                  if (data.data.SendFriendRequest.status == "Requested") { 
                    this.connectionsList[index].friend_request = true;      
                  }; 
                });
  }; 

  disconnect(id: string, index: number){
      return this.userProfService
                 .disconnect(id)
                 .subscribe(response => {
                  this.connectionsList[index].friend = false;
                  console.log(response);
                });        
  }; 

    //   * *  $ * * For Company Profile  * *  $ * *
  followUserForCompany(userId: string, index: number) {
    return this.utilService
               .followUserToCompany( this.myID, userId )
               .subscribe(data => {
                 this.connectionsList[index]['follow'] = true; 
                 console.log(data);
               }, err => {
                 console.log(err);
               }); 
  }; 

  unFollowUserForCompany(userId: string, index: number) {
    return this.utilService
               .unFollowUserToCompany( this.myID, userId )
               .subscribe(data => {
                 this.connectionsList[index]['follow'] = false; 
                 console.log(data);
               }, err => {
                 console.log(err);
               }); 
  }; 

  closeModal() {
    this.onCloseModal.emit(true); 
  }
  

  ngOnDestroy(): void {
    this.getUserConnections().unsubscribe(); 
  }

}

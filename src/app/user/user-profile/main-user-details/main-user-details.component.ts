import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { Subject, Observable } from 'rxjs';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { TranslateService } from '@ngx-translate/core';
import { SaveToPDFComponent } from 'src/app/_shared/components/save-to-pdf/save-to-pdf.component';
import { takeUntil, map } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { MorePopupComponent } from 'src/app/_shared/components/more-popup/more-popup.component';
import { ProfileStatisticService } from 'src/app/_shared/services/statistic/profile-statistic.service';
import { IProfilePopup } from 'src/app/_shared/models/shared/shared.models';
import { Router } from '@angular/router';
import { portfolioPath } from '../portfolio/model.interface';
import { OfficeService } from 'src/app/_shared/services/v-office/office.service';
 
@Component({
  selector: 'app-main-user-details',
  templateUrl: './main-user-details.component.html',
  styleUrls: ['./main-user-details.component.scss', "../../../_shared/css/profile_shared_style.scss"]
})
export class MainUserDetailsComponent implements OnInit {

  destroy$:Subject<any> = new Subject<any>();


  isAuth: boolean; 
  url: string; 
  user_info: any; 
  modalType: string; 
  isCompanyActive: boolean; 
  isAdmin: boolean;     
  profilePopUp:IProfilePopup;
  userProfile: any; 
  portfolioPath = portfolioPath;
  $vOffices: Observable<any[]>;

  @ViewChild(AppModalComponent, { static: false }) _modal: AppModalComponent;
  @ViewChild(SaveToPDFComponent, { static: false }) pdf: SaveToPDFComponent;
  @ViewChild(MorePopupComponent, { static: false }) popup: MorePopupComponent;

  $portfolioInfo: Observable<any>;

  constructor (

    private userProfService: UserProfileService, 
    private globalUserProServ: GlobalUserProService,
    private translateService: TranslateService,
    private appComponent: AppComponent,
    private imageService: ImageUploadService,
    private statisticService: ProfileStatisticService,
    private router: Router,
    private officeService: OfficeService

  ) { }

  ngOnInit() {

    this.isAuth = this.globalUserProServ.isAuthenticated(); 

    this.getUrl(); 

    this.isCompanyActive = this.globalUserProServ.isCompanyActive(); 

    this.getUserProfile(); 
 
  }

  getUserProfile() {
    return  this.userProfService
                .userProfileData
                .subscribe( data => {
                  const userInfo = data['getProfile']; 
                  
                  this.user_info = data; 
                  this.userProfile = userInfo; 
                  this.isAdmin = userInfo['me'] && !this.globalUserProServ.isCompanyActive();

                  // Get Portfolio info
                  this.getPortfolioStatistics( userInfo.id );
   
                  // Get user v offices 
                 this.$vOffices =  this.officeService
                                       .getVoffices( undefined, userInfo.id, 'cache-first' ).pipe(
                                             map( ( {data} ) => data['GetVOffice']['v_offices'] ));

                  if(!userInfo.me){
                    this.profilePopUp = {
                        profileId:userInfo.id,
                        isCompany:false,
                        isFavorite:userInfo.favorite,
                        isFollowed:userInfo.follow,
                        isBlocked:userInfo.blocked,
                        isConnect:userInfo.friend,
                        isFriendRequest:userInfo.friend_request
                    }
                  }

                }, err => {
                  console.log(err);
                }); 
  }; 

  getUrl() {
   return this.userProfService
              .getUrl
              .subscribe( url => {
                this.url = url; 
              }, err => {
                console.log(err);
              }); 
  }; 


  editProfileResult(item) {
    if(item){

      if(item.closeModal){
        this._modal.close();
      }

      /// Remove image ///
      if(item.deleteImage){
        this.user_info.getProfile.avatar = '';
        this.globalUserProServ.updateUserProfile({ avatar:'' })
      }
      else{
        let formData = new FormData();
            formData.append('file' , item.image)

        this.imageService
            .uploadAvatar(formData)
            .subscribe((event: any) => {
              // handle event here
              let url = event.info[0].url;
              this.user_info.getProfile.avatar = url;
              this.globalUserProServ.updateUserProfile(
                {
                  avatar:url,
                  name: this.user_info.getProfile.firstname +
                  " " +
                  this.user_info.getProfile.lastname,
                },
               
              )});
      }
    }
  }; 

  saveToPDF(e:MouseEvent){
    this.pdf.saveCV();
  
  }; 

  openSmallChatBox(fName: string, lName: string, avatar: any, id: string) {

    let mutation = this.isCompanyActive ?
    this.userProfService
        .openSmallChatBoxForComapny({
            avatar , 
            name:`${fName} ${lName}` , 
            id , 
            companyId: this.globalUserProServ.getComapnyId()
          })                           :  
    this.userProfService
        .openSmallChatBox({avatar , id , name:`${fName} ${lName}` }); 

     mutation
     .pipe(takeUntil(this.destroy$))
     .subscribe(({data}) => {
       let chatId = data.CreateConversation ? 
                    data.CreateConversation.id  :  /// User 
                    data.CreateConversationForCompany.id; /// Company 
                   
       this.appComponent.addChatBox(chatId);
     });
 }; 

 
 getResultFromPopup(e){
  let {  isFriendRequest} = e;

  // this.user_info.getProfile.friend = isConnect;
  this.user_info.getProfile.friend_request = isFriendRequest;
}; 

 acceptFriendRequest(id: string) {
  this.userProfService.acceptFriendRequest(id)
                      .pipe(takeUntil(this.destroy$))
                      .subscribe(data => {
                          this.user_info.getProfile.friend = true;
                          console.log(data);
                        }, err => {
                          console.log(err);
                        });
}; 

  //  send friend requests
  sendFriendRequest(id: string) {
    console.log(id);
    
    if ( id.trim() == "") return;
    
    this.userProfService
        .SendFriendRequest(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((data: any) => {
            if (data.data.SendFriendRequest.status == "Requested") {
              this.user_info.getProfile.friend_request = true;
              this.popup.isFriendRequest = true;
              this.popup.isConnect = false;
            }
              this.connectDisConnectStatistic(id , true)
            });

  }; 

 /// Statistic ///
  connectDisConnectStatistic(id:string , isConnect:boolean) {
    if(id) {
      let path = isConnect ? 'connect' : 'discconect';
      
      this.statisticService
          .sentUserStatistic(
            {
              id:this.globalUserProServ.getProfileId(),
              isCompany:this.globalUserProServ.isCompanyActive(),
              os:navigator.platform,
              timestamp:new Date().toISOString(),
              connectionId:id
            }, path ) 
          .subscribe()
    }; 
  }; 

  changeHeadline(event){
    this.user_info.getProfile.headline = event;
    this._modal.close();
  }; 

  openModal(type: string) {
    this._modal.open();

    switch (type) {
      case 'following' :
        this._modal.size = 'lg';
        this.modalType = 'following';
        this._modal.title = 'Following'; 
        break;
      case 'followers' :
        this._modal.size = 'lg';
        this.modalType = 'followers';
        this._modal.title = 'Followers'; 
        break;
      case 'connections' : 
        this._modal.size = 'lg';
        this.modalType = 'connections';
        this._modal.title = 'Connections'; 
        break;
      case 'editProfile' : 
        this._modal.size = ''; 
        this.modalType = 'editProfile';
        this._modal.title = "Profile Photo";
        break; 
      case 'Headline' : 
      this._modal.size = ''; 
      this.modalType  = 'Headline'; 
      this.translateService.get('704')
                           .subscribe(title => this._modal.title = title); 
        break; 
    }

  }; 

  closeModal(event: boolean) {
    
    if (event) {
      this._modal.close();
    }; 

  }

  togglePortfolio( portfolio : any) {
    
     // If portfolio link is active
     if( this.router.url.includes('portfolio') )  return this.router.navigate(['user', 'profile', this.url ]);
 
     else {
      if(  this.isAdmin || portfolio['has_photo'] ) {
             this.router.navigate(['user', 'profile', this.url, 'portfolio', this.userProfile.id ]);
        } else {
             const portPath = Object.keys( portfolio ).filter( key => portfolio[key] )[0];
             this.router.navigate(['user', 'profile', this.url, 'portfolio', this.userProfile.id, this.portfolioPath[portPath] ]);
        }
     } 
  }
  
  getPortfolioStatistics( userId: string ) {
    
   this.$portfolioInfo = this.userProfService
                             .getPortfolioStatistics( userId )
  }

}

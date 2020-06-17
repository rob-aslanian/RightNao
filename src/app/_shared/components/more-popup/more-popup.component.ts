import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { IProfilePopup } from '../../models/shared/shared.models';
import { UtilsService } from '../../services/shared/utils.service';
import { GlobalUserProService } from '../../services/global-user-pro.service';
import { AppModalComponent } from '../app-modal/app-modal.component';
import { Observable, Subject } from 'rxjs';
import { IStatistic } from '../../models/statistic/statistic.interface';
import { ProfileStatisticService } from '../../services/statistic/profile-statistic.service';
import { takeUntil } from 'rxjs/operators';
import { AppComponent } from 'src/app/app.component';
import { SaveToPDFComponent } from '../save-to-pdf/save-to-pdf.component';


@Component({
  selector: 'app-more-popup',
  templateUrl: './more-popup.component.html',
  styleUrls: ['./more-popup.component.scss']
})
export class MorePopupComponent implements OnInit , OnDestroy {

  destroy$: Subject<any> = new Subject<any>();

  user: any ;

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;
  @ViewChild(SaveToPDFComponent, { static: false }) pdf:SaveToPDFComponent;
   
  private _data:IProfilePopup;

  @Input()
          set data(value:IProfilePopup){ 
            this._data = value;
            if(value){  
                this.isFollow  = value['isFollowed'];
                this.isBlocked = value['isBlocked'];
                this.isFavorite = value['isFavorite'];
                this.isConnect = value['isConnect'];
                this.isFriendRequest = value['isFriendRequest'];
                this.canAddInFavourites = typeof value['canAddInFavourites']  !== 'undefined' ? value['canAddInFavourites'] : true ;
                
                this.getProfile();
              
            }
          }
          get data() : IProfilePopup{
            return this._data;
          }
          
  @Output() result: EventEmitter<object> = new EventEmitter<object>();

  isFollow:boolean = false;
  isBlocked:boolean = false;
  isConnect:boolean = false;
  isCurrenctCompany:boolean = false;
  isFavorite:boolean = false;
  isFriendRequest:boolean = false;
  currentProfileId:string;
  profile:any;
  modalType:string;
  canAddInFavourites: boolean = false;


  constructor(
    private utilService:UtilsService,
    private globalService:GlobalUserProService,
    private statisticService:ProfileStatisticService,
    private appComponent:AppComponent
  ) {
    this.isCurrenctCompany = globalService.isCompanyActive();
    this.currentProfileId  = globalService.getProfileId();
   }

  ngOnInit() {
    // if(this.data){
    //   this.getProfile();
    // }
  }

  get isCompany() : boolean {
    return this.data && this.data.isCompany;
  }

  get profileId() : string {
    return this.data.profileId
  }

  get getSharedDataStatistic() : IStatistic{
    return {
      id:this.profileId,
      isCompany:this.isCompany,
      timestamp:new Date().toISOString(),
      os:navigator.platform
    }
  }

  emitData(){
    return this.result.emit({
      profileId:this.profileId,
      isFollow:this.isFollow,
      isBlocked:this.isBlocked,
      isConnect:this.isConnect,
      isFriendRequest:this.isFriendRequest
    })
  }

  getProfile(){
    let query = this.isCompany ? 
                this.utilService.getCompanyProfileById(this.profileId) :
                this.utilService.getUserProfileForCv(this.profileId);

    query
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => { this.profile = data },
          (err) => {}
        )
  }

  get selectedUserToWrite ()  {    
    if(this.profile){
      return {
        id:this.profile.id,
        avatar:this.profile.avatar === '' ? 'assets/img/124.svg' : `/file/${this.profile.avatar}`,
        fullName:this.profile.firstname + '' + this.profile.lastname,
        company:null,
        position:null
      }
    }
  }


  open(type:string){
    this.modalType = type;
    this.modal.open();

    switch(type){
      case'report':{
        this.modal.title = 'What you can do';
        break;
      }
      case 'review':{
        this.modal.title = `Write review to ${this.profile.name}`;
        break;
      }
      case'ask':{
        this.modal.title = 'Ask for a recommendation';
        break;
      }
      case'recommend':{
        this.modal.title = 'Write a recommendation';
        break;
      }
      default: break;
    }


  }

  getResult(event){
  
    let type = event._type;
    let { user_id, text , title , relation } = event;

    if( type === 'ask' && event.isAsking ) return;

    let input = {
       user_id:user_id,
       text:text,
       title,
       relation
     },
     
     mutation = type === 'ask' ? 
                this.utilService.askRecomendation(input) : /// Ask
                this.utilService.writeRecommendation(input); /// Write 

    mutation
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            (data) => {
              this.modal.close();
            }
          )
  }

  savePDF(){
 
    console.log(this.pdf.data);
 
    this.pdf.saveCV();
  
  }

  follow(){
    
    let mutation = this.isCompany && this.isCurrenctCompany ?
                    this.utilService
                        .followCompnayForCompany(this.currentProfileId , this.profileId) : /// Compny to company 
                    this.isCurrenctCompany ? 
                    this.utilService
                        .followUserToCompany( this.currentProfileId  , this.profileId ) : /// User to company 
                    this.utilService
                        .follow(this.profileId);  /// User to user 

    this.followUnFollowStatistic(this.profileId , true)
    mutation
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            (data) => {
              this.isFollow = true;
              this.emitData();
            }
          )
  }

  unFollow(){

    let mutation = this.isCompany && this.isCurrenctCompany ?      
                    this.utilService
                        .unFollowCompnayForCompany(this.currentProfileId , this.profileId) : /// Compny to company 
                    this.isCompany && !this.isCurrenctCompany ?
                    this.utilService.unFollowCompany( this.profileId ) : ///  user to company                  
                    this.isCurrenctCompany ? 
                    this.utilService
                        .unFollowUserToCompany(this.currentProfileId , this.profileId) : /// company to user 
                    this.utilService
                        .unFollow(this.profileId);  /// User to user 

    this.followUnFollowStatistic(this.profileId , false)
    mutation
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              (data) => {
                this.isFollow = false;
                this.emitData();
              }
            )
  }

  addToFavorite(){
    let mutation = this.isCompany ? 
                   this.utilService.addCompanyToFavorite(this.profileId) : /// Company
                   this.utilService.addUserToFavorite(this.profileId); /// User  

      this.favouriteUnFavoriteStatistic(this.profileId , true)
        mutation
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                  (data) => {
                    this.isFavorite = true;
                    this.emitData();
                  }
                )
  }

  removeFromFavorite(){
    let mutation = this.isCompany ? 
                      this.utilService.removeCompanyFromFavorite(this.profileId) : /// Company
                      this.utilService.removeUserFromFavorite(this.profileId); /// User  

     this.favouriteUnFavoriteStatistic(this.profileId , false)
      mutation
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              (data) => {
                 this.isFavorite = false;
                 this.emitData();
              }
            )
  }

  unblock(){
    let mutation = this.isCompany && !this.isCurrenctCompany ?
                   this.utilService
                       .unBlockUserForCompany(this.profileId , this.currentProfileId) : /// User to Comany 
                   this.isCompany ? 
                   this.utilService
                       .unBlockCompany(this.profileId) : /// Company 
                   this.utilService
                       .unBlockUser(this.profileId) /// User 

    this.unblockProfileStatistic(this.profileId)
    mutation
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              (data) => {
                this.isBlocked = false;     
                this.emitData();
              }
            )
  }

  openChatBox() {

    let mutation = this.isCurrenctCompany  ?
                   this.utilService
                       .openSmallChatBoxForComapny({
                           avatar:'', 
                           name:'', 
                           id:this.profileId, 
                           companyId:this.currentProfileId
                         } , this.isCompany) :   /// Company 
                   this.utilService
                       .openSmallChatBox({ 
                           avatar:'' , 
                           id:this.profileId , 
                           name:'' 
                        } , this.isCompany); /// User

     mutation
          .pipe(takeUntil(this.destroy$))
          .subscribe(({data}) => {
            let chatId = data.CreateConversation ? 
                        data.CreateConversation.id  :  /// User 
                        data.CreateConversationForCompany.id; /// Company 
                        
            this.appComponent.addChatBox(chatId);
          });
  }


  connect(){
    this.connectDisConnectStatistic(this.profileId , true);
    this.utilService
        .SendFriendRequest(this.profileId)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            this.isConnect = false;
            this.isFriendRequest = true;
            this.emitData();
          }
        )
  }

  disconnent(){
      this.connectDisConnectStatistic(this.profileId , false);
      this.utilService
          .disconnect(this.profileId)
          .pipe(takeUntil(this.destroy$))
          .subscribe(
            (data) => {
              this.isConnect = false;
              this.isFriendRequest = false;
              this.emitData();
        
            }
          )
  }


  /// Statistic ///

  connectDisConnectStatistic(id:string , isConnect:boolean){
    if(id){
      let path = isConnect ? 'connect' : 'discconect';
      
      this.statisticService
          .sentUserStatistic(
            {
              ...this.getSharedDataStatistic,
              connectionId:id
            },
            path
          )
          .pipe(takeUntil(this.destroy$))
          .subscribe()
    }
  }

  unblockProfileStatistic(id:string){
    if(id){
      this.statisticService
          .sentCompanyStatistic({
            ...this.getSharedDataStatistic,
            unblockId:id
          } , 'unblock')
          .pipe(takeUntil(this.destroy$))
          .subscribe()
    }
 }

 favouriteUnFavoriteStatistic(id:string , isFavorite:boolean){
  if(id){
    let path = isFavorite ? 'favorite' : 'unfavorite';
    
    this.statisticService
        .sentUserStatistic(
          {
            ...this.getSharedDataStatistic,
            timestamp:new Date().toISOString(),
            favoriteId:id
          },
          path
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe()
  }
}

  followUnFollowStatistic(id:string , isFollow:boolean){
    if(id){
      let path =  isFollow ? 'follow' : 'unfollow';
      this.statisticService
          .sentCompanyStatistic(
            {
              ...this.getSharedDataStatistic,
              followerId:id
            },
            path
          )
          .pipe(takeUntil(this.destroy$))
          .subscribe()
    }
  }
  /// Statistic ///

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();

  }

}

import { Component, OnInit, Input, HostBinding, SimpleChanges } from '@angular/core';
import { UtilsService } from '../../services/shared/utils.service';
import { GlobalUserProService } from '../../services/global-user-pro.service';
import { AppComponent } from 'src/app/app.component';
import { DropCVOptions } from 'src/app/career-center/models/career-center.model';
import { CareerCenterService } from 'src/app/career-center/career-center.service';
import { AdsService } from '../../services/ads/ads.service';


@Component({
  selector: 'app-profile-box',
  templateUrl: './profile-box.component.html',
  styleUrls: ['./profile-box.component.scss'],
}) 
export class ProfileBoxComponent implements OnInit {



  @Input() profile;
  @Input() isCompany:boolean = false;
  @Input() hasCareerCenter:boolean = false;
  @Input() view: string = 'card';
  @Input() hasMorePopUp: boolean = false;
  

  @HostBinding('class') class = this.view === 'card' ? 'col-lg-4 col-md-6' : 'col-12';


  isCompanyActive:boolean;
  profileID:string;
  DropCVOptions = DropCVOptions;
  dropCvRadio:string;

  constructor(
    private utilService:UtilsService,
    private globalService:GlobalUserProService,
    private appComponent:AppComponent,
    private careerService:CareerCenterService,
    private adService:AdsService,
  ) {
    this.isCompanyActive = globalService.isCompanyActive();
    this.profileID = globalService.getProfileId();
   }

  ngOnInit() {
  
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['view']){  
      this.class = this.view === "list" ? 'col-12' : "col-lg-4 col-md-6"
    }
    
  }

  dropCv() {
    
    this.careerService
        .addCVInCareerCenter(this.profile.id , {
          ExpierencedProfessionals:this.dropCvRadio === "ExpierencedProfessionals",
          NewJobSeekers:this.dropCvRadio === "NewJobSeekers",
          YoungProfessionals:this.dropCvRadio === "YoungProfessionals"
        })
        .subscribe()
    
  }

  connect(id){

    this.utilService
        .SendFriendRequest(id)
        .subscribe();

    this.profile.friend_request = true;
  }

  follow(id){
    const mutation =  this.isCompany && this.isCompanyActive ?
                      this.utilService
                          .followCompnayForCompany(this.profileID , id) : /// Compny to company 
                      this.isCompany ? 
                      this.utilService
                          .followCompanyForUser(id )  : /// User to company 
                      this.isCompanyActive && !this.isCompany  ?
                      this.utilService.followUserToCompany( this.profileID, id ) : // company to user
                      this.utilService
                          .follow(id);  /// User to user 


    mutation.subscribe();

    this.profile.follow = true;


  }
  openChatBox(id:string) {

    let mutation = this.isCompanyActive  ?
                   this.utilService
                       .openSmallChatBoxForComapny({
                           avatar:'', 
                           name:'', 
                           id, 
                           companyId:this.profileID
                         } , this.isCompany) :   /// Company 
                   this.utilService
                       .openSmallChatBox({ 
                           avatar:'' , 
                           id, 
                           name:'' 
                        } , this.isCompany); /// User

     mutation
          // .pipe(takeUntil(this.destroy$))
          .subscribe(({data}) => {
            let chatId = data.CreateConversation ? 
                        data.CreateConversation.id  :  /// User 
                        data.CreateConversationForCompany.id; /// Company 
                        
            this.appComponent.addChatBox(chatId);
          });
  }

  getResult( action: string ){
      console.log(action);
      
  }

  adClick(e:Event , profile){
    e.stopPropagation();

    if (profile.isAd && profile.clicks > 0){
      this.adService
          .ClickOnAdvert(profile.ad_id)
          .subscribe()
    }
   
    return;
 }
}

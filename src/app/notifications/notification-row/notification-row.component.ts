import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { INotification, NotificationText } from '../notification.model';
import { NotifyService } from '../notify.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { utilities } from 'src/app/_shared/utilities/utilities';

@Component({
  selector: 'app-notification-row',
  templateUrl: './notification-row.component.html',
  styleUrls: ['./notification-row.component.scss' , '../../../assets/scss/notifications.scss']
})
export class NotificationRowComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;

  private _data:INotification;

  @Output() result:EventEmitter<string> = new EventEmitter<string>();
  applyContent: any;


  @Input() 
           set data(values:INotification)
           {
             this._data = values;
              
           }
           get data() : INotification{
             return this._data
           }

  notifyTextKeys = NotificationText;
  profile:Observable<any>;
  job:Observable<any>;

  modalType:string;
  selectedUser:any;
  isCompany:boolean = false;
  userName:string;
  utils = utilities;
  userURL:string;
  companyURL:string;


  constructor(
    private notifyServecie:NotifyService,
    private globalService:GlobalUserProService
  ) {
     this.userURL = globalService.getUserId();
     this.companyURL = globalService.isCompanyActive() &&  
                       globalService.getCompanyProfile()['url'];
   }

  ngOnInit() {

    if(this.data){

      /// Get user
      if(this.data.user_sender_id || this.data.reviewer_user_id){
          let userId = this.data.user_sender_id || this.data.reviewer_user_id;

          this.userName = this.globalService.getUserProfile()['name'];
          this.setUserProfile(userId);
     
      }
      /// Get Comapny
      if(this.data.company_id){
        this.isCompany = true;
        this.profile  = this.notifyServecie
                            .getCompanyProfile(this.data.company_id)
                            .pipe(map(({data}) => data['GetCompanyProfileByID']));

        /// Get job 
        if(this.data.job_id){
          this.job = this.notifyServecie 
                         .getJob(this.data.job_id)
                         .pipe(map(({data}) => data['GetJob']));
        }

        /// Get Candidate 
        if(this.data.candidate_id){
          this.setUserProfile(this.data.candidate_id);
        }
      }    
    }
  }

  setUserProfile(id:string){
    this.isCompany = false;
    this.profile =  this.notifyServecie
                        .getUserProfile(id)
                        .pipe(map(({data}) => data['getProfileByID']));   
  }


  ignore(id:string){
    this.notifyServecie
        .ignoreReccomendation(id)
        .subscribe(
          () => this.result.emit(this.data.id),
          (err) => console.log(err)
        );
  }

  open(type:string , content?:any){

    this.modalType = type;
    this.applyContent = content;
    this.modal.open();  
    
    /// Write reccomendation 
    if(type === 'writeRecommendation'){
      this.modal.title = 'Write a reccomendation';
      this.selectedUser = {

        id: content.id,
        avatar: content.avatar,
        firstname: content.firstname ,
        lastname: content.lastname

      };
    }

    /// Accept invite 
    if(type === 'apply'){
      this.modal.title = `Apply to ${content.name}`;
    }



  }

  close(e){
    this.modal.close();
    this.result.emit(this.data.id);
  }

  markAsSeen(data){
    let { seen , id  } = data;
  

    if(!seen){
      let  markNottification = this.isCompany  ?
                               this.notifyServecie
                                   .markNottificationAsSeenCompany(this.data.receiver_id , id) :  /// Company 
                               this.notifyServecie
                                   .markNottificationAsSeen(id); /// User

      markNottification.subscribe(
        () => {},
        (err) => console.log(err)
        
      )
    }
    
  }
  
  getReccomendation(event){
      let { user_id, text } = event,
          input = {
            user_id:user_id,
            text:text
          };

      this.notifyServecie
          .writeRecommendation(input)
          .subscribe(
            () => this.modal.close(),
            (err) => console.log(err),
            () => this.result.emit(this.data.id)
            
          )

  }

  founderRequest(requstId:string , type?:string){
    
    let companyId = this.data.company_id;

    if(requstId && companyId){
      let mutation = type === 'ignore' ?
                     this.notifyServecie
                         .ignoreFounder(companyId , requstId) : /// Ignore
                     this.notifyServecie
                         .approveFounder(companyId , requstId) /// Accept

        mutation.subscribe(
             () => this.result.emit(this.data.id),
             (err) => console.log(err)
              
           )
    }
  }

  friendShipRequest(requstId:string , type?:string){
    if(requstId){
      let mutation = type === 'ignore' ?
                     this.notifyServecie
                         .ignoreFriendRequest(requstId) : /// Ignore
                     this.notifyServecie
                         .approvedFriendShip(requstId) /// Accept

        mutation.subscribe(
             () => this.result.emit(this.data.id),
             (err) => {
              console.log(err);
              this.result.emit(this.data.id)
             }
              
           )
    }
  }


}

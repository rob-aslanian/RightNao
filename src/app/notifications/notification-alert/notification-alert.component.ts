import { Component, OnInit } from '@angular/core';
import { NotifyService } from '../notify.service';
import { repeat, retry, mergeMap, takeUntil, retryWhen, delay, take, concatMap } from 'rxjs/operators';
import { of, Subject, concat, throwError, iif } from 'rxjs';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { NgbPopover, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { utilities } from 'src/app/_shared/utilities/utilities';


@Component({
  selector: 'app-notification-box',
  templateUrl: './notification-alert.component.html',
  styleUrls: ['./notification-alert.component.scss' , '../../../assets/scss/notifications.scss']
})
export class NotificationAlertComponent implements OnInit {

  isNotificationHide:boolean = true;
  timestamp:number = 0;
  notifications:any[] = [];
  profileUrl:string;
  settingLink:string;
  polling:any;
  isCompany:boolean = false;
  newNottificationCount:number  = 0;
  companyId:string;

  constructor(
    private notifyService:NotifyService,
    private globalService:GlobalUserProService
  ) { 

  }

  destroy$:Subject<any> = new Subject<any>();
  maxNotifyLength:number = 6;

  ngOnInit() {
     
    /// Set Data 
    this.setData();

    /// Get All Mottification and detect changes 
    this.getAllNottification();


    const polling = of({}).pipe(
      takeUntil(this.destroy$),
      mergeMap(_ => this.notifyService.getNotifications(this.timestamp)),
      retryWhen(error => error.pipe(
        // delay(10000) , 
        // take(3),
        concatMap((e:any, i:number) => 
          iif(
            () => i >= 10,
            throwError(e),
            of(e).pipe(delay(10000))
          )
        )
        )),
      repeat()
    )


    polling
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            let events:any[]  = data['events'] ? data['events'][0] : undefined,
                    timestamp = data['timestamp'] || events['timestamp'];

                if(events) {
                  this.notifications.unshift(events['data']);
                  this.newNottificationCount++;
                }

                this.timestamp = timestamp;

                if(this.notifications.length > this.maxNotifyLength) this.notifications.pop();
          }
        )
  }

  get isMobile() : boolean {
    return utilities.isMobile;
  }


  setData(){

    this.isCompany = this.globalService.isCompanyActive();
    this.companyId =  this.isCompany ? this.globalService.getComapnyId() : null;


    this.profileUrl = !this.isCompany  ?  
                      this.globalService.getUserId() :            
                      this.globalService.getCompanyProfile()['url'];


    this.settingLink = !this.isCompany ? 
                       `/user/account/${this.profileUrl}/notifications` :
                       `/company/account/${this.profileUrl}/notifications` ;
                       
  }

  getAllNottification(){

    /// Update data
    this.setData();
    
    let getNottification = this.isCompany && this.companyId !== null ?
                           this.notifyService 
                               .getCompanyNottification(this.companyId , 6) : /// Company
                           this.notifyService
                               .getUserNottifications(6); /// User 
    
        getNottification.subscribe(
          (data) => {
            this.notifications = <any[]>data.nottifications;

            this.newNottificationCount = this.notifications.reduce((count , notify) =>  count+(notify.seen ? 0 : 1)  ,0);       

          },
          (err) => console.log(err)
          
        )
  }

  showNotify(e:NgbDropdown){

 
    /// Update data
    this.setData();


    /// Mark nottifications as read 
    if(e.isOpen() && 
      this.notifications.length > 0){
      let ids = this.notifications
                    .filter(notify => !notify.seen || notify.seen === undefined)
                    .map(notify => notify['id']);
      
      return ids.length > 0 ? this.markAsRead(ids) : null;
      
    }

  }

  markAsRead(ids:string[]){
    
    
    if(!ids.includes(null) && !ids.includes(undefined)){
        let markNottification = this.isCompany && this.companyId !== null ?
                                this.notifyService
                                    .markNottificationAsSeenCompany(this.companyId , ids) :  /// Company 
                                this.notifyService
                                    .markNottificationAsSeen(ids); /// User

       markNottification.subscribe((data) => {
              ids.map(id => {
                  let notifyInd = this.notifications.findIndex(notify => notify.id === id);
                  
                  if(notifyInd > - 1){
                    this.notifications[notifyInd].seen = true;
                    this.newNottificationCount--;
                  }
              })
              
            })
    }
  }

  removeNottification(ids:string ){
    this.notifyService
        .removeNottification([ids])
        .subscribe(
          () => { 
            let notifyId = this.notifications.findIndex(notify => notify.id === ids);

            this.newNottificationCount--;
            notifyId > -1 ? this.notifications.splice(notifyId , 1) : null;
          },
          (err) => console.log(err),
        );
 }

  ngOnDestroy(): void {
    // this.isNotificationHide = true;
    this.destroy$.next();
    this.destroy$.complete();
  }

}

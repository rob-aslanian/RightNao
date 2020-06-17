import { Component, OnInit } from '@angular/core';
import { GlobalUserProService } from '../_shared/services/global-user-pro.service';
import { NotifyService } from './notify.service';
import { distinctUntilChanged, switchMap, debounceTime, tap } from 'rxjs/operators';
import {  BehaviorSubject } from 'rxjs';
import { utilities } from '../_shared/utilities/utilities';
import { not } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss' ,  '../../assets/scss/notifications.scss']
})
export class NotificationsComponent implements OnInit {


  allNottification:any[];
  recentNottification:any[] = [];
  earlierNottification:any[] = [];

  firstCount:BehaviorSubject<number> = new BehaviorSubject<number>(20);
  afterCount:string = '0';
  first:number = 0;

  settingPath:string;
  isCompany:boolean = false;
  profileUrl:string;
  companyId:string;
  isLoading:boolean = false;

  constructor(
    private globlService:GlobalUserProService,
    private notifyService:NotifyService
  ) { 

  }

  ngOnInit() {

    //// Set and update Data
    this.setData();

    this.firstCount
        .pipe(
          // debounceTime(200),
          // distinctUntilChanged(),
          // tap(() => this.isLoading = true),
          switchMap(() => {
             return this.isCompany && this.companyId ? 
                    this.notifyService
                        .getCompanyNottification(this.companyId , this.firstCount.value , this.afterCount) : /// Company  
                    this.notifyService
                        .getUserNottifications(this.firstCount.value , this.afterCount) /// User
          })
        ).subscribe(
          (data) => {
             this.allNottification = data;
             this.isLoading = false;
             data.nottifications.map(notify => {
                let date = new Date(notify['created_at']),
                    isToday = utilities.isToday(date);

                  /// Recent nottification
                  if(isToday) this.recentNottification.push(notify);

                  /// Earlier nottification
                  else this.earlierNottification.push(notify);
             })
          }
        )
  }

  setData(){
    this.isCompany = this.globlService.isCompanyActive();
    this.companyId = this.isCompany && this.globlService.getComapnyId();

    /// Profile url 
    this.profileUrl = this.isCompany ? this.globlService.getCompanyProfile()['url'] :
                      this.globlService.getUserId();

    /// Nottification setting path 
    this.settingPath = this.isCompany ? 
                       `/company/account/${this.profileUrl}/notifications` :
                       `/user/account/${this.profileUrl}/notifications`;
  }
  
  onScroll(){
    this.isLoading = false;
    if(this.allNottification && 
      this.allNottification['nottifications'].length >= this.first){

      this.afterCount = String(this.first);
      this.firstCount.next(this.first += 20);
    }
   

  }

  removeNottification(ids:string , type?:string){

    this.notifyService
        .removeNottification([ids])
        .subscribe(
          () => { 
            let nottifications = type === 'recent' ?
                                 this.recentNottification : this.earlierNottification,
                                 
                notifyId = nottifications.findIndex(notify => notify.id === ids);

            notifyId > -1 ? nottifications.splice(notifyId , 1) : null;
          },
          (err) => console.log(err)
        );
 }

}

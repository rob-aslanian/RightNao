import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, ViewChild } from '@angular/core';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { map } from 'rxjs/operators';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { CompanyProfileService } from 'src/app/_shared/services/companies/company-profile.service';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';

@Component({
  selector: 'app-followers-people-modal',
  templateUrl: './followers-people-modal.component.html',
  styleUrls: ['./followers-people-modal.component.scss']
})
export class FollowersPeopleModalComponent implements OnInit, OnDestroy {

  @Input() userID: string; 
  @Input() isCompanyActive: boolean; 
  @Input() companyID: boolean; 
  @Output() result = new EventEmitter(); 
  @Output() onCloseModal : EventEmitter<boolean> = new EventEmitter();   

  followerPeopleList: any[] = []; 
  followerPeopleForCompany: any[] = []; 
  myUserID: string;
  myCompanyID: string; 
  isLoading: boolean = true; 
  isCompanyLogged: boolean; 

  constructor(
    private userProfService: UserProfileService,
    private companyProfService: CompanyProfileService, 
    private globalUserService: GlobalUserProService,
    private utilService: UtilsService
  ) { }

  ngOnInit() {

    this.isCompanyLogged = this.globalUserService.isCompanyActive(); 

    if (this.isCompanyLogged) {
      this.myCompanyID = this.globalUserService.getCompanyProfile()['id']; 
    }  else {
      this.myUserID = this.globalUserService.getUserProfile()['id']; 
    }; 
    
      this.getFollowerPeopleForCompany(); 
      this.getFollowerPeople(); 
  
  }


  getFollowerPeople() {
    if(this.userID) {
      return this.userProfService
                 .getFollowersOfUser(this.userID)
                 .pipe(
                   map(data => data['getFollowersOfUser']['profiles'])
                 )
                 .subscribe(data => {
                   this.followerPeopleList = data;
                   this.result.emit(this.followerPeopleList.length);
                   this.isLoading = false;  

                 }, err => {
                   console.log(err);
                 }); 
    }
  }; 

  getFollowerPeopleForCompany() {
    if(this.companyID) {
      return this.companyProfService  
                 .getFollowersOfCompany(this.companyID)
                 .pipe(
                   map(data => data['data']['getFollowersOfCompany']['profiles'])
                 )
                 .subscribe(data => {
                  console.log(data);            
                   this.followerPeopleForCompany = data; 
                   this.result.emit(data.length); 
                   this.isLoading = false; 
                   
                 }, err => { 
                   console.log(err);
                 }); 
    }
  }; 

  //   * *  $ * * For User Profile  * *  $ * *
  followUserToUser(userId: string, index: number) {
    return this.utilService
               .follow(userId)
               .subscribe( data => {
                 console.log(data);
                  this.isCompanyActive ? 
                  this.followerPeopleForCompany[index]['follow'] = true    :
                  this.followerPeopleList[index]['follow'] = true; 
               }, err => {
                 console.log(err);
               }); 
  }; 

  unfollowUserToUser(userID: string, index: number) {     
    return this.utilService
               .unFollow(userID)
               .subscribe(data => {
                console.log(data);
                 this.isCompanyActive ? 
                  this.followerPeopleForCompany[index]['follow'] = false    :
                  this.followerPeopleList[index]['follow'] = false;
               }, err => {
                 console.log(err);   
               })
  }; 

  //   * *  $ * * For Company Profile  * *  $ * *
  followUserForCompany(userId: string, index) {
    return this.utilService
               .followUserToCompany( this.myCompanyID, userId )
               .subscribe(data => {
                  console.log(data);
                  this.isCompanyActive ? 
                  this.followerPeopleForCompany[index]['follow'] = true    :
                  this.followerPeopleList[index]['follow'] = true; 
               }, err => {
                 console.log(err);
               }); 
  }; 

  unFollowUserForCompany(userId: string, index: number) {
    return this.utilService
               .unFollowUserToCompany( this.myCompanyID, userId )
               .subscribe(data => {
                 console.log(data);
                 this.isCompanyActive ? 
                  this.followerPeopleForCompany[index]['follow'] = false    :
                  this.followerPeopleList[index]['follow'] = false;
                  
               }, err => {
                 console.log(err);
               })
  }; 

  closeModal() {
    this.onCloseModal.emit(true); 
  }



  ngOnDestroy(): void {
    if (this.companyID) {
      this.getFollowerPeopleForCompany().unsubscribe(); 
    }

    if(this.userID) {
      this.getFollowerPeople().unsubscribe(); 
    }
   
  }

}

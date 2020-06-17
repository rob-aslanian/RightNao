import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { map } from 'rxjs/operators';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { CompanyProfileService } from 'src/app/_shared/services/companies/company-profile.service';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';


@Component({
  selector: 'app-following-people',
  templateUrl: './following-people.component.html',
  styleUrls: ['./following-people.component.scss']
})
export class FollowingPeopleComponent implements OnInit, OnDestroy {

  @Input() userID: string; 
  @Input() companyID: string; 
  @Input() isCompanyActive: boolean; 
  @Output() onCloseModal: EventEmitter<boolean> = new EventEmitter() ; 
  @Output() result = new EventEmitter();

  followingPoeple: any[] = []; 
  followingPeopleForCompany: any[] = []; 
  myUserID: string; 
  myCompanyID: string; 
  isCompanyLogged: boolean; 
  isLoading: boolean = true; 

  constructor(
    private userProfileService: UserProfileService,
    private companyProfileService: CompanyProfileService, 
    private globalService: GlobalUserProService, 
    private utilService: UtilsService
  ) { }

  ngOnInit() {

    this.isCompanyLogged = this.globalService.isCompanyActive(); 

    if (this.isCompanyLogged) {
      this.myCompanyID = this.globalService.getCompanyProfile()['id'];
      console.log(this.isCompanyActive);
      
    } else {
      this.myUserID = this.globalService.getUserProfile()['id'];
    }

    this.getFollowingPeople();
    this.getFollowingPeopleForCompany(); 
    
  }

  getFollowingPeople() {
    if(this.userID) {
      return this.userProfileService
                 .getFollowsOfUser(this.userID)
                 .pipe(
                    map(data => data['getFollowsOfUser']['profiles'])
                  )
                 .subscribe(data => {
                    console.log(data);
                    this.followingPoeple = data; 
                    this.result.emit(this.followingPoeple.length); 
                    this.isLoading = false; 
                  }, err => {
                    console.log(err);
                  })
    }; 
  }; 

  getFollowingPeopleForCompany() {
    if(this.companyID) {
      return this.companyProfileService
                 .getFollowsOfCompany(this.companyID)
                 .pipe(
                   map(data => data['getFollowsOfCompany']['profiles'])
                 )
                 .subscribe(data => {
                    this.followingPeopleForCompany = data; 
                    this.result.emit(this.followingPeopleForCompany.length); 
                    this.isLoading = false; 
                    console.log(data);
  
                 }, err => {
                   console.log(err); 
                 }); 
    }; 
  }; 
  
  //   * *  $ * * For User Profile  * *  $ * *
  followUserToUser(userId: string, index: number) {
    return this.utilService
               .follow(userId)
               .subscribe( data => {
                 console.log(data);
                 this.isCompanyActive ? 
                 this.followingPeopleForCompany[index]['follow'] = true    :
                 this.followingPoeple[index]['follow'] = true; 
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
                this.followingPeopleForCompany[index]['follow'] = false    :
                this.followingPoeple[index]['follow'] = false; 
               }, err => {
                 console.log(err);
               }); 
  }; 

  //   * *  $ * * For Company Profile  * *  $ * *
  followUserForCompany(userId: string, index: number) {
    return this.utilService
               .followUserToCompany( this.myCompanyID, userId )
               .subscribe(data => {
                 console.log(index);
                  this.isCompanyActive ? 
                  this.followingPeopleForCompany[index]['follow'] = true    :
                  this.followingPoeple[index]['follow'] = true; 
               }, err => {
                 console.log(err);
               }); 
  }; 

  unFollowUserForCompany(userId: string, index: number) {
    return this.utilService
               .unFollowUserToCompany( this.myCompanyID, userId )
               .subscribe(data => {
                 this.isCompanyActive ? 
                 this.followingPeopleForCompany[index]['follow'] = false    : 
                 this.followingPoeple[index]['follow'] = false; 

                 console.log(index);   
               }, err => {
                 console.log(err);
               }); 
  }; 

  closeModal() {
    this.onCloseModal.emit(true);
    return false;
  }




  ngOnDestroy(): void {

    if ( this.companyID ) {
      this.getFollowingPeopleForCompany().unsubscribe(); 
    }; 

    if ( this.userID ) {
      this.getFollowingPeople().unsubscribe(); 
    };  
  
  }
}


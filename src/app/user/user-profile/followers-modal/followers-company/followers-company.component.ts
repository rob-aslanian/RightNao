import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { map } from 'rxjs/operators';
import { CompanyProfileService } from 'src/app/_shared/services/companies/company-profile.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';

@Component({
  selector: 'app-followers-company',
  templateUrl: './followers-company.component.html',
  styleUrls: ['./followers-company.component.scss']
})
export class FollowersCompanyComponent implements OnInit, OnDestroy {

  @Input() userID: string; 
  @Input() companyID: boolean; 
  @Input() isCompanyActive: boolean; 
  @Output() onCloseModal: EventEmitter<boolean> = new EventEmitter(); 

  followerCompaniesList: any[] = [];  
  followerCompaniesForCompany: any[] = []; 
  myUserID: string; 
  myCompanyID: string; 
  isLoading: boolean = true; 
  isCompanyLogged: boolean; 
  
  constructor(
    private userProfService: UserProfileService, 
    private companyProfService: CompanyProfileService,
    private globalUserProService: GlobalUserProService, 
    private utilService: UtilsService
  ) { }

  ngOnInit() {

    this.isCompanyLogged = this.globalUserProService.isCompanyActive(); 

    if (this.isCompanyLogged) {
      this.myCompanyID = this.globalUserProService.getCompanyProfile()['id'];
    }  else {
      this.myUserID = this.globalUserProService.getUserProfile()['id'];
    }; 

    this.getFollowerCompaniesForCompany(); 
    this.getFollowerCompanies(); 
  
  }

  getFollowerCompanies() {
    if(this.userID) {
      return this.userProfService
                 .getFollowersCompaniesOfUser(this.userID)
                 .pipe(
                   map(data => data['getFollowersCompaniesOfUser']['profiles']) 
                 )
                 .subscribe(data => {
                  this.followerCompaniesList = data; 
                  this.isLoading = false; 
                  console.log(this.followerCompaniesList);
                 }, err => {
                   console.log(err);
                 }); 
    }; 
  }; 

  getFollowerCompaniesForCompany() {
    if(this.companyID) {
      return this.companyProfService
                 .getFollowersCompaniesOfCompany(this.companyID)
                 .pipe(
                   map(data => data['getFollowersCompaniesOfCompany']['profiles'])
                 )
                 .subscribe(data => {
                   this.followerCompaniesForCompany = data; 
                   this.isLoading = false; 
                   console.log(this.followerCompaniesForCompany);
                 }, err => {
                   console.log(err);
                 }); 
      }; 
    }; 

    //  * *  $ * * For User profile  * *  $ * * 
  followUserToCompany(companyId: string, index: number) {
    return this.utilService
               .followCompanyForUser(companyId)
               .subscribe(data => {
                  this.isCompanyActive ? 
                  this.followerCompaniesForCompany[index]['follow'] = true   :
                  this.followerCompaniesList[index]['follow'] = true; 
                }, err => {
                  console.log(err);
                }); 
  }; 
  
  unFollowUserToCompany(companyId: string, index: number) {
    return this.utilService
               .unFollowCompany(companyId)
               .subscribe(data => {
                  this.isCompanyActive ? 
                  this.followerCompaniesForCompany[index]['follow'] = false  :
                  this.followerCompaniesList[index]['follow'] = false; 
                }, err => {
                  console.log(err);
                }); 
  }; 

  //   * *  $ * * For Company Profile  * *  $ * *
    followCompanyToCompany(companyId: string, index: number) {
      return this.utilService
                 .followCompnayForCompany(this.myCompanyID, companyId)
                 .subscribe(data => {
                  this.isCompanyActive ? 
                  this.followerCompaniesForCompany[index]['follow'] = true   :
                  this.followerCompaniesList[index]['follow'] = true; 
                }, err => {
                  console.log(err); 
                }); 
    }; 
  
    unfollowCompanyToCompany(companyId: string, index: number) {
      return this.utilService
                 .unFollowCompnayForCompany(this.myCompanyID, companyId)
                 .subscribe(data => {
                  this.isCompanyActive ? 
                  this.followerCompaniesForCompany[index]['follow'] = false  :
                  this.followerCompaniesList[index]['follow'] = false; 
                }, err => {
                  console.log(err);
                }); 
    }; 

    closeModal() {
      this.onCloseModal.emit(true); 
    }



    ngOnDestroy(): void {

      if ( this.companyID ) {
        this.getFollowerCompaniesForCompany().unsubscribe(); 
      }; 
  
      if ( this.userID ) {
        this.getFollowerCompanies().unsubscribe(); 
      }; 

    }
}

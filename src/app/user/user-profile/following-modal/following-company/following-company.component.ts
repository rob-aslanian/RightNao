import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { map } from 'rxjs/operators';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { CompanyProfileService } from 'src/app/_shared/services/companies/company-profile.service';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';

@Component({
  selector: 'app-following-company',
  templateUrl: './following-company.component.html',
  styleUrls: ['./following-company.component.scss']
})
export class FollowingCompanyComponent implements OnInit, OnDestroy {

  @Input() userID: string;
  @Input() companyID: string; 
  @Input() isCompanyActive: boolean = false;  
  @Output() onCloseModal: EventEmitter<boolean> = new EventEmitter(); 


  followingCompaniesList: any[] = [];
  followingCompaniesForCompany: any = []; 
  myCompnayID: string; 
  myUserID: string; 
  isLoading: boolean = true; 
  isCompanyLogged: boolean; 


  constructor(
    private userProfileService: UserProfileService,
    private companyProfService: CompanyProfileService, 
    private globalUserProServ: GlobalUserProService,
    private utilService: UtilsService
  ) { }

  ngOnInit() {

    this.isCompanyLogged = this.globalUserProServ.isCompanyActive(); 

    if (this.isCompanyLogged) {
      this.myCompnayID = this.globalUserProServ.getCompanyProfile()['id']; 
      console.log(this.myCompnayID);
      
    } else {
      this.myUserID = this.globalUserProServ.getUserProfile()['id']; 
    }

    this.getFollowingCompanieForCompany(); 
    this.getFollowingCompanies();        
    
  }

  getFollowingCompanies() {
    console.log(this.userID);
    
    if(this.userID) {
      return this.userProfileService
                 .getFollowsCompaniesOfUser(this.userID)
                 .pipe(
                   map(data => data['getFollowsCompaniesOfUser']['profiles'])
                 )
                 .subscribe(data => {
                  this.followingCompaniesList = data; 
                  this.isLoading = false; 
                  console.log(this.followingCompaniesList);
                 }, err => {
                   console.log(err);
                 }); 
    }
  }; 

    
  getFollowingCompanieForCompany() {
    if(this.companyID) {
      return this.companyProfService
                 .getFollowsCompaniesOfCompany(this.companyID)
                 .pipe(
                   map(data => data['getFollowsCompaniesOfCompany']['profiles'])
                 )
                 .subscribe(data => {
                   this.followingCompaniesForCompany = data; 
                   this.isLoading = false; 
                   console.log(this.followingCompaniesForCompany);
                    
                 }, err => {
                   console.log(err);
                 }); 
    }
  }; 

  //   * *  $ * * For User Profile  * *  $ * *
 followUserToCompany(companyId: string, index: number) {   
   return this.utilService
              .followCompanyForUser(companyId)
              .subscribe(data => {
                this.isCompanyActive ? 
                this.followingCompaniesForCompany[index]['follow'] = true   :
                this.followingCompaniesList[index]['follow'] = true; 
              }, err => {
                console.log(err);
              }); 
 }; 

 unFollowUserToCompany(companyId: string, index: number) {
   return this.utilService
              .unFollowCompany(companyId)
              .subscribe(data => {
                this.isCompanyActive ? 
                this.followingCompaniesForCompany[index]['follow'] = false  :
                this.followingCompaniesList[index]['follow'] = false; 
              }, err => {
                console.log(err);
              }); 
 }; 

  //   * *  $ * * For Company Profile  * *  $ * *
  followCompanyToCompany(companyId: string, index: number) {
    return this.utilService
               .followCompnayForCompany(this.myCompnayID, companyId)
               .subscribe(data => {
                this.isCompanyActive ? 
                this.followingCompaniesForCompany[index]['follow'] = true  :
                this.followingCompaniesList[index]['follow'] = true; 
               }, err => {
                 console.log(err); 
               }); 
  }; 

  unfollowCompanyToCompany(companyId: string, index: number) {
    return this.utilService
               .unFollowCompnayForCompany(this.myCompnayID, companyId)
               .subscribe(data => {
                this.isCompanyActive ? 
                this.followingCompaniesForCompany[index]['follow'] = false  : 
                this.followingCompaniesList[index]['follow'] = false; 
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
      this.getFollowingCompanieForCompany().unsubscribe(); 
    }; 

    if ( this.userID ) {
      this.getFollowingCompanies().unsubscribe(); 
    };  

  }

}

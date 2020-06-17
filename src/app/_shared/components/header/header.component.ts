import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalUserProService } from '../../services/global-user-pro.service';
import { Subject } from 'rxjs';
import { utilities } from '../../utilities/utilities';
import { AppModalComponent } from '../app-modal/app-modal.component';
import { ProfileCreated } from '../../models/shared/shared.models';
import { urlLinks } from '../../links/header';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal: AppModalComponent;

  destroy$:Subject<any> = new Subject<any>();

  // Links
  menuUrl ;
  //Links

  utils = utilities;
  myCompanies: any;
  url: any;
  activeProfile: any;
  activeUserProfile: any;
  avatarUrl: string;
  profileUrl: string;
  jobsUrl:string;
  isAuth:boolean = false;
  accountSettingsUrl: string;
  isCompanyProfileActive: boolean;
  moreSkillsShow: boolean = false;
  isTouched:boolean = false;
  isMobileClicked:boolean = false;
  hasOffice: any;
  officeParams: any;
  isModalOpen:boolean = false;
  referalLink:string;
  profileID:string;
  profileType:string = 'users';
  createdList:any[] = [];

  constructor(
    private router: Router,
    private globalUserProfileService: GlobalUserProService,
  ) { 
    this.profileType = globalUserProfileService.isCompanyActive() ? 'company' : 'user';
    this.createdList = ProfileCreated[this.profileType];

  }

  toggleMenu(e){
    let target:HTMLElement = e.target;

    if(!target.classList.contains('mobile')) return;

    this.isMobileClicked = !this.isMobileClicked;
    
  }

  toggleSubNav(e){
    let target:HTMLElement = e.target;
    

    while(!target.classList.contains('mobile')){
      target = target.parentElement;
    }

    if(!target.classList.contains('mobile')) return;

    target.classList.toggle('mobile-subNav');

    document.querySelectorAll('.mobile-subNav')
            .forEach(el => el !== target ? el.classList.remove('mobile-subNav') : null);

    if(!target.classList.contains('mobile-subNav')) this.isMobileClicked = false;
    
  };

  get isMobile() : boolean{
    return this.utils.isMobile;
  }

  open(e:MouseEvent){
    e.preventDefault();

    this.isModalOpen = true;
    this.modal.title = "My referral link";
    this.modal.open();

  }

  ngOnInit() {
    this.isAuth = this.globalUserProfileService.isAuthenticated();

    if (!this.isAuth && localStorage.length === 0) {
      this.globalUserProfileService.signOut();
    }

    this.globalUserProfileService
        .profileUpdated
        .subscribe(
          (data) => {
            this.setActiveProfile();
          }
        )
   
    // Set active profile and avatar from the selected active profile in global user profile service
     this.setActiveProfile();



     this.profileID = this.globalUserProfileService.getProfileId();

     this.referalLink = `${location.protocol}//${location.host}/registration?invited_id=${this.profileID}`;
     
    // Get user sex 
    let isMale: boolean = false;
    if( this.profileType === 'user' )  isMale = this.globalUserProfileService.getUserProfile()['gender']  === 'MALE' ? true : false;

     // Url links
     this.menuUrl = new urlLinks(this.profileUrl, this.profileID, this.profileType, isMale ).getLinks();
 
  
     
  }

  copyReferalLink(e){
    e.preventDefault();

    let __textArea = document.createElement('textarea');

    __textArea.style.position = 'fixed';
    __textArea.style.opacity = '0';
    __textArea.style.top = '0';
    __textArea.style.left = '0';
    __textArea.value = this.referalLink;

    document.body.appendChild(__textArea);

    __textArea.focus();
    __textArea.select();

    document.execCommand('copy');

    document.body.removeChild(__textArea);


  }

  swithcToUser() {
    this.globalUserProfileService.switchToUserProfile();
  }


  setActiveProfile() {
    this.url = this.globalUserProfileService.getUserId();
    this.isCompanyProfileActive =  this.globalUserProfileService.isCompanyActive();

    this.activeProfile = this.isCompanyProfileActive ? this.globalUserProfileService.getCompanyProfile() :
      this.globalUserProfileService.getUserProfile();
    this.activeUserProfile = this.globalUserProfileService.getUserProfile();

    this.avatarUrl = this.isCompanyProfileActive ? 
      (this.activeProfile.avatar ? '/file/' + this.activeProfile.avatar : 'assets/img/default-company.svg' ) : /// Compnay 
      (this.activeProfile.avatar ? '/file/' + this.activeProfile.avatar : 'assets/img/124.svg'); /// User 


    this.jobsUrl = this.isCompanyProfileActive ? '/jobs/company' : '/jobs/user';
    
    this.profileUrl = this.isCompanyProfileActive ? '/company/profile/' + this.activeProfile.url :
      '/user/profile/'+ this.activeProfile.url;

    
    this.accountSettingsUrl = this.isCompanyProfileActive ? '/company/account/' + this.activeProfile.url :
    '/user/account/' + this.url;

    //office
      this.officeParams = this.isCompanyProfileActive ? 'company'  :   'user' ;

    //office

  }

  trackByFn =  (index) => index;

  signOut() {
    this.globalUserProfileService.signOut();
  }



  removeHover(e){
    console.log(e);
    const el:HTMLElement = document.querySelector('.main-menu');
          el.style.pointerEvents = 'none';

    setTimeout(() => el.style.pointerEvents = 'auto' , 200)
  }

  ngOnDestroy(){
   this.destroy$.next();
   this.destroy$.complete();

  }
 
}

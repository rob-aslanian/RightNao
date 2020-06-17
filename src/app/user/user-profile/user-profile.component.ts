import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  OnDestroy,
} from "@angular/core";

import { Router, ActivatedRoute } from "@angular/router";
import { GlobalUserProService } from "../../_shared/services/global-user-pro.service";
import { Subject, throwError, Observable } from "rxjs";
import { takeUntil, catchError, map } from "rxjs/operators";
import { AppModalComponent } from "../../_shared/components/app-modal/app-modal.component";
import { IReviewsView } from "src/app/_shared/models/user/reviews.interface";
import { UserProfileService } from "src/app/_shared/services/user/user-profile.service";
import { IUserSkill } from "src/app/_shared/models/user/skill.interface";
import { IInterests } from "src/app/_shared/models/user/interest.interface";
import { IAccomplishent } from "src/app/_shared/models/user/accomplishment.interface";
import { ProfileStatisticService } from "src/app/_shared/services/statistic/profile-statistic.service";
import { utilities } from "src/app/_shared/utilities/utilities";
import { IProfilePopup } from "src/app/_shared/models/shared/shared.models";
import { IProfileTranslation } from "src/app/_shared/models/profile-langs/profileLangs.model";

 
@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: [
    "./user-profile.component.scss",
    "../../_shared/css/profile_shared_style.scss"
  ],
  encapsulation: ViewEncapsulation.None
})

export class UserProfileComponent implements OnInit , OnDestroy {

  destroy$:Subject<any> = new Subject<any>();
  
  Languages:any;
  
  // saveToPDF: boolean = false 
  isCompanyActive: boolean;
  isMe: boolean; 
  companyId: string;
  user_info: any;
  url: any;
  tokenUser: any;
  show: boolean = true;
  utils = utilities;
  //id_edit: string;
  isProfileIncomplete: boolean = false; 
  
  @ViewChild(AppModalComponent, { static: false }) _modal:AppModalComponent;


  savePDF:any;
  //for add and edit education 
  modalType:any | string;
  public showMores: boolean = false;
  public button: any = "Show";

  isAuth:boolean = false;

  isPortfolio: boolean = true;

  showMainPage:boolean = true;
  //Property for <recommendations> show more/less
  showMoreRecommendations = true;
  reviews: IReviewsView[] = [];
  isAdmin:boolean = false; 
  typeOfModal: string; 


  skillsExpertise:IUserSkill = {
    skills:[],
    isMe:false,
    userId:null,
  };

  interests:IInterests = {
    interests:[],
    isAdmin:false
  }
  
  // portfolio:Iporfolios = {
  //   portfolio:[],
  //   isMe:false
  // }
  
  // Story
  story: any = {
    firstname: '',
    lastname:  '',
    headline:  '',
    nickname:  '',
    me: false,
    story: ''
  };

  // Accoplishments
  accomplishments:IAccomplishent = {
    accomplishments:[],
    isAdmin:false,
  }

  // Tools
  toolsTechnologies = {
    toolsTechnologies:[],
    isMe: false
  }
  
  experiences = {
    experiences: [ ],
    me: false
  };

  education = {
    educations: [],
    me: false
  };

  // Recomendations 
  reccomendations = {
    recieved_recommendation: [],
    hidden_recommendation: [],
    given_recommendations: [],
    received_recommendation_requests: [],
    requested_recommendation_requests: [],
    me: false,
    user: {
      id: '',
      avatar: '',
      firstname: '',
      lastname: '',
      company: '',
      position: '',
      user_id: '',
      me: false
    }
  };


  profilePopUp:IProfilePopup;
  profileLangs:IProfileTranslation;

  //  For routing 
  following:string = 'user';
  followers:string = 'user'; 
  routerEndPath: string;
  $portfolioStat: Observable<any>;


  constructor(
    private router: Router,
    private routeP: ActivatedRoute,
    private globalUserProfileService: GlobalUserProService,
    private userprofileService:UserProfileService,
    private statisticService:ProfileStatisticService
    ) {
    this.router.events.subscribe(
      () => {
        
        this.isPortfolio  = this.router.url.includes('portfolio');
        this.routerEndPath =  this.router.url.split('/').reverse()[0];       
        this.showMainPage = this.router.url.endsWith(this.url);

      } 
    )

  }


  ngOnInit() {   
  
    this.isAuth = this.globalUserProfileService.isAuthenticated(); 

    this.routeP.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        params => {
          this.url = params.url;
          this.showMainPage = this.router.url.endsWith(this.url);
          this.getUserProfile();
          this.userprofileService.urlSource.next(params.url); 

          setTimeout(() => this.userStatistic() , 1000)
        }
      )
     
  }

  get isMobile() : boolean{
    return utilities.isMobile;
  }


  getUserProfile(){
    return this.userprofileService
               .getUserProfile(this.isAuth, this.url) 
               .pipe(
                  takeUntil(this.destroy$),
                  catchError(err => {
                    let message:string = err.message;
                    
                    let graphQLErrors = err["graphQLErrors"]

                    if(graphQLErrors.length > 1 && graphQLErrors[0]["path"].length > 1 && graphQLErrors[0]["path"][1] === "requested_recommendation_requests" ) {
                        this.globalUserProfileService.signOut();
                        return throwError('Log out');
                    }

                    if(message.endsWith('you_are_blocked')){
                      return throwError(this.router.navigate(['page_not_found']));
                    }

                

                  })
                  )
               .subscribe(({ data }) => {
                  this.isCompanyActive = this.globalUserProfileService.isCompanyActive();
                  if(this.isCompanyActive) this.companyId =  this.globalUserProfileService.getComapnyId();

                    
                  let userInfo = data['getProfile'];
                  this.user_info = data;     

                 // Get user portfolio info 
                  this.getStatisticsPortfolio( userInfo.id );

                  this.userprofileService.userProfileSource.next(data); 

                  this.profileLangs = {
                    profileId:userInfo.id,
                    type:'user',
                    activeLang:userInfo['current_translation'],
                    langs:userInfo['available_translations']

                  };

                  this.isAdmin = userInfo['me'] && !this.globalUserProfileService.isCompanyActive(); 
                  
                  /// Skills ///

                  this.skillsExpertise = {
                    skills:userInfo.skills,
                    isMe: ( userInfo.me && !this.isCompanyActive ),
                    userId:userInfo.id,
                  };

                  /// Interest ///

                  this.interests = {
                    interests:userInfo.interests,
                    isAdmin: ( userInfo.me && !this.isCompanyActive ),
                  }

                  /// Accomplishments

                  this.accomplishments = {
                    accomplishments:userInfo.accomplishments,
                    isAdmin: ( userInfo.me && !this.isCompanyActive ),
                  }

                  //Languages

                  this.Languages = {
                    languages:userInfo.languages,
                    isMe:( userInfo.me && !this.isCompanyActive ),
                  }

                  // Tools Technologies 

                  this.toolsTechnologies = {
                    toolsTechnologies: userInfo.toolsTechnologies,
                    isMe: ( userInfo.me && !this.isCompanyActive ),
                  }
                  
             
                  // Story 

                  this.story = {
                      firstname: userInfo.firstname,
                      lastname:  userInfo.lastname,
                      headline:  userInfo.headline,
                      nickname:  userInfo.nickname,
                      me:        ( userInfo.me && !this.isCompanyActive ),
                      story:     userInfo.story
                  }
                  
                // Experiences 

                  this.experiences = {
                      experiences: userInfo.experiences,
                      me: ( userInfo.me && !this.isCompanyActive ) 
                  };

                // Educations

                this.education = {
                  educations: userInfo.educations,
                  me: ( userInfo.me && !this.isCompanyActive )
                };
                

                // Recommendations 
                this.reccomendations = {
                  given_recommendations: userInfo.given_recommendations,
                  hidden_recommendation: userInfo.hidden_recommendation,
                  received_recommendation_requests: userInfo.received_recommendation_requests,
                  recieved_recommendation: userInfo.recieved_recommendation,
                  requested_recommendation_requests: userInfo.requested_recommendation_requests,
                  me: ( userInfo.me && !this.isCompanyActive ) ,
                  user: {
                    id: userInfo.id,
                    user_id: userInfo.id,
                    avatar: userInfo.avatar,
                    company: userInfo.experiences.length > 0 ? userInfo.experiences[ userInfo.experiences.length - 1 ].company : [],
                    position: userInfo.experiences.length > 0 ? userInfo.experiences[ userInfo.experiences.length - 1 ].title : [],
                    firstname: userInfo.firstname,
                    lastname : userInfo.lastname,
                    me: ( userInfo.me && !this.isCompanyActive ) ,
                    
                  }
                }
                this.userprofileService.setData(this.reccomendations);

                  if (data["getProfile"]["me"] && !this.globalUserProfileService.isCompanyActive()) {
                    this.globalUserProfileService.updateUserProfile({
                      avatar:userInfo.avatar,
                      has_vOffice: userInfo['has_vOffice'],
                      name:`${userInfo.firstname} ${userInfo.lastname}`,
                      network_info:{
                        connections: userInfo.network_info.connections ,
                        followers: userInfo.network_info.followers ,
                        followings: userInfo.network_info.followings ,
                      }
                    });

                  }

                  this.checkIfProfileIsIncomplete();
                
                  (err) => {
                    let message:string = err.message;
                
                    if(message.endsWith('you_are_blocked')){
                      return this.router.navigate(['**']);
                    }

                     
                  }

                });
  }


  


  userStatistic() {
    if(this.user_info){
      let user = this.user_info['getProfile'];

        if(!user['me']) {
            let id = this.globalUserProfileService.getProfileId();  
                     this.statisticService
                         .sentUserStatistic(
                            {
                              id,
                              visitorId: user.id,
                              os: navigator.platform,
                              timestamp:new Date().toISOString(),
                              isCompany: this.globalUserProfileService.isCompanyActive(),
                            },
                            'view'
                          )
                          .subscribe(); 
        }; 
      }; 
  }; 


  close(event){
      if(event){
      this._modal.close();
    }; 
  }; 

  getCurrectLanguage(lang) {   
    console.log('lang change');
       
    this.userprofileService
    .getProfileByLanguage( this.url, lang )
      .subscribe( ( { data } ) => {
        this.user_info = data ;
        
      } )
    
}; 

  checkIfProfileIsIncomplete() {
      this.experiences.experiences.length === 0 &&  
      this.education.educations.length === 0 &&  
      this.toolsTechnologies.toolsTechnologies.length === 0 &&  
      this.skillsExpertise.skills.length === 0 &&
      this.Languages.languages.length === 0 &&
      this.accomplishments.accomplishments.length === 0 &&  
      !this.user_info.getProfile.me  ? this.isProfileIncomplete = true : this.isProfileIncomplete = false;
    
  };

  getStatisticsPortfolio( userId: string ) {
    this.$portfolioStat =   this.userprofileService
                            .getPortfolioStatistics( userId ) 
  };

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }; 
 
    

}

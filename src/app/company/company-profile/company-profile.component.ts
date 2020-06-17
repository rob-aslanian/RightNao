import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Apollo } from 'apollo-angular';

import { Router, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { graphqlCompanyProfile } from '../../_shared/graphql/company-profile';

// services
import { HttpClient } from '@angular/common/http';
import { GlobalUserProService } from '../../_shared/services/global-user-pro.service';
import { AppModalComponent } from '../../_shared/components/app-modal/app-modal.component';
import { takeUntil, catchError, map } from 'rxjs/operators';
import { Subject, throwError, Observable } from 'rxjs';
import { ICoverImage } from 'src/app/_shared/models/company/coverImage.interface';
import { IMilestones } from 'src/app/_shared/models/company/milestone.interface';
import { IFounders } from 'src/app/_shared/models/company/founders.interface';
import { CompanyProfileService } from 'src/app/_shared/services/companies/company-profile.service';
import { AppComponent } from 'src/app/app.component';
import { AddImageComponent } from 'src/app/_shared/components/add-image/add-image.component';
import { IProducts } from 'src/app/_shared/models/company/product.interface';
import { IServices } from 'src/app/_shared/models/company/services.interface';
import { IAwards } from 'src/app/_shared/models/company/awards.interface';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { ProfileStatisticService } from 'src/app/_shared/services/statistic/profile-statistic.service';
import { IBenefit } from 'src/app/_shared/models/company/benefit.interface';
import { IStatistic } from 'src/app/_shared/models/statistic/statistic.interface';
import { IProfilePopup } from 'src/app/_shared/models/shared/shared.models';
import { MorePopupComponent } from 'src/app/_shared/components/more-popup/more-popup.component';
import { IProfileTranslation } from 'src/app/_shared/models/profile-langs/profileLangs.model';
import { ICompanyGalleries } from 'src/app/_shared/models/company/gallery.interface';
import { OfficeService } from 'src/app/_shared/services/v-office/office.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss', 
  '../../_shared/css/profile_shared_style.scss'
 ],
  encapsulation:ViewEncapsulation.None, 
})
export class CompanyProfileComponent implements OnInit {

  private _isAdmin:boolean;

  company_info: any;
  url: any;
  math = Math; 
  utils = utilities;
  isCompanyActive:boolean;
  companyId:string;
  
  $vOffices: Observable<any[]>;

  //  For company routing 
  following:string = 'company';
  followers:string = 'company'; 

  set isAdmin(value:boolean){  
    this._isAdmin = (value && this.isCompanyActive );
  }

  get isAdmin() : boolean {
    return this._isAdmin;
  } 
  
  @ViewChild(AppModalComponent, { static: true }) modal: AppModalComponent;
  @ViewChild(AddImageComponent, { static: false }) imageComponent:AddImageComponent;
  @ViewChild(MorePopupComponent, { static: false }) popup:MorePopupComponent;


  modalType: any | string = null;

  closeResult: string;
  hasAbout:boolean = false;
  companyID: any;
  companyProfID: string; 

  destroy$: Subject<any> = new Subject<any>();

  isViewedProfileEmpty: boolean = false;

  milestones:IMilestones = {
    milestones:[],
  };
  coverImage: ICoverImage = {
    cover:null,
    isAdmin:false,
    id:null,
  };

  founders: IFounders = {
    companyId:null,
    founders:[],
    isAdmin:false
  };

  products:IProducts = {
    products:[],
    companyId:null,
    isAdmin:false
  }

  services:IServices = {
    services:[],
    companyId:null,
    isAdmin:false
  }

  awards:IAwards = {
    awards:[],
    companyId:null,
    isAdmin:false,
    langs:[]
  }
  benefits:IBenefit = {
    benefits:[],
    companyId:null,
    isAdmin:false
  }

  gallery:ICompanyGalleries;

  profilePopUp:IProfilePopup;

  profileLangs:IProfileTranslation;
  
  isBlocked:boolean = false;
  isFollow:boolean = false;
  isFavorite:boolean = false;
  showMainPage:boolean = true;
  isAuth:boolean = false;
  isClickedAsVisitor:boolean = false;


  constructor(
    private apollo: Apollo,
    private routeP: ActivatedRoute,
    private route:Router,
    private http: HttpClient,
    private globalUserProfileService: GlobalUserProService,
    private comapnyService:CompanyProfileService,
    private appComponent:AppComponent,
    private statisticService:ProfileStatisticService,
    private officeService: OfficeService

  ) {

  }

  ngOnInit() {  
 
     this.isAuth = this.globalUserProfileService.isAuthenticated();

     /// Router change detect
     this.route.events
         .pipe(takeUntil(this.destroy$))
         .subscribe(
          () => {this.showMainPage = this.route.url.endsWith(this.url);}
         )

    this.routeP.paramMap
        .pipe(takeUntil(this.destroy$))
        .subscribe(params => {
  
        this.url = params.get("id");
        this.showMainPage = this.route.url.endsWith(this.url);
        // Get Company Profile
        this.getCompanyProfile();
        this.isCompanyActive = this.globalUserProfileService.isCompanyActive();

        if(this.isCompanyActive) this.companyId = this.globalUserProfileService.getComapnyId();

    });


  }

  get isComapny() : boolean {
    return this.globalUserProfileService.isCompanyActive();
  }

  get profileId() : string {
    return this.globalUserProfileService.getProfileId();
  }

  get isMobile() : boolean{
    return utilities.isMobile;
  }

  get getSharedDataStatistic() : IStatistic{
    return {
      id:this.profileId,
      isCompany:this.isComapny,
      timestamp:new Date().toISOString(),
      os:navigator.platform
    }
  }
  
  // Get Comapny Profile
  getCompanyProfile(isAdmin?:boolean) {
    this.apollo.watchQuery({
        fetchPolicy: "network-only",
        query: graphqlCompanyProfile.getProfile,
        variables: {
          url: this.url,
        },
      }).valueChanges
        .pipe(
          takeUntil(this.destroy$),
          catchError(err => {
            let message:string = err.message;

       
            if(err["graphQLErrors"].length > 1 && err["graphQLErrors"][0]["path"].length > 1 && err["graphQLErrors"][0]["path"][1] === "requested_recommendation_requests" ) {
                 this.globalUserProfileService.signOut();
                 return throwError('Log out');
            }
    
            if(message.endsWith('you_are_blocked')){
              return throwError(this.route.navigate(['page_not_found']));
            }
  
    
          })
        )
        .subscribe
        (({ data }) => {

          this.company_info = data["GetCompanyProfile"];
           
       
          // Set this as current company active profile

          let companyProfile = data["GetCompanyProfile"],
              companyID      = companyProfile['id'],
              companyAddress = companyProfile["addresses"].length > 0 ? companyProfile["addresses"][0] : null;

          this.hasAbout = companyProfile['is_about_us_set'];
          this.isAdmin  = isAdmin !== undefined  ? isAdmin :
                          (this.globalUserProfileService.getProfileId() === companyID && 
                          companyProfile['my_role'] !== 'role_unknown');
                          
          this.isFollow = companyProfile['follow'];
          this.isFavorite = companyProfile['favorite'];
          this.isBlocked = companyProfile['blocked'];

          this.isClickedAsVisitor = isAdmin !== undefined ? !isAdmin : false;

          !this.isAdmin ?
                this.isViewedProfileEmpty =  this.isProfileEmpty(this.company_info) : this.isViewedProfileEmpty = false;       
                         
       
          // Get Company v offices 
          this.$vOffices =  this.officeService
          .getVoffices( companyID, undefined ).pipe(
            map( ( {data} ) => data['GetVOffice']['v_offices'] )
          );


          if(!this.isAdmin){
            /// Profile for popup ///
            this.profilePopUp ={
              profileId:companyID,
              isCompany:true,
              isFollowed:this.isFollow,
              isBlocked:this.isBlocked,
              isFavorite:this.isFavorite
            }
          }


          //// Profile translation ///
          this.profileLangs = {
            profileId:companyID,
            type:'company',
            activeLang:companyProfile['current_translation'],
            langs:companyProfile['available_translations']
          }

          /// Founders ///
          this.founders = {
            companyId:companyID,
            founders:companyProfile['founders'],
            isAdmin:this.isAdmin,
          }
          /// Milestones /// 
          this.milestones = {
            milestones:companyProfile['milstones'],
            companyId:companyID,
            isAdmin:this.isAdmin,
          }
          /// Cover Image ///
          this.coverImage = {
            cover:companyProfile['cover'],
            id:companyID,
            isAdmin:this.isAdmin
          }

          /// Awards ///
          this.awards = {
            awards:companyProfile['awards'],
            companyId:companyID,
            isAdmin:this.isAdmin,
          }

          /// Benefits ///
          this.benefits = {
            benefits:companyProfile['benefits'],
            companyId:companyID,
            isAdmin:this.isAdmin
          }

          /// Products ///
          this.products = {
            products:companyProfile['products'],
            companyId:companyID,
            isAdmin: companyProfile['my_role'] === 'role_v_shop_admin' || this.isAdmin 
          }

          /// Services /// 
          this.services = {
            services:companyProfile['services'],
            companyId:companyID,
            isAdmin:companyProfile['my_role']  === 'role_v_service_admin' || this.isAdmin
          }

          /// Gallery ///
          this.gallery = {
            galleries:companyProfile['gallery']['files'],
            companyId:companyID,
            isAdmin:this.isAdmin,
          }
          

          this.companyID = companyProfile["id"];
            let myRole = companyProfile['my_role'];

            if( (myRole == "role_admin" || 
                myRole == "role_job_editor" || 
                myRole == "role_commercial_admin" || 
                myRole == "role_v_shop_admin" || 
                myRole == "role_v_service_admin") && this.isAdmin ){
    
              this.globalUserProfileService.storeCompanyProfile({
                id: companyProfile["id"], 
                url: this.url, 
                avatar: companyProfile["avatar"],
                name: companyProfile["name"],
                country_id: companyAddress ? companyAddress.country_id : "", 
                available_translations: companyProfile['available_translations'],
                career_center:companyProfile.career_center,
                network_info: {
                    followers:  companyProfile.network_info.followers,
                    followings: companyProfile.network_info.followings
                }
              });

    
            }
            else{
              let id = this.globalUserProfileService.getProfileId();

              this.statisticService
                  .sentCompanyStatistic({
                    ...this.getSharedDataStatistic,
                    visitorId:companyProfile['id'],
                  }, 'view')
                  .pipe(takeUntil(this.destroy$))
                  .subscribe();
            }
        });
  }

  getCompanyTranslation(lang:string){
    this.comapnyService
        .getCompanyTranslation(this.url , lang)
        .subscribe(
          (data) => {
              let company = data;

               //// Profile translation ///
                this.profileLangs = {
                  profileId:this.companyID,
                  type:'company',
                  activeLang:lang,
                  langs:company['available_translations']
                }

                  /// Awards ///
                this.awards = {
                  awards:company['awards'],
                  companyId:this.companyID,
                  isAdmin:this.isAdmin,
                }

              /// Milestones /// 
              this.milestones = {
                milestones:company['milstones'],
                companyId:this.companyID,
                isAdmin:this.isAdmin,
              }

          }
        )
  }
  changeProfileLang(lang:string){
 
    if(lang) return this.getCompanyTranslation(lang);
  }



  followCompany(id:string){

  this.isComapny ?
      this.comapnyService
        .followCompanyInCompany(this.companyId,id)
        .pipe(takeUntil(this.destroy$))
         .subscribe(data => {
             this.popup.isFollow = true;
             this.isFollow = true
         })
    : this.comapnyService
        .followCompany(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
            this.isFollow = true;
            this.popup.isFollow = true;
          },
          (err) => console.log(err)
        )

    
    this.followUnFollowStatistic(id , true);
  }

   
  editProfileResult(item){   
    if(item){   
      /// Close Modal ///     
      if(item.closeModal){    
        this.modal.close();  
      }     
  
      /// Remove image ///   
      if(item.deleteImage){    
        this.company_info.avatar = '';  
        this.globalUserProfileService.updateCompanyProfile({avatar:''}); 
      } 
      else{
        let formData = new FormData();
            formData.append('file' , item.image)

        this.http
          .post(`/api/v1/uploading/company/${this.companyID}/company_avatar/`, formData)
          .pipe(takeUntil(this.destroy$))
          .subscribe((event: any) => {      
            // handle event here
            let url = event.info[0].url;
            this.company_info.avatar = url;
            this.globalUserProfileService.updateCompanyProfile(
              {
                name:this.company_info.name,
                url
              }
            );
          });
      }
      
    }
    
  }
  openProfile(){
    this.modal.title = 'Edit Profile';
    this.modalType = 'editProfile';
    this.modal.open();
  }

  openModal(type: string) {
    this.modal.open();

    switch (type) {
      case 'following' :
        this.modal.size = 'lg';
        this.modalType = 'following';
        this.modal.title = 'Following';
        break;
      case 'followers' :
        this.modal.size = 'lg';
        this.modalType = 'followers';
        this.modal.title = 'Followers'; 
        break;
      case 'connections' : 
        this.modal.size = 'lg';
        this.modalType = 'connections';
        this.modal.title = 'Connections'; 
        break;
      case 'editProfile' : 
        this.modal.size = ''; 
        this.modal.title = 'Edit Profile';
        this.modalType = 'editProfile';
        break; 
    
    }

  }

  isProfileEmpty( data: any ): boolean {
   const keys = Object.keys(data);

   for (let index = 0; index < keys.length; index++) {          

        if( Array.isArray(data[keys[index]] ) && 
            keys[index] !== 'available_translations' &&
            keys[index] !== 'websites' ) {     
              if(data[keys[index]].length > 0  ) {
                    return false;        
              }
        }

        if( data[keys[index]] === 'foundation_date' && data[keys[index]] ) {
                   return false;
        }

        if( data[keys[index]] === 'gallery' && 
            data[keys[index]]['gallery']['files'].length < 0 
          ){
                  return false;
        }
   }
   return true;
  }


  openChatBox(name, avatar, id) {

    let mutation = this.globalUserProfileService.isCompanyActive() ?
                   this.comapnyService
                       .openSmallChatBoxForComapny({
                           avatar, 
                           name, 
                           id, 
                           companyId:this.globalUserProfileService.getComapnyId()
                         } , true) :   /// Company 
                   this.comapnyService
                       .openSmallChatBox({avatar , id , name } , true); /// User

     mutation
          .pipe(takeUntil(this.destroy$))
          .subscribe(({data}) => {
            let chatId = data.CreateConversation ? 
                        data.CreateConversation.id  :  /// User 
                        data.CreateConversationForCompany.id; /// Company 
                        
            this.appComponent.addChatBox(chatId);
          });
 }

  getResultFromPopup(e){
    let { isFollow , isBlocked } = e;

    this.isFollow = isFollow;
    
  }
  

   /// Statictist /// 

    followUnFollowStatistic(id:string , isFollow:boolean){
      if(id){
        let path =  isFollow ? 'follow' : 'unfollow';
        this.statisticService
            .sentCompanyStatistic(
              {
                ...this.getSharedDataStatistic,
                followerId:id
              },
              path
            )
            .pipe(takeUntil(this.destroy$))
            .subscribe()
      }
    }

    closeModal() {
      this.modal.close(); 
    }

    /// Statictist /// 

  /* w
 ========================================================
 End of Services
 ========================================================
  */

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
     

}
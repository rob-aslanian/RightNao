import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { AppModalComponent } from '../../app-modal/app-modal.component';
import { UserBoxActions, JobCategory } from './userbox.models';
import { JobsCompanyService } from 'src/app/_shared/services/jobs/jobs-company.service';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { SaveToPDFComponent } from '../../save-to-pdf/save-to-pdf.component';
import { CompanyProfileService } from 'src/app/_shared/services/companies/company-profile.service';
import { AppComponent } from 'src/app/app.component';
import { ActivatedRoute } from '@angular/router';
import { ProfileStatisticService } from 'src/app/_shared/services/statistic/profile-statistic.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AdsService } from 'src/app/_shared/services/ads/ads.service';


@Component({
  selector: 'app-user-box',
  templateUrl: './user-box.component.html',
  styleUrls: ['./user-box.component.scss' , '../index.scss']
})
export class UserBoxComponent implements OnInit , OnDestroy {

  private _applicants:any[];

  destroy$:Subject<any> = new Subject<any>();

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;
  @ViewChild(SaveToPDFComponent, { static: false }) pdf:SaveToPDFComponent;
  userFragment: any;


  @Input() set applicants(value:any[]){
                 this._applicants = value;
              }
            get applicants(){
              return this._applicants;
            }

  @Input() companyID:string;
  @Input() jobId:string;
  @Input() type:string;
  @Input() category:string;
  @Input() isLanding: boolean; 
  showMenu: boolean = false;
  
  skillsNumber:number = 6;
  selectedUser:any;
  userActions = UserBoxActions;
  utils = utilities;
  checkedApplicants:any[] = [];

  isUserChecked:{
    [id:number]:boolean,
    _checked:boolean
  } = {
    _checked:false
  }

  isDetails:{
    [id:number]:boolean
  } = {};

  showMoreSkills:{
    [id:number]:boolean;
  } = {};
  resume:any;
  modalType:string;
  isCloseModal: boolean = false;
  sharedLink:string;

  constructor(
    private jobService:JobsCompanyService,
    private companyService:CompanyProfileService,
    private appComponent:AppComponent,
    private router:ActivatedRoute,
    private statisticService:ProfileStatisticService,
    private adService:AdsService
  ) {

   }

  ngOnInit() {
 
    
    this.userFragment = this.router.snapshot.fragment;
    // this.isLanding = this.router.url.includes
    
  }

  ngAfterViewInit(): void {

    try{
       document.querySelector('#' + this.userFragment)
               .scrollIntoView({behavior:'smooth'});

       this.router.snapshot.fragment = '';
    }catch(e){
      
    }
    
  }

  getLink(applicant):string {
    let url = applicant.url,
        link = `${utilities.getLocationLink}/user/profile/${url}`;

    this.sharedLink = link;

    return link;
  }


  chekedAny(){
    return this.isUserChecked['_checked'] =  
                      Object.keys(this.isUserChecked)
                            .some(key => {
                                if(key !== '_checked'){
                                    return this.isUserChecked[key];
                                }
                            });
  }

  toggleCheckedkApplicant(index){
    return this.isUserChecked[index] ?  this.checkedApplicants.push(this.applicants[index]) : 
                                        this.checkedApplicants.splice(index , 1);
  }


  toggleCheckedUser(index:number , e:any){
   this.isUserChecked[index] = e.target.checked;
  

   this.toggleCheckedkApplicant(index);
   this.chekedAny();
  }

  toggleAllUser(e:any){
    let checked = e.target.checked;

    for(let i = 0; i < this.applicants.length; i++){
      this.isUserChecked[i] = checked;
    }


    checked ? this.checkedApplicants = [...this.applicants] :
              this.checkedApplicants = [];
    this.chekedAny();
  }

  makeRequest(category:JobCategory , userId:string , index?:number){
    this.jobService
        .setJobCategory(
          {
            companyId:this.companyID,
            jobId:this.jobId,
            applicationId:userId,
            category
          }
        )
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          () => {
             if(this.type &&  this.type !== category){
               this.applicants.splice(index , 1);
             }
          },
          (err) => {}
        )
  }

  setUserCategory(category:JobCategory, aplicant:any | any[] , index?:number){

  
    /// If only one applicant
    if(!Array.isArray(aplicant)){
      this.makeRequest(category , aplicant.userId , index);
      aplicant.application.metadata.category = category;
    }
    /// If some applicants 
    else{
       let aplicants = aplicant;
       
       aplicants.map(appl => {
          this.makeRequest(category , appl.userId , index);
          appl.application.metadata.category = category;
       });


       
    }
  }

  openChatBox(applicant:any , link?:string){
    let { avatar,firstname ,lastname, id  } = applicant,
        name =  `${firstname} ${lastname}`;
       avatar =  avatar ? '/file/'+ avatar : 'assets/img/124.svg';

     this.companyService
         .openSmallChatBoxForComapny({avatar , id , name , companyId:this.companyID})
         .pipe(takeUntil(this.destroy$))
         .subscribe(
           ({data}) => {

              let convId = data.CreateConversationForCompany.id;
              this.appComponent.addChatBox(convId);

           }
         )  
  }

  share(aplicant){
   let url = aplicant.url,
       link = `${location.origin}/user/profile/${url}`;
    
    this.appComponent.addChatBox('NEW');

    setTimeout(() =>   this.appComponent.prePopulateNewChatBoxText(link) , 200);

  }


  toggle(index:number , e:any , applicant?) {
    let target:HTMLElement = e.target;

    if (applicant.isAd && applicant.clicks > 0){
      this.adService
          .ClickOnAdvert(applicant.ad_id)
          .subscribe()
    }
   
    
    if(target.nodeName !== 'BUTTON' && !target.classList.contains('click__disable')){
      this.isDetails[index] = !this.isDetails[index];

      if(this.isDetails[index]) { this.candidateClickedStatistic(applicant.user) }

      Object.keys(this.isDetails)
            .map(key => +key != index ? delete this.isDetails[key] : null) /// Clear previos 

    }
  }

  moreSkills(index){
    this.showMoreSkills[index] = !this.showMoreSkills[index];

    Object.keys(this.showMoreSkills)
          .map(key => +key != index ? delete this.showMoreSkills[key] : null) /// Clear previos 
    
  }

  open(type:string , content){
    this.modalType = type;
    this.selectedUser = content.user;
    this.modal.open();

    if(type === 'report'){
      this.modal.title = 'Report user';
    }else{
      this.isCloseModal = false;
      this.modal.title = 'Invite to apply';
    }
  }

  close(e){
    this.isCloseModal = true;
    this.modal.close();
  }

  donwloadResume(applicants:any | any[]){
      this.resume = applicants;   
      
      setTimeout(() => this.pdf.saveCV() , 200)

      
  }

  sortBy(key:string , elem:string){
    if(!key && !elem) return;

    if(key === 'date'){
      return this.applicants.reverse();
    }

    this.applicants.sort((a , b) => {
      if(key === 'experience'){
        a[elem][key] = this.utils.getExperienceScrore(a[elem][key]);
        b[elem][key] = this.utils.getExperienceScrore(b[elem][key]);

        return a[elem][key] <  b[elem][key] ? -1 : 1;
      };

      return a[elem][key].toLowerCase() < b[elem][key].toLowerCase()  ? -1 : 1;
    });

  }

  saveCandidate(userId:string){
   return  this.jobService
              .saveCandidate(this.companyID , userId)
              .pipe(takeUntil(this.destroy$))
              .subscribe(
                () => {},
                (err) => {}
              )
  }

  unsaveCandidate(userId:string , idx?:number){
    return this.jobService 
                .unsaveCandidate(this.companyID , userId)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                  () => {
                    /// Remove from saved 
                    if(this.category === 'saved'){
                      this.applicants.splice(idx , 1);
                    }
                  },
                  (err) => {}
                  
                )
  };

  skipCandidate(userId:string){
    return  this.jobService
               .skipCandidate(this.companyID , userId)
               .pipe(takeUntil(this.destroy$))
               .subscribe(
                 () => {},
                 (err) => {}
               )
   }

   unskipCandidate(userId:string) {
    return  this.jobService
                .unskipCandidate(this.companyID , userId)
                .pipe(takeUntil(this.destroy$))
                .subscribe(
                  () => {},
                  (err) => {}
                )
   }

   /// Statistic ///
   candidateClickedStatistic(user){
      if(user){
        let userId = user.id;

        this.statisticService
            .sentCompanyStatistic(
              {
                id:this.companyID,
                userId,
                os:navigator.platform,
                timestamp:new Date().toISOString()
              }, 'candidate_clicked'
            )
            .pipe(takeUntil(this.destroy$))
            .subscribe()
      }
    
   }

   trackByFn = (index) => index;

   ngOnDestroy(): void {
     this.destroy$.next();
     this.destroy$.complete();
     this.modal.close();
   }


}

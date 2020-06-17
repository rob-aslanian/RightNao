import { Component, OnInit, Input, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { UserJobsService } from 'src/app/_shared/services/jobs/user-jobs.service';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { AppComponent } from 'src/app/app.component';
import { CompanyProfileService } from 'src/app/_shared/services/companies/company-profile.service';
import { AppModalComponent } from '../../app-modal/app-modal.component'
import { PlanPrices } from 'src/app/jobs/models/postJobmodels'
import { ProfileStatisticService } from 'src/app/_shared/services/statistic/profile-statistic.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { WalletService } from 'src/app/wallet/shared/wallet.service';
import { AdsService } from 'src/app/_shared/services/ads/ads.service';



@Component({
  selector: 'app-company-box',
  templateUrl: './company-box.component.html',
  styleUrls: ['./company-box.component.scss' , '../../../../jobs/job-list/job-list.component.scss']
})
export class CompanyBoxComponent implements OnInit , OnDestroy {

  destroy$:Subject<any> = new Subject<any>();

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;

  @Input() type:string;
  @Input() jobs;
  @Input() isLanding: boolean; 
  @Input() id:string;
  @Input() showDetail:boolean = true;

  @Output() job:EventEmitter<any> = new EventEmitter<any>();
  

  modalType:string;
  utils = utilities;
  userId:string;
  jobId: string;
  showMorePopup:boolean = false;
  plans = PlanPrices;
  applyCompany:any;
  isCloseModal:boolean = true;
  isDetails:{
    [id:number]:boolean
  } = {};
  selectedDescription: any;
  selectedWhyUs: any;
  descriptionLang:string;
  sharedLink:string;
  isAuth:boolean = false;
  isCompany:boolean = false;
  currentCompanyId:string;

  constructor(
    private jobService:UserJobsService,
    private globalService:GlobalUserProService,
    private companyService:CompanyProfileService,
    private appComponent:AppComponent,
    private statisticService:ProfileStatisticService,
    private router:Router,
    private walletService: WalletService,
    private adService:AdsService
  ) { }

  ngOnInit() {
    this.userId = this.globalService.getUserId();
    this.isAuth = this.globalService.isAuthenticated();
    this.isCompany = this.globalService.isCompanyActive();
    this.currentCompanyId = this.isCompany && 
                            this.globalService.getComapnyId();
    

  }

  ngAfterViewInit(): void {
 

    if(!!this.id){
      const doc:HTMLDivElement =  document.querySelector(`#job_id${this.id}`);
      if(doc) {
        setTimeout(() => {
          doc.click();
          doc.scrollIntoView({behavior:"smooth"})
        } , 10)
      }

    }
  }


  toggle(index:number , e:any , job?) {
    let target:HTMLElement = e.target,
        nodeName = target.nodeName;

    if (job.isAd && job.clicks > 0){
      this.adService
          .ClickOnAdvert(job.ad_id)
          .subscribe()
    }

    if(!this.showDetail) {
      this.job.emit(job);
    }
    
    if(nodeName !== 'BUTTON' && 
       nodeName !== 'SELECT' &&
       nodeName !== 'OPTION' &&
      !target.classList.contains('click__disable')){
        
      this.isDetails[index] = !this.isDetails[index];

      if(this.isDetails[index]) this.jobClickStatistic(job);

      Object.keys(this.isDetails)
            .map(key => +key != index ? delete this.isDetails[key] : null) /// Clear previos 

    }
  }

  click = () =>  {
    this.isDetails[0] = !this.isDetails[0];

    Object.keys(this.isDetails)
          .map(key => +key != 0 ? delete this.isDetails[key] : null) /// Clear previos 
  }

  getLink(jobId:string){
    let link = `${utilities.getLocationLink}/jobs/user#${jobId}`;
   
    this.sharedLink = link; 

    return link;
  }


  openChatBox(companyId:string , company){
    let user = this.globalService.getUserProfile(),
        { avatar , name , id } = company;
        

        let mutation = this.isCompany ?
        this.companyService
            .openSmallChatBoxForComapny({
                avatar, 
                name, 
                id, 
                companyId:this.globalService.getComapnyId()
              } , true) :   /// Company 
        this.companyService
            .openSmallChatBox({avatar , id , name } , true); /// User

        mutation
            .pipe(takeUntil(this.destroy$))
            .subscribe(({data}) => {
            let chatId = data.CreateConversation ? 
                        data.CreateConversation.id  :  /// User 
                        data.CreateConversationForCompany.id; /// Company 
                        
            this.appComponent.addChatBox(chatId);

            this.walletService
            .earnCoinsForWallet('job_share', {silver_coins: 1})
            .subscribe ( (data) => {
                        this.walletService.changindLocalCoins(1);
            })
            });
  }

  share(company){
    let url = company.url,
        link = `${location.origin}/company/profile/${url}`;
     
     this.appComponent.addChatBox('NEW');
 
     setTimeout(() =>this.appComponent.prePopulateNewChatBoxText(this.sharedLink) , 200);
 
   }


  open(type:string , content?:any){

    this.modalType = type;
    this.jobId = content.id;
    this.applyCompany = content.company;
    this.modal.open();
    this.isCloseModal = false;


    if(type === 'apply'){
      this.modal.title = `Apply to ${content.job_details.title}`;
    }

    if(type === 'report'){
      this.modal.title = 'Reporting';
    }
  }

  redirect(){
    this.router.navigate(['/registration/user'])
  }

  close(e){
    this.isCloseModal = true;
    this.modal.close();
  }

  changeLang($event){
    let target = $event.target;

    if(target && target.value){
      let abbr = target.value.toLowerCase();
      
      this.descriptionLang = abbr;

    }
    
  }

  /**
   * Skip job 
   * 
   * @param jobId 
   */
  skipJob(jobId:string){
    this.jobService
        .skipJob(jobId)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
  }


  /**
   * Unskip job 
   * 
   * @param jobId 
   */
  unskipJob(jobId:string){
    this.jobService
        .unskipJob(jobId)
        .pipe(takeUntil(this.destroy$))
        .subscribe();
  }

  /**
   * Save job 
   * 
   * @param jobId 
   */
  saveJob(jobId:string){
    this.jobService
        .saveJob(jobId)
        .pipe(takeUntil(this.destroy$))
        .subscribe()
  }
  

  /**
   * Unsave job
   * 
   * @param jobId 
   */
  unsaveJob(jobId:string , index?:number){
    
    if(this.type === 'saved'){
      this.jobs.splice(index , 1);
    }

    this.jobService
        .unsaveJob(jobId)
        .pipe(takeUntil(this.destroy$))
        .subscribe()
  }


  /// Statistic /// 
  jobClickStatistic(job){
    if(job){
      let jobId = job.id,
          companyId = job.company.id;

      this.statisticService
          .sentUserStatistic({
              jobId,
              companyId,
              id:this.globalService.getProfileId(),
              isCompany:this.globalService.isCompanyActive(),
              os:navigator.platform,
              timestamp:new Date().toISOString()
            } , 'job_clicked'
          )
          .pipe(takeUntil(this.destroy$))
          .subscribe()
    }
    
  }

  trackByFn =  (index) => index;

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.modal.close();
  }

}

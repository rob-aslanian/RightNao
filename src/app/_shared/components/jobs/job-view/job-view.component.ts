import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { UserJobsService } from 'src/app/_shared/services/jobs/user-jobs.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { CompanyProfileService } from 'src/app/_shared/services/companies/company-profile.service';
import { AppComponent } from 'src/app/app.component';
import { WalletService } from 'src/app/wallet/shared/wallet.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AppModalComponent } from '../../app-modal/app-modal.component';
import { Router } from '@angular/router';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { CompanyDetailsComponent } from '../company-details/company-details.component';

@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.scss']
})
export class JobViewComponent implements OnInit {

  destroy$:Subject<any> = new Subject<any>();
  
  @Input() job;
  @Input() id:string;
  
  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;
  @ViewChild(CompanyDetailsComponent, { static: true }) detail:CompanyDetailsComponent;



  modalType:string;
  userId:string;
  jobId: string;
  showMorePopup:boolean = false;
  applyCompany:any;
  isCloseModal:boolean = true;
  selectedDescription: any;
  selectedWhyUs: any;
  descriptionLang:string;
  sharedLink:string;
  isAuth:boolean = false;
  isCompany:boolean = false;
  currentCompanyId:string;
  showTop:boolean = false;

  constructor(
    private jobService:UserJobsService,
    private globalService:GlobalUserProService,
    private companyService:CompanyProfileService,
    private appComponent:AppComponent,
    private router:Router,
    private walletService: WalletService,
  ) {
    this.userId = this.globalService.getUserId();
    this.isAuth = this.globalService.isAuthenticated();
    this.isCompany = this.globalService.isCompanyActive();
    this.currentCompanyId = this.isCompany && 
                            this.globalService.getComapnyId();
   }



  ngOnInit() {
    console.log(this.job);
    
  }

  onScroll(top:number){
    this.showTop = top >= 100; 
  }

  redirect(){
    this.router.navigate(['/registration/user'])
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

  getLink(jobId:string){
    let link = `${utilities.getLocationLink}/jobs/user#${jobId}`;
   
    this.sharedLink = link; 

    return link;
  }

  close(e){
    this.isCloseModal = true;
    this.modal.close();
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
  
    this.jobService
        .unsaveJob(jobId)
        .pipe(takeUntil(this.destroy$))
        .subscribe()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.modal.close();
  }


}

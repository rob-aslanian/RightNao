import {
  Component,
  OnInit,
  Input,
  ViewChild,
  HostListener,
  EventEmitter,
  Output
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { RecommendationService } from "../../../_shared/services/recommendation.service";
import ReportReasons from "./models/reportReason.model";
import { UserJobsService } from "src/app/_shared/services/jobs/user-jobs.service";
import { ProfileStatisticService } from "../../services/statistic/profile-statistic.service";
import { GlobalUserProService } from "../../services/global-user-pro.service";
import { IStatistic } from "../../models/statistic/statistic.interface";

@Component({
  selector: "app-report-block-user",
  templateUrl: "./report-block-user.component.html",
  styleUrls: ["./report-block-user.component.scss"]
})
export class ReportBlockUserComponent implements OnInit {

  modalForm: FormGroup;
  reportModal: FormGroup;
  reportUser: boolean = false;
  editUser: boolean = true;

  reportReasonKey:any;
  reportReasons:any;
  blockUserFun:boolean = false; 

  @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
  @Output() isBlocked:EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() blockId;
  @Input() type:string;
 


  constructor(
    private fb: FormBuilder,
    private Recommend: RecommendationService,
    private jobsService:UserJobsService,
    private statisticService:ProfileStatisticService,
    private globalService:GlobalUserProService
  ) {
    this.modalForm = this.fb.group({
      blockUser: ["", Validators.required]
    });

    this.reportModal = this.fb.group({
      violate: [""],
      text:["",]
    });
  }

  ngOnInit() {
      /// Init report reasons ///
      this.reportReasonKey =  Object.keys(ReportReasons[this.type]);

      this.reportReasons = ReportReasons[this.type];
  }

  get isCompany(){
    return this.globalService.isCompanyActive();
  }

  get profileId(){
    return this.globalService.getProfileId();
  }

  get getSharedForStatistic() : IStatistic{
    return {
        id:this.profileId,
        isCompany:this.isCompany,
        timestamp:new Date().toISOString(),
        os:navigator.platform,
    }
  }


  submitForm(form) {
    if (form.invalid) {
      return;
    }

    if (form.value.blockUser === "report") {
      this.editUser = false;
      this.reportUser = true;
    } else if (form.value.blockUser === "block") {
      this.blockUserFun = true;
      this.editUser = false;
    }
  }
  reportingUser(reportModal) {
  
    let text = this.reportModal.get('text').value,
        reportReason = this.reportModal.get('violate').value;

      if(!!reportReason){

        this.reportProfileStatistic(reportReason);

        switch(this.type){
          case'jobs':{
            this.jobsService
                .reportJob(this.blockId , reportReason ,  text)
                .subscribe();
                
            break;
          }
          case'company':{
            this.Recommend
                .reportCompany(this.blockId.id ,  reportReason , text);

            break;
          }

          case'user':{
            this.Recommend
                .reportUser(this.blockId.id , reportReason , text);
            break;
          }

          default:break;
        }

        this.closeModal.emit(true);
        this.editUser = true;
        this.reportUser = false;
      }
  }

  get getName(){
    let firstName =  this.blockId.firstname ||   
                     this.blockId.first_name || 
                     this.blockId.firstName ||  
                     this.blockId.name,

        lastName  =  this.blockId.lastname || 
                     this.blockId.lastName ||  
                     this.blockId.last_name;

    return firstName && lastName ? 
           `${firstName} ${lastName}` :
           firstName
  }
  
  blockUser(){
    let id = this.blockId.id;
     this.editUser = false;

      this.type === 'user'  ? this.Recommend.blockUser(id) :
                       this.Recommend.blockCompany(id);

        this.isBlocked.emit(true);
        this.closeModal.emit(true);     
        this.editUser = true;
        this.blockUserFun  = false;

    this.blockProfileStatistic();
      
  }



  //// Statistic ////
  
  reportProfileStatistic(reason:string){
    let mutation = this.type === 'company' ? 
                   this.statisticService.sentCompanyStatistic :
                   this.statisticService.sentUserStatistic

      mutation.apply(this.statisticService , [{
        ...this.getSharedForStatistic,
        reportId:this.blockId.id,
        reportReason:reason,
      } , 'report'])
      .subscribe()
  }

  blockProfileStatistic(){
    let mutation:Function = this.type === 'company' ? 
                    this.statisticService.sentCompanyStatistic :
                    this.statisticService.sentUserStatistic

    mutation.apply(this.statisticService , [{
      ...this.getSharedForStatistic,
      blockId:this.blockId.id
    } , 'block'])
    .subscribe()
  }

  //// Statistic ////

  trackByFn =  (index) => index;
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IJob } from 'src/app/_shared/models/jobs/jobs.interface';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { ICompanyProfile } from 'src/app/_shared/models/company/companyProfile.interface';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { JobBenefits, PlanPrices } from '../models/postJobmodels';

@Component({
  selector: 'app-job-preview-modal',
  templateUrl: './job-preview-modal.component.html',
  styleUrls: ['./job-preview-modal.component.scss', '../candidate-list/candidate-list.component.scss', '../../_shared/css/modals_shared_styles.scss']
})
export class JobPreviewModalComponent implements OnInit {

  @Input() data: IJob;
  @Output() result: EventEmitter<{publish:boolean , draft:boolean}> = new EventEmitter<{publish:boolean , draft:boolean}>();

  companyInfo:ICompanyProfile;
  utils = utilities;
  descriptionLangs:string[] = [];
  selectedDescription:any;
  selectedWhyUs:any;
  hiringDate:string;
  benefits:string[];
  jobPlan:string;
  descriptionLang:string;


  constructor(
    private globaService:GlobalUserProService,

  ) { }

  ngOnInit() {
    this.companyInfo = this.globaService.getCompanyProfile();

    
    
    if(this.data){
      let { descriptions  , benefits } = this.data.details;

      let { job_plan } = this.data.meta;

      this.descriptionLangs = descriptions.map(desc => desc.language.toLocaleUpperCase());
      this.selectedDescription = descriptions[0].description;
      this.selectedWhyUs = descriptions[0].why_us;
      
      /// Parse date ///
      // if((publish_day && publish_day !== 0) || 
      //    (publish_month && publish_month !== 0) || 
      //    (publish_year && publish_year !== 0)){

      //   this.hiringDate = `${publish_day}-${publish_month}-${publish_year}`;
      // }

      /// Parse benefits ///
      if(benefits && benefits.length > 0){
         this.benefits = benefits.map(ben => JobBenefits.filter(b => b.id === ben)[0].name);
      } 

      /// Parse job plan 
      if(job_plan){
         if(PlanPrices[job_plan]){
           this.jobPlan = PlanPrices[job_plan].subName;
         }
      }
      
    }

  }

  changeLang($event){
    let target = $event.target;

    if(target && target.value){
      let abbr = target.value.toLowerCase();
      
      this.descriptionLang = abbr;

    }
    
  }

  // Save Job as draft
  saveJobAsDraft() {
    this.result.emit({
      publish:false,
      draft:true
    });
  }

  // Publish Job
  publishJob() {
    this.result.emit({
      publish:true,
      draft:false
    });
  }
}

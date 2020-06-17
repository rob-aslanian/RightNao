import { Component, OnInit, ViewChild } from '@angular/core';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { CareerCenterService } from '../../career-center.service';
import { Observable } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { CompanyBoxComponent } from 'src/app/_shared/components/jobs/company-box/company-box.component';

@Component({
  selector: 'app-company-career-center-jobs',
  templateUrl: './company-career-center-jobs.component.html',
  styleUrls: ['./company-career-center-jobs.component.scss']
})
export class CompanyCareerCenterJobsComponent implements OnInit {

  @ViewChild( AppModalComponent, { static: false } ) private _modal: AppModalComponent;

  jobs:Observable<any>;
  companyID:string;
  isCompany:boolean;
  job: any = [];

  @ViewChild( CompanyBoxComponent, { static: false })  _companyBox: CompanyBoxComponent;


  constructor(
    private utilService:UtilsService,
    private careerService:CareerCenterService,
    private globalService:GlobalUserProService,
  ) { 

  }

  ngOnInit() {
    this.isCompany = this.globalService.isCompanyActive();
    this.companyID = this.careerService.profileID.getValue()

    this.jobs =  this.utilService
                     .searchJobsById(this.companyID)
  }

  searchJob(e){

    if(e.which >= 65 && e.which <= 90 || e.which === 8){
      let value = e.target.value !== '' ? e.target.value : undefined;


      this.jobs = this.utilService
                      .searchJobsById(this.companyID , value)
                      .pipe(debounceTime(500),)
    }


  }

  openJob( job: any ) {
    this.job.push( job );
    this._modal.open();

    
    setTimeout(() =>  this._companyBox.click()  , 0)
    
  }

  close() {
     this.job = []; 
  }

}

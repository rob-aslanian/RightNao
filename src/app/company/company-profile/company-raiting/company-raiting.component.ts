import { Component, OnInit, ViewChild, NgModule } from '@angular/core';

import { CompanyProfileService } from 'src/app/_shared/services/companies/company-profile.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-raiting',
  templateUrl: './company-raiting.component.html',
  styleUrls: ['./company-raiting.component.scss']
})
 

export class CompanyRaitingComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) _modal: AppModalComponent;

  companyId:string;
  companyUrl: any; 
  modalType: string;

  companyReviews: any[] = []; 
  companyRates: any[] = []; 
  amountOfEachRate: any;

  isAuth:boolean = false; 
  isAdmin:boolean = true;  

  math = Math;


 
 
  constructor(
    private companyReviewService: CompanyProfileService,
    private globalService:GlobalUserProService,
    private router: ActivatedRoute
    ) { 

      
    }

  ngOnInit() {
    this.isAuth = this.globalService.isAuthenticated();
    this.companyId = this.router.snapshot.params['id'];
    this.companyUrl = this.globalService.getCompanyProfile()['url']; 

    this.getCompanyReviews();
    this.getCompanyRate();
    this.getAmountOfEachRate();
    this.checkIfCompanyIsAdmin();
    
  }

  checkIfCompanyIsAdmin() {
    this.router.queryParams.subscribe(
      (data) => {
        this.isAdmin = JSON.parse(data['admin']);
      }
    )
  }

  openReview(id: string) {       
      // this.companyId = id;
      this._modal.open();
      this._modal.title = "Write a Review";
      this.modalType = 'write';
  }
  
  close(){
    this._modal.close();
  }

  getScore(score:string){
    return utilities.getScore(score);
  }

  getCompanyReviews() {
    return this.companyReviewService
    .getReviews(this.companyId)
    .subscribe(({data})=> {
      this.companyReviews = data.GetCompanyReviews;
        
    });     
  }

  getCompanyRate() {
    return this.companyReviewService
    .getCompanyRate(this.companyId)
    .subscribe(({data}) => {
      this.companyRates = data.GetCompanyRate;
    })
  }

  getAmountOfEachRate() {
    return this.companyReviewService
    .getAmountOfEachRate(this.companyId)
    .subscribe(({data}) => {
      this.amountOfEachRate = data.GetAmountOfEachRate;
    })
  }
}

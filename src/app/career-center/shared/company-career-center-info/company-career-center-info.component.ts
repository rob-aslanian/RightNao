import { Component, OnInit } from '@angular/core';
import { CareerCenterService } from '../../career-center.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { DropCVOptions } from '../../models/career-center.model';

@Component({
  selector: 'app-company-career-center-info',
  templateUrl: './company-career-center-info.component.html',
  styleUrls: ['./company-career-center-info.component.scss']
})
export class CompanyCareerCenterInfoComponent implements OnInit {

  profile:Observable<any>;
  isCompanyActive:boolean;
  profileID:string;
  DropCVOptions = DropCVOptions;
  dropCvRadio:string;

  constructor(
    private careerService:CareerCenterService,
    private utilService:UtilsService,
    private globalService:GlobalUserProService,
    private router:Router
  ) { }

  ngOnInit() {
    this.profile = this.careerService.companyProfile;
    this.isCompanyActive = this.globalService.isCompanyActive();
    this.profileID = this.globalService.getProfileId();
  }


  companyProfileAction(profle){
     if (profle){
        const { id , my_role ,  career_center}  = profle; 

        // Edit 
        if (my_role !== "role_unknown" && this.isCompanyActive) {
            this.router
                .navigate(['/career_center/company/manage'] , { state: { profile:career_center } })
        } else {
          // Follow 
          if(!profle.follow){
            const mutation =   this.isCompanyActive ?
                                this.utilService
                                    .followCompnayForCompany(this.profileID , id) : /// Compny to company 
                                this.utilService
                                    .followCompanyForUser(id); /// User to company 

                                  
             mutation.subscribe();
          }
        }
     }
  }

  dropCv(id:string) {
    
    this.careerService
        .addCVInCareerCenter(id , {
          ExpierencedProfessionals:this.dropCvRadio === "ExpierencedProfessionals",
          NewJobSeekers:this.dropCvRadio === "NewJobSeekers",
          YoungProfessionals:this.dropCvRadio === "YoungProfessionals"
        })
        .subscribe()
    
  }

}

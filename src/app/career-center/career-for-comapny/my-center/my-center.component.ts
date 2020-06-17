import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CareerCenterService } from '../../career-center.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-my-center',
  templateUrl: './my-center.component.html',
  styleUrls: ['./my-center.component.scss']
})
export class MyCenterComponent implements OnInit , OnDestroy {

  destroy$:Subject<any> = new Subject<any>();

  constructor(
    private router:ActivatedRoute,
    private careerService:CareerCenterService,
    private gloablService:GlobalUserProService,
    private location:Location
  ) {

      // if(!gloablService.isCompanyActive()) { 
      //    if(!gloablService.hasCareerCenter){
      //       location.back(); 
      //    }
      // }
   }

  ngOnInit() {

    this.router
        .params
        .pipe(takeUntil(this.destroy$))
        .subscribe(el => {
           const id = el['id'] || 
                      this.gloablService.getComapnyId();

           this.setProfileData(id);
        })
  }


  setProfileData(id:string){
    if(id){         
      console.log(id);
         
      // Set Comapny ID 
      this.careerService
          .profileID
          .next(id);

      // Get Company Profile 
      this.careerService
          .GetCompanyProfile(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe(data => {
             this.careerService
                 .companyProfile
                 .next(data)
          })
     }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

  }

}

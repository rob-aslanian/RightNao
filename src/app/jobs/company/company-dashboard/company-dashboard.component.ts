import { Component, OnInit } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';

@Component({
  selector: 'app-company-dashboard',
  templateUrl: './company-dashboard.component.html',
  styleUrls: ['./company-dashboard.component.scss']
})
export class CompanyDashboardComponent implements OnInit {

  careerCenterLink:string = "/career_center/company";

  constructor(
    private gloablService:GlobalUserProService
  ) { }

  ngOnInit() {
     if (!this.gloablService.hasCareerCenter) {
        this.careerCenterLink += '/manage';
     }
  }

}

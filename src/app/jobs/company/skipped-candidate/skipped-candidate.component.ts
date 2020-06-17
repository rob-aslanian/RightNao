import { Component, OnInit } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { JobsCompanyService } from 'src/app/_shared/services/jobs/jobs-company.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-skipped-candidate',
  templateUrl: './skipped-candidate.component.html',
  styleUrls: ['./skipped-candidate.component.scss']
})
export class SkippedCandidateComponent implements OnInit {

  isCompany: boolean = false;
  companyId:string;
  skippedCandidates:Observable<any>

  constructor(
    private globalUserProfileService: GlobalUserProService, 
    private jobService:JobsCompanyService
  ) {
    this.isCompany = globalUserProfileService.isCompanyActive();
    this.companyId = globalUserProfileService.getComapnyId();
   }

  ngOnInit() {
    this.skippedCandidates    =   this.jobService
                                      .getSkippedCandidates(this.companyId)
                                      .pipe(map(({data}) => data['GetSkippedCandidates'])) /// Skipped Candidates
  }

}

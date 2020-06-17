import { Component, OnInit } from '@angular/core';
import { JobsCompanyService } from 'src/app/_shared/services/jobs/jobs-company.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-saved-candidates',
  templateUrl: './saved-candidates.component.html',
  styleUrls: ['./saved-candidates.component.scss']
})
export class SavedCandidatesComponent implements OnInit {

  isCompany: boolean = false;
  companyId:string;
  savedCandidates:Observable<any>;

  constructor(
    private globalUserProfileService: GlobalUserProService, 
    private jobService:JobsCompanyService
  ) {
    this.isCompany = globalUserProfileService.isCompanyActive();
    this.companyId = globalUserProfileService.getComapnyId();
   }

  ngOnInit() {
    this.savedCandidates    =   this.jobService
                                    .getSavedCandidates(this.companyId)
                                    .pipe(map(({data}) => data['GetSavedCandidates'])) /// Saved Candidates
  }

}

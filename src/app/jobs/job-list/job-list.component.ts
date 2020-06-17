import { Component, OnInit, Input } from '@angular/core';
import { GlobalUserProService } from '../../_shared/services/global-user-pro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent implements OnInit {
  
  isCompany: boolean = false; 
  constructor(
    private globalUserProfileService: GlobalUserProService,
    private router:Router
    ) { 
    this.isCompany = globalUserProfileService.isCompanyActive();
  }

  ngOnInit() {
    /// Redirect to user jobs 
    if(!this.isCompany){
      return this.router.navigate(['jobs/user']);
    }
    
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FollowersCompaniesComponent } from 'src/app/network/network-followers/followers-companies/followers-companies.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-followers',
  templateUrl: './company-followers.component.html',
  styleUrls: ['./company-followers.component.scss']   
})
export class CompanyFollowersComponent implements OnInit  {

  isPeople: boolean = false; 
  
  constructor(
    private router:ActivatedRoute
  ) {
          
  }     

  ngOnInit() {
    this.router.params.subscribe(
      (data) => this.isPeople = data['type'] === 'people'
    )
  }
}

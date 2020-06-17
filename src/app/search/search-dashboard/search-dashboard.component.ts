import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';

@Component({
  selector: 'app-search-dashboard',
  templateUrl: './search-dashboard.component.html',
  styleUrls: ['./search-dashboard.component.scss']
})
export class SearchDashboardComponent implements OnInit {

  keyword:FormControl;
  isCompany:boolean = false;

  constructor(
    private router:Router,
    private gloablService:GlobalUserProService,
  ) { 
    this.keyword = new FormControl();
  }

  ngOnInit() {
    this.isCompany = this.gloablService.isCompanyActive();
  }

  submit(){
    let value = this.keyword.value;

    if(value !== ""){
      this.router.navigate(['/search/all'] , { state: { keyword:value } })
    }
  }

}

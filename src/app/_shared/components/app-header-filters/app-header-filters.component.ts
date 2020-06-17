import { Component, OnInit, Input } from '@angular/core';
import { GlobalUserProService } from '../../services/global-user-pro.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-filters',
  templateUrl: './app-header-filters.component.html',
  styleUrls: ['./app-header-filters.component.scss']
})
export class AppHeaderFiltersComponent implements OnInit {

  isCompany: boolean;
  routerParam: string;

  searchParam:FormControl;
  
  constructor(
       private globalUserService:GlobalUserProService,
       private router:Router
  ) { 
    this.searchParam = new FormControl();
  }

  ngOnInit() {
    this.isCompany = this.globalUserService.isCompanyActive();
      
  }
  submit(type:string = 'all'){
    const value = this.searchParam.value;
  
    if(value !== ''){
      this.router.navigate([`/search/${type}`] , { queryParams: { keyword:value } });
      this.searchParam.reset();
    }
  }
}

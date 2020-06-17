import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalUserProService } from '../_shared/services/global-user-pro.service';
import { utilities } from '../_shared/utilities/utilities';

@Component({
  selector: 'app-network',
  templateUrl: './network.component.html',
  styleUrls: ['../_shared/css/modals_shared_styles.scss','./network.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NetworkComponent implements OnInit {

  selectedFilterList:string = 'All';
  showFilterList:boolean = false;
  userId: string; 
 
  constructor(

    public router: Router,
    private globaluser: GlobalUserProService
  ) {
    let isCompany = globaluser.isCompanyActive();
    if( isCompany ){
      router.navigate(['/network-company/following']);
    }
 
  }

  ngOnInit() {

  }
  

  get isMobile() : boolean {
    return utilities.isMobile;
  }


  showNav(e){
    let target:HTMLElement = e.target;

    target.parentElement.classList.toggle('mobile-nav');
    
    document.querySelectorAll('.mobile-nav')
            .forEach(el => el !== target.parentElement ? el.classList.remove('mobile-nav') : null);

    
  }

  setFilterList(e){
    e.preventDefault();

    this.selectedFilterList = e.target.innerHTML;
    this.showFilterList = false;
    
  }
}

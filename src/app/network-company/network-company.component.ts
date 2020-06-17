import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalUserProService } from '../_shared/services/global-user-pro.service';
import { utilities } from '../_shared/utilities/utilities';

@Component({
  selector: 'app-network-company',
  templateUrl: './network-company.component.html',
  styleUrls: ['../network/network.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NetworkCompanyComponent implements OnInit {

  constructor(
    public router: Router,
    private globaluser: GlobalUserProService
  ) {
    let isCompany = globaluser.isCompanyActive();
    if( !isCompany ){
      router.navigate(['/network']); 
    }
  }


  get isMobile() : boolean {
    return utilities.isMobile;
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { NetworkUserService } from 'src/app/_shared/services/network/network-user.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { NetworkCompanyService } from 'src/app/_shared/services/network/network-company.service';

@Component({
  selector: 'app-sent-invitations',
  templateUrl: './sent-invitations.component.html',
  styleUrls: ['./sent-invitations.component.scss']
})
export class SentInvitationsComponent implements OnInit {

  invationsUser: Observable<any>;
  companyId: string;
  isCompanyActive: boolean;

  constructor(
         private networkService:NetworkUserService,
         private globalService: GlobalUserProService,
         private networkServiceCompany:NetworkCompanyService,
  ) { 
       this.isCompanyActive = this.globalService.isCompanyActive();
       this.isCompanyActive ? this.companyId = this.globalService.getComapnyId() : '';
  }

  ngOnInit() {
  if ( this.isCompanyActive ) {
 
      this.invationsUser = this.networkServiceCompany
                                                  .getInvitations(this.companyId)
                                                  .pipe(map(({data}) => data['GetInvitationForCompany']))
 
      }
  else {
      this.invationsUser = this.networkService
                                            .getInvitations()
                                            .pipe(map(({data}) =>{
                                                  return data['GetInvitation']

                                              }))
      }
  }

  trackByFn =  (index) => index;

}

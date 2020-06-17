import { Component, OnInit } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { NetworkUserService } from 'src/app/_shared/services/network/network-user.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-network-landing',
  templateUrl: './network-landing.component.html',
  styleUrls: ['./network-landing.component.scss']
})
export class NetworkLandingComponent implements OnInit {
  isCompanyActive: boolean;
  friendRequests: Observable<any>;

  constructor(
    private storageService: GlobalUserProService,
    private networkService: NetworkUserService
  ) { }

  ngOnInit() {
    this.isCompanyActive = this.storageService.isCompanyActive();
    // Get friend requests 
    !this.isCompanyActive ? 
     this.friendRequests =  this.networkService
                              .getFriendRequests( false )
                                .pipe( map( ( { data } ) =>  data['getFriendRequests'] ) ) : ''
      
   }

}

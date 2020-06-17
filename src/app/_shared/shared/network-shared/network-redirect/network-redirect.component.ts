import { Component, OnInit } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import url from '../models/url';
import { NetworkService } from 'src/app/_shared/services/filters/network-service.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NetworkUserService } from 'src/app/_shared/services/network/network-user.service';
 


@Component({
  selector: 'app-network-redirect',
  templateUrl: './network-redirect.component.html',
  styleUrls: ['./network-redirect.component.scss']
})
export class NetworkRedirectComponent implements OnInit {

  network_info: Observable<any>;
  isCompanyActive: boolean;
  path: any = {}; 
  url:  { company: any , user: any } = url;

  connections: number = 0;

  contacts: number   = 0;

  constructor(
     private storageService: GlobalUserProService,
     private networkService:   NetworkService,
     private networkUserService: NetworkUserService
  ) { }

  ngOnInit() {
 
    this.isCompanyActive     = this.storageService.isCompanyActive();
    //Get Company Profile Network_info

    if(  this.isCompanyActive   ) {

      const id: string = this.storageService.getComapnyId();

      this.network_info =  this.networkService
      .getCompanyNetworkInfo( id ).pipe( 
                                      map( ({ data }) => data['GetCompanyProfileByID']['network_info']) 
                                    )
 
      // this.network_info = this.userProfileStore.getCompanyProfile().network_info;
      //Get company pach if company is active 
      this.path = this.url.company;
    }

    //Get User Profile Network_info
    else {

       const id: string = this.storageService.getUserProfile().id;

       this.network_info =  this.networkService
                                              .getUserNetworkInfo( id )
                                              .pipe( 
                                                map( ({ data }) => data['getProfileByID']['network_info']) 
                                              )
 
      //Get path for user 
      this.path = this.url.user;


      this.networkUserService
       .getContactInfo().subscribe( ( data ) => {
              data.map(
                  user => {
                      if( user.categories.length > 0 ) {
                            this.contacts++;
                      } else {
                            this.connections++;
                      }
                  }
              )
       })
    } 

 
  }

}

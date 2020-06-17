import { Component, OnInit, DoCheck, ViewChild, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from 'src/app/search/search.service';
import { SearchServiceInput } from 'src/app/search/models/search.model';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { SliderBadBoyEditionComponent } from 'src/app/_shared/shared/classified-ads/components/slider-bad-boy-edition/slider-bad-boy-edition.component';

@Component({
  selector: 'app-services-service-requests',
  templateUrl: './services-service-requests.component.html',
  styleUrls: ['./services-service-requests.component.scss']
})
export class ServicesServiceRequestsComponent implements OnInit, DoCheck {

  isMainPage: boolean = false; 

  searchServiceInput = SearchServiceInput;

  services: any = [];

  profileId: string;

  isLoading: boolean = true;

  servicesByLocation: any = [];



  @ViewChild( SliderBadBoyEditionComponent, { static: false } ) _slider: SliderBadBoyEditionComponent;

  constructor(
    private router: Router,
    private searchService: SearchService,
    private globalUserProfileService: GlobalUserProService,
    private utilsService: UtilsService,

  ) { 
         this.profileId = globalUserProfileService.getProfileId();
  }

  ngOnInit() {

    this.searchService
        .searchServices({...new SearchServiceInput() } , {first:10 , after: '0' })
        .subscribe( data => { this.services = data.service_search_result
                                  .filter( service => service.companyID || service.userID !== this.profileId ); this.isLoading = false });


    this.searchService

        .searchServices({ ...new this.searchServiceInput(), 
                          country: [this.globalUserProfileService.location]  }, {first:20 , after: '0' } )
                          
        .subscribe( data => {this.servicesByLocation = data.service_search_result
                                .filter( service => service.companyID || service.userID !== this.profileId ); });

    this.router.url === '/services/requests' ? this.isMainPage = true : this.isMainPage = false; 

  }


  routeToInviteFriend() {
    return this.router.navigate(['/services/requests/invite-friend']); 
  }



  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.

    this.router.url === '/services/requests' ? this.isMainPage = true : this.isMainPage = false; 

    
  }
 

 
  rotateLeft() {
     this._slider.back();   
  };

  rotateRight() {
      this._slider.next();
  };

 
}

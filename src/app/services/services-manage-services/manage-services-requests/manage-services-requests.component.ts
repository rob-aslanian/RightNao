import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicesService } from '../../services.service';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-manage-services-requests',
  templateUrl: './manage-services-requests.component.html',
  styleUrls: ['./manage-services-requests.component.scss']
})
export class ManageServicesRequestsComponent implements OnInit {

  listOfServiceReqs: any[] = []; 
  isCompanyActive: boolean = false;
  profileId: string = '';
  profileInfo: any = {};

  constructor(
    private servicesService: ServicesService,
    private utilsService: UtilsService,
    private globalUserProfileService: GlobalUserProService
  ) { 
      this.isCompanyActive = globalUserProfileService.isCompanyActive();
      this.profileId = globalUserProfileService.getProfileId();
  }

  ngOnInit() {

    this.getAllService(); 
  
  }

  getAllService() {
    const query: Observable<any> = this.isCompanyActive ? 
                                   this.utilsService.GetCompanyProfileInfo( this.profileId ) :
                                   this.utilsService.getUserProfileInfo( this.profileId );
    
    forkJoin(
         query,
         this.servicesService.getAllServiceReuests()
    ).subscribe( ([ profile, services ]) => {
         this.profileInfo = profile;
         this.listOfServiceReqs = services;
    })
  }; 

  getResult( idx: number ) {
        this.listOfServiceReqs.splice( idx, 1 );
  }
  
}

import { Component, OnInit, Input } from '@angular/core';
import { UtilsService } from '../../services/shared/utils.service';
import { OfficeService } from '../../services/v-office/office.service';
import { GlobalUserProService } from '../../services/global-user-pro.service';
import { Observable } from 'rxjs';
import { deliveryTime } from 'src/app/v-office/_shared/services.utils';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-request-box',
  templateUrl: './service-request-box.component.html',
  styleUrls: ['./service-request-box.component.scss']
})
export class ServiceRequestBoxComponent implements OnInit {

  @Input() service;
  
  profileInfo: any = {};
  
  loading: boolean = true;

  profileId: string = '';

  deliveryTime = deliveryTime ;


  constructor(
    private utilsService: UtilsService,
    private officeService: OfficeService,
    private globalUserProService: GlobalUserProService,
    private router: Router
  ) {
        this.profileId = globalUserProService.getProfileId();
   }

  ngOnInit() { 
    const query: Observable<any> = this.service.companyID ?
                                   this.utilsService.getCompanyProfileById( this.service.companyID ) :
                                   this.utilsService.getUserProfileInfo( this.service.userID );
    
    query.subscribe( data => {
           this.profileInfo = { isCompanyActive: !!this.service.companyID,  ...data} ;
           this.loading = false;
           console.log(this.profileInfo);
           
    })
};

saveOrUnsaveService( hasLiked: boolean ) {
     const mutation = !hasLiked ? 
                      this.officeService.SaveServiceRequest( this.service.id ) : 
                      this.officeService.UnSaveServiceRequest( this.service.id );
     mutation.subscribe( () => this.service.has_liked =  !this.service.has_liked );
}

navigateToService() {
    this.router.navigate(['v-office', 'service-request-detailed', this.service.id ]);
 }
}

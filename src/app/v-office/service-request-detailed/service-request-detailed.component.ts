import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { VOfficeService } from '../v-office.service';
import {  ActivatedRoute } from '@angular/router';
import { map, takeUntil } from 'rxjs/operators';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { Observable, Subject } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { OfficeService } from 'src/app/_shared/services/v-office/office.service';
import { deliveryTime } from '../_shared/services.utils';
import { PROJECT_TYPE } from 'src/app/search/models/search.model';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { ServicesService } from 'src/app/services/services.service';
 
@Component({
  selector: 'app-service-request-detailed',
  templateUrl: './service-request-detailed.component.html',
  styleUrls: ['./service-request-detailed.component.scss']
})
export class ServiceRequestDetailedComponent implements OnInit, OnDestroy {


  @ViewChild( AppModalComponent, { static: false } ) _modal: AppModalComponent;

  serviceID: string; 
  service: any = {}; 
  isCompanyActive: boolean = false; 
  profile: any = {};
  loading: boolean = true;
  profileId: string = '';
  deliveryTime: any = deliveryTime;
  projectType = PROJECT_TYPE;
  modalType: ( string | null )  = null;
  request: any  = {};
  review: any = null;
  serviceRequests: any[] = [];
  isLoadingReview: boolean = true;
  isLoadingServiceRequest: boolean = true;


  $destroy: Subject<any> = new Subject<any>();

  constructor(
    private vOfficeService:VOfficeService,
    private router: ActivatedRoute,
    private utilsSerive: UtilsService, 
    private globalSerice: GlobalUserProService,
    private appComponent:AppComponent,
    private officeService: OfficeService,
    private servicesService: ServicesService

  ) { }

  ngOnInit() {
      this.isCompanyActive = this.globalSerice.isCompanyActive();
      this.profileId = this.globalSerice.getProfileId();
      this.serviceID = this.router.snapshot.params.id; 
      this.getServiceRequests(); 
  };


  getServiceRequests() {
    return this.vOfficeService
                .getServicesRequest(this.serviceID)
                .pipe(
                  takeUntil( this.$destroy ),
                  map( ({data}) => data['GetServiceRequest'] )
                ).subscribe( service => {
                     this.getProfile( service.userID, service.companyID ).subscribe( ( data ) => {
                         this.profile = { isCompany: !!service.companyID, ...data  };
                         this.getServicesRequestReview(  this.profile.id  ) ;
                         this.servicesService
                             .getServicesRequest( this.profile.id ).pipe(
                                  map( ({ data }) => data['GetServicesRequest'] )
                             ).subscribe( data => { this.serviceRequests = data; this.isLoadingServiceRequest = false; } );  
                         this.loading = false;
                     }  );
                     
                     this.service = service;                    
                });
              
  };
 
  getProfile( userId: string, companyId: string ): Observable<any> {
       return companyId ? 
              this.utilsSerive.getCompanyProfileById(companyId) :
              this.utilsSerive.getUserProfileInfo(userId)
  }

 

  message( profile, isCompany: boolean ) {      
    const mutation = this.isCompanyActive ?
                     //Company
                     this.utilsSerive.openSmallChatBoxForComapny({
                          avatar: profile.avatar,
                          companyId: this.globalSerice.getComapnyId(),
                          id:profile.id,
                          name: name
                     }, isCompany ).pipe( map( ( { data } ) => data.CreateConversationForCompany.id )  ) : 
                     // User
                     this.utilsSerive.openSmallChatBox({
                          avatar: profile.avatar,
                          id:     profile.id,
                          name: `${ profile.firstname } ${ profile.lastname }`
                     }, isCompany ).pipe( map( ( { data } ) => data.CreateConversation.id )  )
                     
   mutation.subscribe( ( id ) => this.appComponent.addChatBox(id) );
}


likeOrUnlikeService( hasLiked: boolean, serviceId: string ) {
      const mutation = hasLiked ? 
                       this.officeService.UnSaveServiceRequest( serviceId ) :
                       this.officeService.SaveServiceRequest( serviceId );
      
      mutation.subscribe( () => this.service.has_liked = !this.service.has_liked );
}


openModal( type: string ) {
    this.request = { owner_id:  this.profile.id, request_id: this.service.id, is_owner_company: this.profile.isCompany };
    this.modalType = type;
    this._modal.title = type;
    this._modal.open();
}

getServicesRequestReview(  owner_id  ) {
  return this.servicesService
             .getServicesRequestReview( 0, 3, owner_id )
             .subscribe( data =>    { this.review = data; this.isLoadingReview = false; });                        
};  


ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
}

}

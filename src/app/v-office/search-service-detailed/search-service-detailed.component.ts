import { Component, OnInit, ViewChild } from '@angular/core';
import { OfficeService } from 'src/app/_shared/services/v-office/office.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { deliveryTime } from '../_shared/services.utils';
 

@Component({
  selector: 'app-search-service-detailed',
  templateUrl: './search-service-detailed.component.html',
  styleUrls: ['./search-service-detailed.component.scss']
})
export class SearchServiceDetailedComponent implements OnInit {

  @ViewChild( AppModalComponent, { static: false } ) _modal: AppModalComponent;

  officeId: string ;
  serviceId: string;
  service: any = {};
  office: any = {};
  review: any = {};
  loading: boolean = true;
  activeProfileId: string = '';
  activeProfileType: string = '';
  modalType: ( string | null ) = '';
  profileId: string = '';
  orderService: {
        owner_id: string,
        service_id: string,
        office_id: string,
        is_owner_company: boolean,
  } = {
    owner_id: '',
    service_id: '',
    office_id: '',
    is_owner_company: false,
  };

  deliveryTime = deliveryTime;
  otherService: any = null;


  constructor(
    private officeService: OfficeService,
    private activatedRouter: ActivatedRoute,
    private globalUserProService: GlobalUserProService,
  ) {
       this.profileId = globalUserProService.getProfileId();
   }

  ngOnInit() {

    this.officeId = this.activatedRouter.snapshot.params['officeId'];
    this.serviceId = this.activatedRouter.snapshot.params['id'];
 
    forkJoin(
        this.getServices(),
        this.getVoffice(),
        this.officeService.getServicesReview( this.officeId ),
        this.officeService.getVofficeServices(this.officeId, this.activeProfileId)
    ).subscribe( ( [ service, office, review, services ] ) => {
           const otherService = services.filter( selectedService => selectedService.id !== service.id && 
                                                                    !selectedService.is_Paused && 
                                                                    !selectedService.is_Draft );
           this.otherService = otherService.length > 0 && otherService[0];         
           this.service = service;
           this.office = office;           
           this.review = review;
           this.activeProfileType = services.companyID ? `company` : `user`;
           this.activeProfileId = services.companyID ? services.companyID: services.userID; 
           // Order Now Modal
           this.orderService = {
              owner_id: this.activeProfileId,
              service_id: this.service.id,
              office_id: this.officeId,
              is_owner_company: this.activeProfileType === 'user' ? false : true 
          }
          this.loading = false;

    } )
  }

  getServices() : Observable<any> {
       return   this.officeService
                    .getVOfficeServiceById( this.officeId, this.serviceId );
  }

  getVoffice() : Observable<any> {
    return   this.officeService
                 .getVOfficeById( this.officeId );
  };

  openOrderModal() {
        this.modalType = 'Order Now';
        this._modal.title = this.modalType;
        this._modal.open();
  }

  likeOrUnlikeService( hasLiked: boolean , serviceId: string, isOther: boolean = false ) {
          const mutation = hasLiked ? 
                           this.officeService.unlikeService( serviceId ) :
                           this.officeService.likeService( serviceId );

          mutation.subscribe( () => {
              if( !isOther ) {
                   this.service.has_liked = !this.service.has_liked;
              } else {
                   this.otherService.has_liked = !this.otherService.has_liked; 
              }
          } );
  }
  
}

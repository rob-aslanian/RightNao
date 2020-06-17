import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

 
import { deliveryTime, price } from 'src/app/v-office/_shared/services.utils';
 
import { OfficeService } from 'src/app/_shared/services/v-office/office.service';
 
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { Subject, Observable, forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap, takeUntil } from 'rxjs/operators';
 

@Component({
  selector: 'app-service-detailed',
  templateUrl: './service-detailed.component.html',
  styleUrls: ['./service-detailed.component.scss', '../../../_shared/style.scss']
})
export class ServiceDetailedComponent implements OnInit, OnDestroy {

  service: any = {};
  deliveryTime = deliveryTime;
  price = price;
  $destroy: Subject<any> = new Subject<any>();
  officeId: string = '';
  serviceId: string = '';
  servicesIds: any[] = [];
  selectedIndex: number = 0;
  $naviageToService: Subject<any> = new Subject<any>();
  isMe: boolean = false;
  modalType: string = '';
  orderService: any = {
      company_id: "",
      owner_id: "",
      service_id: "",
      office_id: ""
  };

  @ViewChild( AppModalComponent, { static: true } ) _modal: AppModalComponent

  constructor(
          private activatedRoute: ActivatedRoute,
          private officeService: OfficeService
  ) { }

  ngOnInit() {
 
       const { type, id } = this.activatedRoute.parent.parent.snapshot.params;
       this.officeId =  this.activatedRoute.parent.parent.snapshot.params['officeId'];
       this.serviceId = this.activatedRoute.snapshot.params['id'];

       this.getServices( type, id ).subscribe( service => this.parseServices( service ) );
       
       this.officeService
       .isMe(   type !== 'user' ? id : undefined, this.officeId )
         .subscribe( (data) =>  this.isMe =  this.officeService.checkIsMe(data)   );


       this.$naviageToService.pipe( 
           switchMap( () => this.getServices( type , id ) )
        ).subscribe( ( data: any ) => this.parseServices( data ) );
        
  };

  // Navigate Previus Service
  previusService() {
     this.selectedIndex--;  
      // Check if service on that index exits if not assign last item from services object
      if(!this.servicesIds[this.selectedIndex]) {
          this.selectedIndex = this.servicesIds.length -1 ;
      }
    this.serviceId  = this.servicesIds[this.selectedIndex]['id'];
    this.$naviageToService.next();
          
  }

  // Navigate Next Service
  nextService() {
    
    this.selectedIndex++;
      // Check if service on that index exits if not assign first item from services object
    if(!this.servicesIds[this.selectedIndex]) {
         this.selectedIndex = 0;
    }

    this.serviceId  = this.servicesIds[this.selectedIndex]['id'];
    this.$naviageToService.next();
  
  }

  getServices( type: string, id: string ): Observable<any> {
    
  return  forkJoin(
                  this.officeService
                  .getVOfficeServiceById(  this.officeId, this.serviceId ).pipe(
                    takeUntil( this.$destroy )
                  ),
                  this.officeService
                  .getVOfficeServiceIds( type != 'user' ? id : undefined, this.officeId ).pipe(
                    takeUntil( this.$destroy )
         ))

  }

  parseServices( [service, serviceIds] ) {
    this.service = service;
    this.orderService = {
        owner_id: service.companyID ? service.companyID : service.userID,
        is_owner_company: service.companyID ? true : false,
        service_id: service.id,
        office_id: service.officeID
    };
    

    this.servicesIds = serviceIds;
    serviceIds.map( ({ id }, i) => {
          if( service['id'] === id ) {
               this.selectedIndex = i;
          }
    } )
  }

  likeOrUnlike( hasLiked: boolean ) {
        const mutation = !hasLiked ? 
                          this.officeService.likeService( this.serviceId ) :
                          this.officeService.unlikeService( this.serviceId );

        mutation.subscribe( () => this.service.has_liked =  !this.service.has_liked );
  }

  openModal() {
      this.modalType = 'order';
      this._modal.title = 'Order Now';
      this._modal.open();
  }
  closeModal(){
      this.modalType = '';
      this._modal.close();
  }

  // Unsubscribe subscriptions
  ngOnDestroy() {
     this.$destroy.next();
     this.$destroy.complete();
  }
}

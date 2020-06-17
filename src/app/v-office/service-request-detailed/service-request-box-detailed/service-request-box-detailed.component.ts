import { Component, OnInit, Input } from '@angular/core';
import { deliveryTime } from '../../_shared/services.utils';
import { OfficeService } from 'src/app/_shared/services/v-office/office.service';

@Component({
  selector: 'app-service-request-box-detailed',
  templateUrl: './service-request-box-detailed.component.html',
  styleUrls: ['./service-request-box-detailed.component.scss']
})
export class ServiceRequestBoxDetailedComponent implements OnInit {
  
  @Input() 
  service: any ;
  deliveryTime = deliveryTime;

  constructor(
          private officeService: OfficeService
  ) { }

  ngOnInit() {  };


  likeOrUnlikeService( hasLiked: boolean, serviceId: string ) {

    const mutation = hasLiked ? 
                     this.officeService.UnSaveServiceRequest( serviceId ) :
                     this.officeService.SaveServiceRequest( serviceId );
    
    mutation.subscribe( () => this.service.has_liked = !this.service.has_liked );

  }
}

import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';

@Component({
  selector: 'app-service-request-card',
  templateUrl: './service-request-card.component.html',
  styleUrls: ['./service-request-card.component.scss','../../services.component.scss']
})
export class ServiceRequestCardComponent implements OnInit {

  serviceRequestsList: any[] = []; 

  constructor(
    private servicesServ: ServicesService, 
    private globalUserPro: GlobalUserProService
  ) { }

  ngOnInit() {
    this.getServiceRequests(); 
    
  }

  getServiceRequests() {
    this.servicesServ
        .getServicesRequest()
        .subscribe(data => {
          this.serviceRequestsList = data.data['GetServicesRequest']; 
        }, err => {
          console.log(err);
          
        })
  }

  convertDeliveryTime(delivery: string) {
    switch (delivery) {
      case 'Up_To_24_Hours':
        return  'Up to 24 hours'
     
      case 'Up_To_3_Days' :
        return  'Up to 3 days'
       
      case 'Up_To_7_Days' :
        return  'Up to 7 day'
       
      case 'Weeks_1_2' :
        return  '1 - 2 week'
      
      case 'Weeks_2_4' :
        return  '2 - 4 weeks'
      
      case 'Month_And_More' :
        return  'Month and more'
    
      default: ''
        break
    }
  }

  convertLocationType(location: string) {
    switch (location) {
      case 'Remote_only':
        return  'Remote'
     
      case 'On_Site_Work' :
        return  'On Site'
    
      case 'Price_Fixed' : 
        return 'Price_Fixed'
      
    }
  }



}

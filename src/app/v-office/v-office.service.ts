import { Injectable } from '@angular/core';
import { graphqlServices } from '../_shared/graphql/services/services';
import { Apollo } from 'apollo-angular';
import { GlobalUserProService } from '../_shared/services/global-user-pro.service';



@Injectable({
  providedIn: 'root'
})
export class VOfficeService {

  constructor(
    private apollo: Apollo,
    private globalService: GlobalUserProService
  ) { 

  }

  get companyId() {
    return this.globalService.isCompanyActive() ? this.globalService.getComapnyId() : undefined; 
  }

  get userID() {
    return this.globalService.isCompanyActive() ? this.globalService.getComapnyId() : this.globalService.getUserProfile().id; 
  }



  getServicesRequest(service_id: string) {
    return this.apollo.query({
      fetchPolicy: "network-only",
      query: graphqlServices.getServiceRequest,
      variables: {
        company_id: this.companyId,
        service_id
      }
    })
  }

}

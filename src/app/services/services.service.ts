import { Injectable } from '@angular/core';
import { graphqlServices } from '../_shared/graphql/services/services';
import { Apollo } from 'apollo-angular';
import { GlobalUserProService } from '../_shared/services/global-user-pro.service';
import { graphqlOffice } from '../_shared/graphql/v-office/v-office'
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ServicesService {


constructor(
  private apollo: Apollo,
  private globalServ: GlobalUserProService
) { }


  get companyId() {
    return this.globalServ.isCompanyActive() ? this.globalServ.getComapnyId() : undefined;
  }

  get userID() {
    return this.globalServ.isCompanyActive() ? this.globalServ.getComapnyId() : this.globalServ.getUserProfile().id;
  }



  // ****** Queries ******
  getServicesRequest( owner_id: string = undefined ) {
    return this.apollo.query({
      fetchPolicy:"network-only",
      query: graphqlServices.GetServicesRequest,
      variables: {
        owner_id,
        company_id: this.companyId
      }
    })
  };

  getAllServiceReuests() {
    return this.apollo.query({
      fetchPolicy:"network-only",
      query: graphqlServices.GetAllServiceRequests,
      variables: {
           company_id: this.companyId
      }
    }).pipe(
       map( ({ data }) => data['GetServicesRequest'])
    )
  };

  getReceivedProposals( request_id ? ) {
    return this.apollo.query({
      query: graphqlServices.GetReceivedProposals,
      variables:{
        company_id: this.companyId,
        request_id,
        pagination: {
          "first": 10, 
          "after": "0"
        },
        fetchPolicy: 'network-only',

      }
    })
  };

  getSendedProposals() {
    return this.apollo.query({
      query: graphqlServices.GetSendedProposals,
      fetchPolicy: 'network-only',
    })
  };



  getServiceRequest( service_id: string ): Observable<any> {
    return this.apollo.query({
      fetchPolicy: 'network-only',
      query: graphqlServices.getServiceRequest,
      variables: {
        company_id: this.companyId,
        service_id
      }
    }).pipe(
       map(
          ({ data }) => data['GetServiceRequest']
       )
    )
  };

  getServicesRequestReview( after: number, first: number = 10, owner_id = undefined ) {
    return this.apollo.query({
      fetchPolicy: 'network-only',
      query: graphqlServices.GetServicesRequestReview,
      variables: {
        company_id: this.companyId,
        owner_id,
        pagination: {
          first,
          after: after.toString()
        }
      }
    }).pipe(
         map( ({data}) =>  data['GetServicesRequestReview'] )
     )
  };

  getSavedVOfficeServices() {
    return this.apollo.query({
      query: graphqlServices.GetSavedVOfficeServices,
      variables: {
        company_id: this.companyId,
        pagination: {
          "first": 10,
          "after": "0"
        }
      }
    })
  };

  getSerivceOrders(office_id?: string, pagination?: any) {
    return this.apollo.query({
      query: graphqlServices.GetServiceOrders,
      variables:{
        owner_id: this.userID,
        office_id,
        order_type: 'buyer',
        order_status: 'any',
        pagination: {
          first: 10,
          after: '0'
        }
      }
    })
  };

  getServicesReview(office_id: string) {
    return this.apollo.query({
      query: graphqlOffice.GetServicesReview,
      variables: {
        company_id: this.companyId,
        office_id,
        pagination: {
            "first": 10,
            "after": "0"
          }
        }
    })
  };



  //  ****** Mutations ******
  addServicesRequest(formData: any) {
    return this.apollo.mutate({
      mutation: graphqlServices.addServicesRequest,
      variables:{
        company_id: this.companyId,
        request: formData
      }

    }).pipe(
      map(
        ({ data }) => data['AddServicesRequest']['id']
      )
    )
  };


  removeServicesRequest(request_id: string) {
    return this.apollo.mutate({
      mutation: graphqlServices.RemoveServicesRequest,
      variables: {
        request_id
      }
    })
  };

  ChangeServicesRequestStatus(service_id: string, status: string ) {

    return this.apollo.mutate({
      mutation: graphqlServices.ChangeServicesRequestStatus,
      variables: {
        company_id: this.companyId,
        service_id,
        status
      }
    });
  };


  changeServiceRequest( service_id: string, request: any ): Observable<any> {
      return this.apollo.mutate({
          mutation: graphqlServices.changeServiceRequest,
          variables: {
            company_id: this.companyId,
            service_id,
            request
          }
      })
  };

  removeFilesInServiceRequest( service_id: string, files_ids: string[] ): Observable<any> {
        return this.apollo.mutate({
          mutation: graphqlServices.removeFilesInServiceRequest,
          variables: {
            company_id: this.companyId,
            service_id,
            files_ids
          }
      })
  };

  ignoreProposalForServiceRequest(proposal_id: string) {
    return this.apollo.mutate({
      mutation: graphqlServices.IgnoreProposalForServiceRequest,
      variables: {
        company_id: this.companyId,
        proposal_id
      }
    })
  };

  orderProposalForServiceRequest(proposal_id: string) {
    return this.apollo.mutate({
      mutation: graphqlServices.OrderProposalForServiceRequest,
      variables: {
        company_id: this.companyId,
        proposal_id
      }
    })
  };

}

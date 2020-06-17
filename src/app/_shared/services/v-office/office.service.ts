import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { graphqlOffice } from '../../graphql/v-office/v-office';
import { Observable } from 'rxjs';
import { GlobalUserProService } from '../global-user-pro.service';
import { ICreateOffice, QualificationsInput, status, isMe, order_type, order_status } from '../../models/service/v-office/v-office-model';  
import {  map } from 'rxjs/operators';
 


const API = '/api/v1/uploading/';

@Injectable({
  providedIn: 'root'
})

export class OfficeService {
  
  user_id: string;
 
 

  constructor(
     private apollo: Apollo,
     private userProService: GlobalUserProService,
  ) { 
 
     this.user_id = this.userProService.getUserProfile().id;
  }

  get companyId() : string  {
   return this.userProService.isCompanyActive() ?  
                              this.userProService.getComapnyId() :  
                              undefined;
  }
  /**
   * 
   * @param input 
   */
    openOffice( input: ICreateOffice ): Observable<any> {

         return this.apollo.mutate({
           mutation: graphqlOffice.createVOffice,
           variables:{
             company_id: this.companyId,
             input
           }
         })
    }
    /**
     * 
     * @param user_id 
     */
    importSkillsFromProfile(user_id: string ): Observable<any> {
         
        return this.apollo.query({
          query: graphqlOffice.getSkills,
          variables: {
              user_id
           }
        })
    }
      /**
       * 
       * @param user_id 
       */
    importTools( user_id: string ): Observable<any> {

       return this.apollo.query({
         query: graphqlOffice.getTools,
         variables: {
            user_id
         }
       })
    }
   /**
    * 
    * @param user_id 
    */
    importLanguages( user_id: string ): Observable<any> {

       return this.apollo.query({
          fetchPolicy: 'network-only',
          query: graphqlOffice.getLanguages,
          variables: {
            user_id
          }
       })
    }
  /**
   * 
   * @param office_id 
   */
    getVOffice(office_id: (string | undefined) , company_id: ( string | undefined) ): Observable<any> {

       return this.apollo.query({
           fetchPolicy:'network-only',
           query: graphqlOffice.getVOfficeById,
           variables:{
            office_id,
            company_id
           }
       })
       
    } 
    
 

    /**
     * 
     * @param company_id 
     * @param description 
     * @param office_id 
     */


   addDescription( company_id: string, description: string , office_id: string ): Observable<any> {

        return this.apollo.mutate({
            mutation: graphqlOffice.addChangeDescription,
            variables: {
                  company_id,
                  office_id,
                  description
            }
        })
   }    
 
 
  addVofficeService( office_id: string, service: any ): Observable<any> {

     return this.apollo.mutate({
          mutation: graphqlOffice.addVofficeService,
          variables: {
            company_id: this.companyId,
            office_id,
            service
          }
     })
  }

  getVofficeServices( office_id: string, activeProfile: string ): Observable<any> {
      return this.apollo.query({
           fetchPolicy: 'network-only',
           query: graphqlOffice.getVofficeService,
            variables: {
                 company_id: activeProfile  === 'user' ? undefined : activeProfile,
                 office_id
            }
      }).pipe(
          map( ({ data }) => data['GetVOfficeServices']['services'] )
       )
  }
  
  isOutOffice(
        office_id: string,
        is_Out: boolean,
        return_Date: string
  ): Observable<any> {

      return this.apollo.mutate({
           mutation: graphqlOffice.isOutOffice,
            variables: {
                 company_id: this.companyId,
                 office_id,
                 is_Out,
                 return_Date
            }
      });
  }
  getUserInfo( user_id: string ): Observable<any> {

      return this.apollo.watchQuery({
           fetchPolicy:'network-only',
           query: graphqlOffice.getUserInfo,
           variables: {
              user_id
           }
      }).valueChanges.pipe(
           map( ({ data }) => data['getProfileByID'] )
      )
  }

  changeVofficeService( service_id: string, office_id:  string, service: any ): Observable<any> {
     return this.apollo.mutate({
         mutation: graphqlOffice.changeVofficeService,
         variables:{
            company_id: this.companyId,
            service_id,
            office_id,
            service
         }
     }).pipe(
         map( ( { data } ) => data['ChangeVOfficeService']['id'])
     )

  };
  
  getCompanyInfo(company_id: string): Observable<any> {
      
      return this.apollo.watchQuery({
           fetchPolicy: 'network-only',
           query:graphqlOffice.getCompanyProfile,
            variables:{
               company_id
            }
      }).valueChanges.pipe(
          map( ({ data }) => data['GetCompanyProfileByID'] )
      )
  }

   
  removeFilesInService( service_id: string, files_ids: string[] ): Observable<any> {
      
     return this.apollo.mutate({
          mutation: graphqlOffice.removeFilesInVSerice,
          variables: {
             company_id: this.companyId,
             service_id,
             files_ids
          }
     })
 }
 

 removeVofficeService( service_id: string ): Observable<any> {
      return this.apollo.mutate({
         mutation: graphqlOffice.removeVofficeService,
         variables: {
               company_id: this.companyId,
               service_id
         }
      })
 };

  changeVOfficeServiceStatus( office_id: string, service_id: string, status: status ): Observable<any> {
       return this.apollo.mutate({
           mutation: graphqlOffice.changeVOfficeStatus,
           variables: { 
               company_id: this.companyId,
               office_id,
               service_id,
               status
           }
       })
  }
 
  getVoffices( company_id: ( string | undefined ), user_id: ( string | undefined ), policy: any = 'network-only' ): Observable<any> {
      return this.apollo.query({
         fetchPolicy: policy,
          query: graphqlOffice.getVoffices,
          variables: {
            company_id,
            user_id
          }
      })
  }

  removeOffice( office_id: string ): Observable<any> {
        return this.apollo.mutate({
             mutation: graphqlOffice.removeVOffice,
             variables: {
               office_id,
               company_id: this.companyId
             }
        })
  }
  addVOfficeLanguages(   office_id: string, languages: any[]  ) {
       return this.apollo.mutate({
           mutation: graphqlOffice.addVOfficeLanguages,
           variables: {
               company_id: this.companyId,
               office_id,
               languages 
           }
       }).pipe(
          map( ({ data }) => data['AddVOfficeLanguages']['ids'] )
       )
  }

  removeVOfficeLanguages( office_id: string, language_ids: string[] ): Observable<any> {
        return this.apollo.mutate({
             mutation: graphqlOffice.removeVOfficeLanguages,
             variables: {
               company_id: this.companyId,
               office_id,
               language_ids 
             }
        })
  };

  changeVOffice( office_id: string, input: any ): Observable<any> {
       return this.apollo.mutate({
             mutation: graphqlOffice.changeVOffice,
             variables: {
                  company_id: this.companyId,
                  office_id,
                  input
             }
       }).pipe(
           map( ({ data }) => data['ChangeVOffice']['id'] )
       )
  }

  changeVOfficeLanguages( office_id: string, languages: any[] ) :Observable<any> {
       return this.apollo.mutate({
            mutation: graphqlOffice.changeVOfficeLanguages,
            variables: {
               company_id: this.companyId,
               office_id,
               languages 
            }
       })
  }
  removeVOfficePhoto( office_id: string ):Observable<any> {
       return this.apollo.mutate({
             mutation: graphqlOffice.removeVOfficeCover,
             variables: {
               office_id,
               company_id: this.companyId    
             }
       })
  };

  getMainCategory( office_id: string ): Observable<any> {
       return this.apollo.query({
            fetchPolicy:'network-only',
            query: graphqlOffice.getVOfficeCategory,
            variables: {
               company_id: this.companyId,
               office_id
            }
       }).pipe(
           map( ({ data })  => data['GetVOfficeByID']['category'])
       )
  };

  getVOfficeServiceById( office_id: string , service_id: string ): Observable<any> {
        return this.apollo.query({
           fetchPolicy: 'network-only',
           query: graphqlOffice.getVOfficeServiceById,
           variables: {
               company_id: this.companyId,
               office_id,
               service_id
           }
        }).pipe( 
             map( ( { data } ) => data['GetVOfficeService'] )
         )
  };

  getVOfficeServiceIds( company_id: ( string | undefined ), office_id: string  ): Observable<any> {  
      return this.apollo.query({
          fetchPolicy: 'network-only',
          query: graphqlOffice.getVOfficeIds,
          variables: {
               company_id,
               office_id
          }
      }).pipe(
         map( ({data}) => data['GetVOfficeServices']['services'])
      )
  };

  isMe(  company_id: string, office_id: string ): Observable<isMe> {
       return this.apollo.query({
            fetchPolicy: 'network-only',
            query: graphqlOffice.isMe,
            variables: {
               company_id,
               office_id
            }
       }).pipe(
           map(({ data }) => data['GetVOfficeByID'])
       )
  };
  
  likeService( service_id: string ): Observable<any> {
      return this.apollo.mutate({
           mutation: graphqlOffice.likeVOfficeService,
           variables:{
               service_id ,
               company_id: this.companyId
           }
      })   
  }

  unlikeService( service_id: string ): Observable<any> {
      return this.apollo.mutate({
         mutation: graphqlOffice.unlikeVOfficeService,
         variables:{
            service_id ,
            company_id: this.companyId
         }
  })   
      
  }

  checkIsMe( isMe: isMe  ) {
    return this.userProService.isCompanyActive() ?
                isMe['isMe'] && this.userProService.getComapnyId() === isMe['companyID'] :
                isMe['isMe'] && this.userProService.getUserProfile()['id'] === isMe['userID'];
       
  }

  orderVOffficeService( input: any ): Observable<any> {
       return this.apollo.mutate({
            mutation: graphqlOffice.orderVOfficeService,
            variables: {
                input
            }
       }).pipe( map( 
              ({ data }) => data['OrderService']['id']
        ) )
  };
   
  getServiceOrders( owner_id: string,  order_type: order_type, order_status: order_status, after: number, office_id: string = undefined, ): Observable<any> {
       return this.apollo.query({
           fetchPolicy: 'network-only',
           query: graphqlOffice.getServiceOrders,
           variables: {
               owner_id,
               office_id,
               order_type,
               order_status,
               pagination: {
                  first: 10,
                  after: after.toString()
               }
           }
       }).pipe(
          map( ({ data })  => data['GetServiceOrders'])
       )
  }

  AcceptOrderService( service_id: string, order_id: string  ): Observable<any> {
   return this.apollo.mutate({
        mutation: graphqlOffice.AcceptOrderService,
        variables: {
            company_id: this.companyId,
            service_id,
            order_id,
        }
   })
};

CancelServiceOrder( order_id: string ): Observable<any> {
   return this.apollo.mutate({
        mutation: graphqlOffice.CancelServiceOrder,
        variables: {
            company_id: this.companyId,
            order_id
        }
   })
};

DeclineServiceOrder( order_id: string ): Observable<any> {
   return this.apollo.mutate({
        mutation: graphqlOffice.DeclineServiceOrder,
        variables: {
            company_id: this.companyId,
            order_id
        }
   })
};

deliverServiceOrder( order_id: string ): Observable<any> {
   return this.apollo.mutate({
        mutation: graphqlOffice.deliverServiceOrder,
        variables: {
            company_id: this.companyId,
            order_id
        }
   })
};

AddNoteForOrderService( order_id: string, text: string ): Observable<any> {
   return this.apollo.mutate({
        mutation: graphqlOffice.AddNoteForOrderService,
        variables: {
            company_id: this.companyId,
            order_id,
            text
        }
   })
};

CancelDeliverdServiceOrder( order_id: string ): Observable<any> {
   return this.apollo.mutate({
        mutation: graphqlOffice.CancelDeliverdServiceOrder,
        variables: {
            company_id: this.companyId,
            order_id
        }
   })
};

AcceptDeliverdServiceOrder( order_id: string ): Observable<any> {
   return this.apollo.mutate({
        mutation: graphqlOffice.AcceptDeliverdServiceOrder,
        variables: {
            company_id: this.companyId,
            order_id
        }
   })
};

WriteReviewForService( service_id: string, 
                       office_id: string, 
                       owner_id: string, 
                       review_detail: any
): Observable<any> {
   return this.apollo.mutate({
        mutation: graphqlOffice.WriteReviewForService,
        variables: {
            service_id,
            office_id,
            owner_id,
            review_detail
        }
   })
};

WriteReviewForServiceRequest( owner_id: string , is_owner_company: boolean , review_detail: any ): Observable<any> {
   return this.apollo.mutate({
        mutation: graphqlOffice.WriteReviewForServiceRequest,
        variables: {
            owner_id,
            is_owner_company,
            review_detail
        }
   })
};

getServicesReview( office_id: string, after: number = 0 ): Observable<any> {
   return this.apollo.query({
        fetchPolicy: 'network-only',
        query: graphqlOffice.GetServicesReview,
        variables: {
         company_id: this.companyId,
         office_id,
         pagination: {
            first: 6,
            after: after.toString()
         }
        }
   }).pipe( map( ({data }) => data['GetServicesReview'] ) )
  };

  GetSavedServicesRequest(  after: number = 0 ): Observable<any> {
   return this.apollo.query({
        fetchPolicy: 'network-only',
        query: graphqlOffice.GetSavedServicesRequest,
        variables: {
         company_id: this.companyId,
         pagination: {
            first: 6,
            after: after.toString()
         }
        }
   }).pipe( map(({ data }) => data['GetSavedServicesRequest'])  )
  };

  GetSendedProposals( after: number = 0 ): Observable<any> {
   return this.apollo.query({
        fetchPolicy: 'network-only',
        query: graphqlOffice.GetSendedProposals,
        variables: {
         pagination: {
            first: 5,
            after: after.toString()
         }
        }
   }).pipe( map( ({ data }) => data['GetSendedProposals'] ) )
  };

  SaveServiceRequest( service_id: string ): Observable<any> {
         return this.apollo.mutate({
            mutation: graphqlOffice.SaveServiceRequest,
            variables: {
               service_id,
               company_id: this.companyId,
            }
         })
   };

   UnSaveServiceRequest( service_id: string ): Observable<any> {
      return this.apollo.mutate({
           mutation: graphqlOffice.UnSaveServiceRequest,
           variables: {
                  service_id,
                  company_id: this.companyId,
           }
      })
   };

   SendProposalForServiceRequest( input: any ): Observable<any> {
      return this.apollo.mutate({
           mutation: graphqlOffice.SendProposalForServiceRequest,
           variables: {
               input
           }
      })
   };

   GetAllServices( ): Observable<any> {
      return this.apollo.query({
           query: graphqlOffice.GetAllServices,
           fetchPolicy: 'network-only',
           variables: {
               company_id: this.companyId
           }
      }).pipe(
          map( ({ data }) => data['GetAllServices']['services'] )
      )
   };

   getVOfficeById( office_id: (string | undefined) ): Observable<any> {
      return this.apollo.query({
          fetchPolicy:'network-only',
          query: graphqlOffice.getVOffice,
          variables:{
               office_id,
               company_id: this.companyId
          }
      }).pipe(
         map( ({ data }) => data['GetVOfficeByID'] )
      )
      
   } 

}

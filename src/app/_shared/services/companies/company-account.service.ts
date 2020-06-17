import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { graphqlCompanyAccount } from '../../graphql/company-account';
import { Observable } from 'rxjs';
import { IPhone } from '../../models/company/phone.interface';
import { graphqlCompanyProfile } from '../../graphql/company-profile';
import { IBuisnessHour } from '../../models/businessHours.interface';
import { IWebsite } from 'src/app/company/company-account/general/models/companyWebsite.interface';
import { ILocation } from '../../models/company/location.interface';
import { IComapnyRegister } from '../../models/company/companyRegister.interface';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyAccountService {

  constructor(
    private apollo:Apollo
   ) { }


  
   /**
    * Register Company 
    * 
    * @param input 
    */
   public registerCompany(input:IComapnyRegister) : Observable<any> {
     return this.apollo.mutate({
       mutation:graphqlCompanyAccount.registerComapny,
       variables:{ input }
     })
     .pipe(map(({ data }) => data['RegisterCompany'] ))
   }
   
   /**
    * Deactivate company 
    * 
    * @param input 
    */
   public deactivateCompany(input) : Observable<any>{ 
    if(input){

     return  this.apollo.mutate({
          mutation:graphqlCompanyAccount.deactivateAccount,
          variables:input
        })
      }
    }

    /**
     * Change name 
     * 
     * @param company_id 
     * @param name 
     */
    public changeName(company_id:string,name:string) : Observable<any>{
      return this.apollo
          .mutate({
              mutation: graphqlCompanyAccount.changeName,
              variables: { company_id, name }
          })
    }

    /**
     * Change Industry 
     * 
     * @param company_id 
     * @param input 
     */
    public changeIndustry(company_id:string, input) : Observable<any>{
      return this.apollo.mutate({
        mutation:graphqlCompanyAccount.changeIndustry,
        variables:{ company_id , input}
      })
    }

    /**
     * Change type
     * 
     * @param company_id 
     * @param type 
     */
    public changeType(company_id:string , type:string){
      return this.apollo.mutate({
        mutation:graphqlCompanyAccount.changeComapnyType,
        variables:{  company_id , type }
      });
      
    }

    /**
     * Change foundation date
     * 
     * @param company_id 
     * @param foundation_date 
     */
    public changeFoundationDate(company_id:string , foundation_date:string ) : Observable<any>{
       return this.apollo.mutate({
         mutation:graphqlCompanyAccount.changeDataFound,
         variables: {  company_id , foundation_date }
       });
    }

    /**
     * Change size 
     * 
     * @param company_id 
     * @param size 
     */
    public changeSize(company_id:string,size:string) : Observable<any>{
      return this.apollo.mutate({
        mutation:graphqlCompanyAccount.changeCompanySize,
        variables: {  company_id , size }
      });
    }


    /**
     * Change parking
     * 
     * @param company_id 
     * @param parking 
     */
    public changeParking(company_id:string, parking:string) : Observable<any>{
      return this.apollo.mutate({
        mutation:graphqlCompanyAccount.changeparking,
        variables: { company_id , parking }
      })
    }
    

    public changeBusinessHours(company_id:string , business_hours:IBuisnessHour[]) : Observable<any> {
      if(business_hours){
        return this.apollo.mutate({
           mutation:graphqlCompanyProfile.changeAbout,
           variables:{
              company_id,
              changes:{
                business_hours
              }
           }
         });
      }
   }

    /**
     * Add phone 
     * 
     * @param company_id 
     * @param input 
     */
    public addPhone(company_id:string , input:IPhone) : Observable<any>{
      return this.apollo.mutate({
        mutation:graphqlCompanyAccount.addPhone,
        variables: { company_id , input }
      })
    }

    /**
     * Delete phone
     * 
     * @param company_id 
     * @param id 
     */
    public deletePhone(company_id:string, id:string) : Observable<any>{
      return this.apollo.mutate({
        mutation:graphqlCompanyAccount.deletePhone,
        variables:{  company_id , id} 
      })
    }

    /**
     * Change phone 
     * 
     * @param company_id 
     * @param changes 
     */
    public changePhone(company_id:string , changes:any) : Observable<any>{
      return this.apollo.mutate({
        mutation:graphqlCompanyAccount.changePhone,
        variables:{ company_id , changes }
      })
    }

    /**
     * Add Email 
     * 
     * @param company_id 
     * @param email 
     */
    public addEmail(company_id:string , email:string) : Observable<any>{
        return this.apollo.mutate({
          mutation:graphqlCompanyAccount.addEmail,
          variables:{
            company_id,
            input:{
              email

            }
          }
        })
    }


    /**
     * Delete email 
     * 
     * @param company_id 
     * @param id 
     */
    public deleteEmail(company_id:string , id:string) : Observable<any> {
      return this.apollo.mutate({
        mutation:graphqlCompanyAccount.deleteEmail,
        variables: { company_id , id }
      })
    }

    /**
     * Add website
     * 
     * @param company_id 
     * @param website 
     */
    public addWebsite(company_id:string , website:string) : Observable<any> {
      return this.apollo.mutate({
        mutation:graphqlCompanyAccount.addWebsite,
        variables: { company_id,  website}
      })
    }

    /**
     * Change website 
     * 
     * @param company_id 
     * @param changes 
     */
    public changeWebsite(company_id:string , changes:IWebsite) : Observable<any> {
      return this.apollo.mutate({
        mutation:graphqlCompanyAccount.editWebsite,
        variables: { company_id , changes }
      })
    }

    /**
     * Delete website 
     * 
     * @param company_id 
     * @param id 
     */
    public deleteWebsite(company_id:string , id:string) : Observable<any> {
      return this.apollo.mutate({
        mutation:graphqlCompanyAccount.deleteWebsite,
        variables: {  company_id , id }
      });
    }

    /**
     * Add Address 
     * 
     * @param company_id 
     * @param input 
     */
    public addAddress(company_id:string , input:ILocation) : Observable<any> {
      return this.apollo.mutate({
        mutation:graphqlCompanyAccount.addAddress,
        variables:{ company_id , input }
      })
    }

    /**
     * Change Address 
     * 
     * @param company_id 
     * @param changes 
     */
    public changeAddress(company_id:string , changes:ILocation) : Observable<any> {
      return this.apollo.mutate({
        mutation:graphqlCompanyAccount.editAddress,
        variables:{ company_id , changes }
      })
    }


    /**
     * Delete Address 
     * 
     * @param company_id 
     * @param id 
     */
    public deleteAddress(company_id:string , id:string) : Observable<any> {
      return this.apollo.mutate({
        mutation:graphqlCompanyAccount.deleteAddress,
        variables:{ company_id , id }
      })
    }


    /**
     * Get Comapny Profile 
     * 
     * @param url 
     */
    public getCompanyForHeader(url:string) : Observable<any>{
        return this.apollo.watchQuery({
          query:graphqlCompanyProfile.getProfile,
          variables:{ url }
        }).valueChanges
    }

    /**
     * Change notification
     * 
     * @param company_id 
     * @param property 
     * @param value 
     */
    public changeNotification(company_id:string , property:string , value:boolean) : Observable<any> {
      return this.apollo.mutate({
        mutation:graphqlCompanyAccount.ChangeCompanyNotificationsSetting,
        variables: { company_id , property, value }
      })
    }

    /**
     * Get notification 
     * 
     * @param company_id 
     */
    public getNotification(company_id:string ) : Observable<any> {
      return this.apollo.watchQuery({
        query:graphqlCompanyAccount.getCompanyNotificationSetting,
        variables: { company_id }
      }).valueChanges
    }

    /**
     * Get manage admins 
     * 
     * @param companyId 
     */
    public  getManageAdmins(companyId:string) : Observable<any> {
      return this.apollo.watchQuery({
        query:graphqlCompanyAccount.getCompanyAdmins,
        variables:{ 
          company_id:companyId
         }
      }).valueChanges
    }
    public CheckUrlForCompany(CompanyUrl:string):Observable<any>{
        return this.apollo.watchQuery({
            fetchPolicy:'network-only',
             query:graphqlCompanyAccount.checkIfURLForCompanyIsTaken,
              variables:{
                  url:CompanyUrl
              }
        }).valueChanges
    }
}
   

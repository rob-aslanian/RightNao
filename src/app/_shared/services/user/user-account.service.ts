import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { graphqlUserAccount } from '../../graphql/user-account';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService {

  constructor(
    private apollo:Apollo
  ) { }


  /**
   * Change notification
   * 
   * @param property 
   * @param value 
   */
  public changeNotification(property:string , value:boolean) : Observable<any> {
    return this.apollo.mutate({
      mutation:graphqlUserAccount.ChangeNotificationsSetting,
      variables: { property , value}
    });
  }

  /**
   * Get notifications
   * 
   */
  public getNotification() : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlUserAccount.getNotificationSettings
    }).valueChanges
  }
  public changeFirstName(name:string):Observable<any> {
     return this.apollo.mutate({
        mutation:graphqlUserAccount.changeFirstName,
         variables:{
            name
         }
     })
  }
  public changeFatherName(patronymic:Object):Observable<any>{
     return this.apollo.mutate({
        mutation:graphqlUserAccount.changeFatherName,
         variables:{
          patronymic
         }
     })
  }
  public changeMiddleName(middlename:object):Observable<any>{
      return this.apollo.mutate({
          mutation:graphqlUserAccount.changeMiddleName,
           variables:{
            middlename
           }
      })
  }
  public changeLastName(lastname:string):Observable<any>{
      return this.apollo.mutate({
         mutation:graphqlUserAccount.changeLastName,
          variables:{
              lastname
          }
      })
  }
  public changeNickName(nickname:Object):Observable<any>{
    return this.apollo.mutate({
       mutation:graphqlUserAccount.changeNickName,
        variables:{
          nickname

        }
    });
  }
  public addEmail(email:Object):Observable<any>{
     return this.apollo.mutate({
        mutation:graphqlUserAccount.addEmail,
         variables:{
           email
         }
     });
  }
  public changeBirthday(birthday:object):Observable<any>{
      return this.apollo.mutate({
       mutation:graphqlUserAccount.changeBirthDate,
        variables:{
          birthday
        }
      })
  }
  public changeGender(gender:Object):Observable<any>{
      return this.apollo.mutate({
        mutation:graphqlUserAccount.changeGender,
         variables:{
             gender
         }
      })
  }
  public changeEmail(changes:Object):Observable<any>{
    return this.apollo.mutate({
       mutation:graphqlUserAccount.changeEmail,
        variables:{
          changes
        }
    })
  }
  public removeEmail(id:string):Observable<any>{
       return this.apollo.mutate({
          mutation:graphqlUserAccount.deleteEmail,
           variables:{
             id
           }
       })
  }
  public addPhone(phone:Object):Observable<any>{
      return this.apollo.mutate({
          mutation:graphqlUserAccount.addPhone, 
           variables:{
             phone
           }
      })
  }
  public editPhone(changes:Object):Observable<any>{
      return this.apollo.mutate({
        mutation:graphqlUserAccount.editPhone,
         variables:{
              changes
         }
      })
  }
  public deletePhone(id:string):Observable<any>{
     return this.apollo.mutate({
         mutation:graphqlUserAccount.deletePhone,
          variables:{
             id
          }
     })
  }
  public addAddress(address:object){
   return this.apollo.mutate({
       mutation:graphqlUserAccount.addMyAddress,
        variables:{
          address
        }
    })
  }
  public editAddress(id:string,address:Object):Observable<any>{
        return this.apollo.mutate({
              mutation:graphqlUserAccount.editMyAddress,
               variables:{
                   id,
                   address
               }
        })
  }
  public deleteAddress(id:string):Observable<any>{
        return this.apollo.mutate({
            mutation:graphqlUserAccount.deleteMyAddress,
             variables:{
                 id
             }
        })
  }
  public twoFARespone():Observable<any>{
   return   this.apollo.mutate({
           mutation:graphqlUserAccount.twoFARespone,
      })
  }
  public Enable2FA(code:string):Observable<any>{
     return this.apollo.mutate({
         mutation:graphqlUserAccount.Enable2FA,
          variables:{
             code
          }
     })
  }
  public Disable2FA(code:string):Observable<any>{
      return this.apollo.mutate({
         mutation:graphqlUserAccount.Disable2FA,
          variables:{
             code
          }
      })
   }
   /**
    * User Account Seessions
    * 
    */
  public getAccountSessions( after?:number ):Observable<any>{
      return this.apollo.watchQuery({
           fetchPolicy:'network-only',
           query:graphqlUserAccount.getAccountSessions,
           variables:{
              first:4,
              after: after | 0
           }
      }).valueChanges
  }
  public signOutFromSessions(sessionID:string):Observable<any>{
      return this.apollo.mutate({
            mutation:graphqlUserAccount.signOutFromSession,
             variables:{
                  sessionID
             }
      })

  }

  /**
   * 
   * @param changes 
   */
  public makePhonePrimary( changes:any ):Observable<any>{

        return this.apollo.mutate({
              mutation:graphqlUserAccount.editPhone,
               variables:{
                 changes
               }
           })   
        }


  /**
  * 
  * @param changes 
  */
 
   public makeEmailPrimary( changes:any ):Observable<any>{
          
         return this.apollo.mutate({
               mutation:graphqlUserAccount.makeEmailPrimary,
                 variables:{
                     changes  
              }
         })
   }

  public  signOutAllSessions():Observable<any>{
       return this.apollo.mutate({
             mutation:graphqlUserAccount.LogoutAll
       })
  }

}

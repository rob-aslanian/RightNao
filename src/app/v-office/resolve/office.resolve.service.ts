import { Resolve, RouterStateSnapshot} from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { OfficeService } from 'src/app/_shared/services/v-office/office.service';
import { Observable } from 'rxjs';
 
 


@Injectable()

export class officeResolver implements Resolve<Observable<any>> {

    constructor(
        private officeService: OfficeService,
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>{
        
        //Type could Be Company or User and parse by it    
        let officeId, type, companyId ;
 
 
        officeId   =  route.params['officeId'];
        type = route.params['type'];
        companyId = route.params['id'];           
    
     // Get v office for user
       if(type === 'user')  { 
            return  this.officeService
            .getVOffice( officeId, undefined );
        }  

    //For Company
      else if(type === 'company') {
          return  this.officeService
            .getVOffice(officeId,  companyId );
          }
     

    }
    
}
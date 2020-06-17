import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate, ActivatedRoute, CanActivateChild } from '@angular/router';
import { Observable, of } from 'rxjs';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { OfficeService } from 'src/app/_shared/services/v-office/office.service';
import { map, catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class OfficeGuard implements CanActivate {
  
  id: string ;
  companyId: ( string | undefined) = undefined;
  userId: ( string | undefined ) = undefined;
  isCompanyActive: boolean;
 
  constructor( 
     private globalUserProService: GlobalUserProService,
     private officeService: OfficeService,
     private router: Router,
     ) {
       
      this.isCompanyActive = this.globalUserProService.isCompanyActive();
      if( this.isCompanyActive  ) this.companyId = this.globalUserProService.getComapnyId();
      else if( !this.isCompanyActive ) this.userId = this.globalUserProService.getUserProfile().id;

     }
 
     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
       
         return   this.officeService
                  .getVoffices( this.companyId, this.userId ).pipe(
                    map( ({ data }) => data['GetVOffice']['v_offices'] ),
                    map( ( offices: any[] ) => {
                          if( offices.length < 3 ) {
                              return true;
                          } else {
                              this.router.navigate(['/']);
                              return false;
                          }
                    } )
                  )

              
  
     }
}

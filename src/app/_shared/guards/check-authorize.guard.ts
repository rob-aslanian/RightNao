import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalUserProService } from '../services/global-user-pro.service';
import { Apollo } from 'apollo-angular';
import { graphqlShared } from '../graphql/shared/base-data';


@Injectable({
  providedIn: 'root'
})
export class CheckAuthorizeGuard implements CanActivate , CanActivateChild {



  constructor(
    private globalUserService:GlobalUserProService,
    private apollo:Apollo
  ) {
    
  }

  checkToken() : Observable<any>{
    return this.apollo.watchQuery({
      query:graphqlShared.checkToken,
      fetchPolicy:'network-only'
    }).valueChanges

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      let userService = this.globalUserService;

      if(!userService.isAuthenticated()){
        userService.signOut();
        return true;
      }else{
        this.checkToken()
            .subscribe(
              ({data}) => {
              if(!data.checkToken){
                userService.signOut();
                return true;
              }
              
            });

    }
    return true;

  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    let userService = this.globalUserService;

    if(!userService.isAuthenticated()){
       userService.signOut();
       return false;
    }else{
      this.checkToken()
          .subscribe(
            ({data}) => {
              
            if(!data.checkToken){
              userService.signOut();
              return false;
            }

            return true;
            
        });
        
    }
      
    return true;
  }
}

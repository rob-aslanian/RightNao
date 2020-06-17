import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalUserProService } from '../services/global-user-pro.service';

@Injectable({
  providedIn: 'root'
})
export class JobsGuard implements CanActivate, CanActivateChild {
  /**
   *
   */
  constructor(
    private globalUserService:GlobalUserProService,
    private router: Router
  ) {

    
  }
  
  canActivateChild(
    childRoute: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
      
      let userService = this.globalUserService;

      if(!userService.isAuthenticated()){
         userService.signOut();
         return false;
      }

      if(!userService.isCompanyActive()){
        return false;
      }else{
        return true;
      }
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }
}

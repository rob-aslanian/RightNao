import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalUserProService } from '../services/global-user-pro.service';

@Injectable({
  providedIn: 'root'
})
export class SignedGuard implements CanActivate {
  
  constructor( 
    private globalService:GlobalUserProService,
    private router:Router
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if(this.globalService.isAuthenticated()){
      this.router.navigate(['/landing']);
      return false;
    } else { return true; }

  }
  
}

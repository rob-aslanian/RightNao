
import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route} from '@angular/router'
import { Observable } from 'rxjs'
import { GlobalUserProService } from './global-user-pro.service';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationGuardService implements CanActivate {
    constructor(private router: Router, private globalUserProService: GlobalUserProService) {
    }

    canActivate(routeRequest: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean
    {
        if(this.globalUserProService.isCompanyActive()) {
            this.router.navigate(['/jobs/company']);
            return true;
        };

        this.router.navigate(['/jobs/user']);
        return true;
    }
}

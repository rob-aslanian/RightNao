import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, throwError, EMPTY } from 'rxjs';
import { UserJobsService } from 'src/app/_shared/services/jobs/user-jobs.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class CareerService implements Resolve<any> {

  constructor(
    private jobsService: UserJobsService,
    private router:Router
  ) { }

  resolve(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot) : Observable<any> {

     if (state.url !== '/jobs/user/carrer-interest/new'){
        return  this.jobsService 
          .getJobProfile()
          .pipe(
            catchError((err) => {    
              this.router.navigate(['/jobs/user/carrer-interest/new']);
              return throwError(err);
            })
          )

     }
      
    return EMPTY;
  }

}

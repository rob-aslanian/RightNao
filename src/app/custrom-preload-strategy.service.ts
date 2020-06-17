import { Injectable } from '@angular/core';
import { PreloadingStrategy, Route } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustromPreloadStrategyService implements PreloadingStrategy {


  constructor(
  ) { }

  preload(route: Route, fn: Function): Observable<any> {

    const loadRoute = (delay) => {
     return delay > 0 ? timer(delay).pipe(flatMap(_ => fn())) : fn();
    }

    return route.data && (route.data.preload || route.data.delay) ? 
           loadRoute(route.data.delay) : of(null)  
  }

  
}

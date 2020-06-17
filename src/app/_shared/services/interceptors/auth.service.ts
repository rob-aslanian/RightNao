import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent,  } from "@angular/common/http";
import { Observable } from "rxjs";
import { CookieService } from 'ngx-cookie-service';
import { tap, catchError } from 'rxjs/operators';
import { of } from 'zen-observable';
import { GlobalUserProService } from '../global-user-pro.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private globalService: GlobalUserProService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
      
      return next.handle(req).pipe(
        tap((e:any) => {
          console.log(e);
          
         

          if(e['body']){
            let errors:Array<any> = e['body']['errors'];
            if(errors){
              errors.map(error => {
                if(error.message === "rpc error: code = Unknown desc = Not Authenticated") this.globalService.signOut();
              })
            }
          }
  
        }),

    )
    }
}
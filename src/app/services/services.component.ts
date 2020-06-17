import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit , OnDestroy {

  destroy$:Subject<any> = new Subject<any>();

  isRequestsPage: boolean; 


  // * * Services service requests * * 
  isPostServiceReq :boolean; 
  isServiceRequest: boolean; 

  // * * Manage Services * * 
  isManageServPage: boolean;  

  
  

  constructor(
    public router:Router
  ) {
    
    this.isPostServiceReq = router.url.includes('post-service-request'); 
    this.isServiceRequest = router.url.includes('service-requests'); 

    this.router.url.split('/')[2] === 'manage' ? this.isManageServPage = true : this.isManageServPage = false; 
    
    
   }

  ngOnInit() {
    
    this.router
        .events
        .pipe(
          filter(e => e instanceof NavigationEnd),
          takeUntil(this.destroy$)
        )
        .subscribe(
          (route) => {
  
            
            let urlPath = route['url'].split('/') 
            route['url'] === '/services/requests/post-service-request' ? this.isPostServiceReq = true : this.isPostServiceReq = false; 
            
            this.router.url.split('/')[2] === 'manage' ? this.isManageServPage = true : this.isManageServPage = false; 

            
          }
        )
    
  }
  

  ngOnDestroy() {
   this.destroy$.next();
   this.destroy$.complete();

  }
  

}

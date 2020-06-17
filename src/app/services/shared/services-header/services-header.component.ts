import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services-header',
  templateUrl: './services-header.component.html',
  styleUrls: ['./services-header.component.scss']
})
export class ServicesHeaderComponent implements OnInit  {

  isServiceReqs: boolean = true; 
  isCategories: boolean; 
  isPostService: boolean;

  isManagePage: boolean; 

  constructor(
    private router: Router
  ){

    this.toggleHeaderContent(); 
   }

  ngOnInit() {

    // this.toggleHeaderContent();     

    
  }; 

  toggleHeaderContent() {

    this.router.events.subscribe( route => {
      
      // if (route) {
        route['url'] === '/services/requests' ? this.isServiceReqs = true : this.isServiceReqs = false; 
        route['url'] === '/services/requests/post-service-request' ? this.isPostService = true : this.isPostService = false; 
        route['url'] === '/services/requests/categories' ? this.isCategories = true : this.isCategories = false; 

      // }

        this.router.url === '/services/requests' ? this.isServiceReqs = true : this.isServiceReqs = false;
        this.router.url === '/services/requests/post-service-request' ? this.isPostService = true : this.isPostService = false;
        this.router.url === '/services/requests/categories' ? this.isCategories = true : this.isCategories = false;     

    }); 

    
  }

}

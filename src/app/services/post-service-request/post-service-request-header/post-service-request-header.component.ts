import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-service-request-header',
  templateUrl: './post-service-request-header.component.html',
  styleUrls: ['./post-service-request-header.component.scss']
})
export class PostServiceRequestHeaderComponent implements OnInit, DoCheck {

  isAddService: boolean = false; 
  isServiceLanding: boolean = false; 
  isServiceCategories: boolean = false; 

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

    this.router.url === '/services/main' ? this.isServiceLanding = true : false;
    this.router.url === '/services/main/post-request' ? this.isAddService = true : false;
    this.router.url === '/services/main/categories' ? this.isServiceCategories = true : false;

    console.log(this.isAddService, this.isServiceCategories, this.isServiceLanding);
    

  };

  ngDoCheck(): void {

    this.router.url === '/services/main' ? this.isServiceLanding = true : false;
    this.router.url === '/services/main/post-request' ? this.isAddService = true : false;
    this.router.url === '/services/main/categories' ? this.isServiceCategories = true : false;
    
    console.log(this.isAddService, this.isServiceCategories, this.isServiceLanding);


  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-service-request-all-categories',
  templateUrl: './service-request-all-categories.component.html',
  styleUrls: ['./service-request-all-categories.component.scss']
})
export class ServiceRequestAllCategoriesComponent implements OnInit {

  categories: string[] = []; 
  startPage: Number; 
  paginationLimit: Number; 
  showMoreIsActive: boolean = true; 

  constructor() { }

  ngOnInit() {
    this.categories = [    
    'Programming & Tech',  
    'Graphics & Design',  
    'Writing & Translation', 
    'Sales & Marketing', 
    'Admin & Data Support', 
    'Engineering & Architecture',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    'badboy $$',
    ]; 
    this.startPage = 0; 
    this.paginationLimit = 6;

  }

  showMore() {
    const length = this.categories.length - 6;
    this.paginationLimit = +this.paginationLimit + length; 
    this.showMoreIsActive = false;
  }

  showLess() {
    const length = this.categories.length - 6; 
    this.paginationLimit = +this.paginationLimit - length; 
    this.showMoreIsActive = true; 
  }

}

import { Component, OnInit,  HostListener } from '@angular/core';
import { Router } from '@angular/router'
import { utilities } from '../_shared/utilities/utilities';
import { list, classifiedAds, searchRoutes, classFields } from './landing.model';

 
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
}) 

export class LandingPageComponent implements OnInit {

  observer:IntersectionObserver;

  showUpButton:boolean = false;

  list = list;

  classifiedAds = classifiedAds;

  searchRoutes = searchRoutes;

  classFields = classFields;

  searchType: string = 'All';

  searchText: string = '';

  path: string = '/search/all';


  @HostListener('window:scroll' , ['$event']) function (e) {
    this.showUpButton =  window.scrollY >= 1000; 
  }

  constructor(
    private route:Router
  ) { 
  }

  ngOnInit() {
      
  }

  rederictTo(){
    this.route.navigate(['/registration/company_sign_in']);
  }

  scrollInto(elem:string){
    utilities.scrollIntoView(document.getElementById(elem));
  }

  scrollUp(){
     window.scrollTo({top:0 , behavior:'smooth'})
  }

  setSearch( item: any ) {
      this.searchType = item.name;
      this.path = item.route;
  };

  navigate() {
       this.route.navigate(this.path.split('/'), { queryParams: { keyword: this.searchText } })
  };


}



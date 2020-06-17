import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { propertyTypes } from '../../Shared/models/estate.interface';

@Component({
  selector: 'app-estate-landing-header',
  templateUrl: './estate-landing-header.component.html',
  styleUrls: ['./estate-landing-header.component.scss']
})
export class EstateLandingHeaderComponent implements OnInit {
 
  searchKeyword: string; 
  isMoreActive: boolean = false;

  propertyTypes = propertyTypes;
  selectedProperty: string = 'All types';


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {  };

 
  routeToAdvancedSearch() {
    this.router.navigate(['/real-estate/advanced-search']); 
  }; 

  searchBykeyWord(keyword: string) {
    this.router.navigate([`/real-estate/search/${keyword}`]); 
  };

  updateQueryParams( propertyId: string, key: string  ) {

        this.router.navigate(
          [],
          {
            relativeTo: this.activatedRoute,
            queryParams: { propertyId },
            queryParamsHandling: 'merge'
          }
        )
        this.selectedProperty = key;
  };
 

}

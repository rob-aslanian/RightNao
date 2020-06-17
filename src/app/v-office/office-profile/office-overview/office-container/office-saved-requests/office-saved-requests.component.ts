import { Component, OnInit } from '@angular/core';
import { OfficeService } from 'src/app/_shared/services/v-office/office.service';
import { Observable } from 'rxjs';
 
@Component({
  selector: 'app-office-saved-requests',
  templateUrl: './office-saved-requests.component.html',
  styleUrls: ['./office-saved-requests.component.scss']
})
export class OfficeSavedRequestsComponent implements OnInit {

  services: any = {};
  view: string = 'card';
  sortedBy: string = 'Most recent';
  page: number = 0;
  after: number = 1;
  loading: boolean = true;

  constructor(
    private officeService: OfficeService
  ) { }

  ngOnInit() { this.getSavedServiceRequests( this.after ) }

  getSavedServiceRequests( after ){
      return  this.officeService.GetSavedServicesRequest( after )
      .subscribe( data => {
            this.services = data;
            this.loading = false;
      } );
  }


  sort( sort: string ) {
    this.sortedBy = sort;
        switch (sort) {
          case 'Oldest first':
               const oldest = this.services.services.sort( ( a, b ) =>  new Date(a.review_at).getTime() - new Date(b.review_at).getTime() )                          
               return this.services.services = oldest;
          case 'Most recent':
              const recent = this.services.services.sort( ( a, b ) =>  new Date(b.review_at).getTime() - new Date(a.review_at).getTime() )                          
              return this.services.services = recent;
          case 'Price - Highest First': 
          const negative = this.services.services.sort( ( a, b ) =>  b.price === "Price_Negotiable" ? 
                                                                     b.min_price_amount - a.max_price_amount : 
                                                                     b.fixed_price_amount - a.fixed_price_amount  );                          
          return this.services.services = negative;
          case 'Price - Lowest First': 
          const positive = this.services.services.sort( ( a, b ) =>  a.price === "Price_Negotiable" ? 
                                                                     a.min_price_amount - b.max_price_amount : 
                                                                     a.fixed_price_amount - b.fixed_price_amount );                          
          return this.services.services = positive;
          
        }
  }

  
  onPageChange( page: number ) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.loading = true;
    this.after =  ( page * 6 ) - 6;
    this.getSavedServiceRequests( this.after )

}

}

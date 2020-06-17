import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-service-order-review-box',
  templateUrl: './service-order-review-box.component.html',
  styleUrls: ['./service-order-review-box.component.scss']
})
export class ServiceOrderReviewBoxComponent implements OnInit {


  @Input() review: any;
  @Output() pagination: EventEmitter<number> = new EventEmitter<any>();
  
  avgNumber: number = 0;

  profileInfo: any = {};
  page = 1;

  sortedBy: string = 'Most Recent';

  constructor() { }

  ngOnInit() {
     if( this.review ) {
          const avg = this.review.reviews_avg;
          this.avgNumber = +( ( avg.clarity_avg + avg.communication_avg + avg.payment_avg  ) / 3 ).toFixed( 1 );
     }
  }
 
  changePage( selectedPage: number ) {
       this.pagination.emit(selectedPage)
 
  }

  sort( sort: string ) {
    this.sortedBy = sort;
        switch (sort) {
          case 'Oldest first':
               const oldest = this.review.reviews.sort( ( a, b ) =>  new Date(a.review_at).getTime() - new Date(b.review_at).getTime() )                          
               return this.review.reviews = oldest;
          case 'Most recent':
              const recent = this.review.reviews.sort( ( a, b ) =>  new Date(b.review_at).getTime() - new Date(a.review_at).getTime() )                          
              return this.review.reviews = recent;
          case 'Reviews - Positive First': 
          const negative = this.review.reviews.sort( ( a, b ) =>  b.review_avg - a.review_avg );                          
          return this.review.reviews = negative;
          case 'Reviews - Negative First': 
          const positive = this.review.reviews.sort( ( a, b ) =>  a.review_avg - b.review_avg );                          
              return this.review.reviews = positive;
        }
  } 

}

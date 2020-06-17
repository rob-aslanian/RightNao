import { Component, OnInit, Input } from '@angular/core';
import { OfficeService } from 'src/app/_shared/services/v-office/office.service';

@Component({
  selector: 'app-office-review',
  templateUrl: './office-review.component.html',
  styleUrls: ['./office-review.component.scss']
})
export class OfficeReviewComponent implements OnInit {

  @Input() officeId: string;

  review: any = null;
  after: number = 1 ;


  constructor(
    private officeService: OfficeService
  ) { }

  ngOnInit() {
    this.getReviews( this.after )    
  }

  onPageChange( page: number ) {
      this.after =  ( page * 6 ) - 6;
      this.getReviews( this.after );
  }

  getReviews( after: number ) {
    this.officeService
    .getServicesReview( this.officeId, after )
    .subscribe( data => this.review = data );
  }

}

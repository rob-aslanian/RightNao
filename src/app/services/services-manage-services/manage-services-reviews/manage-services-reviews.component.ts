import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServicesService } from '../../services.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-manage-services-reviews',
  templateUrl: './manage-services-reviews.component.html',
  styleUrls: ['./manage-services-reviews.component.scss']
})
export class ManageServicesReviewsComponent implements OnInit {

  listOfReviews: any = {}; 
  review: any = null;
  after: number = 0 ;

  constructor(
    private servicesService: ServicesService
  ) { }

  ngOnInit() {
    this.getServicesRequestReview( this.after ); 
  }


  getServicesRequestReview( after: number ) {
    return this.servicesService
               .getServicesRequestReview( after )
               .subscribe( data =>  this.listOfReviews = data )                        
  };  

  onPageChange( page: number ) {
    this.after =  ( page * 6 ) - 6;
    this.getServicesRequestReview( this.after ); 
  }



 
}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stars-rating',
  templateUrl: './stars-rating.component.html',
  styleUrls: ['./stars-rating.component.scss']
})
export class StarsRatingComponent implements OnInit {

  @Input() avgNumber: number ; 
  rating: number = 0;
  
  constructor() { }

  ngOnInit() { 
      if( this.avgNumber ) {
          this.rating = +this.avgNumber.toFixed( 1 );
      }
  }

}

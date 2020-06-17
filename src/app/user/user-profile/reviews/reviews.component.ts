import { Component, OnInit, Input } from '@angular/core';
import { IReviews, IReviewsView } from 'src/app/_shared/models/user/reviews.interface';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent implements OnInit {
  @Input() reviews: IReviewsView[] = [];
  @Input() showMoreData: boolean = false;
  mappedReviews: any[] = [];

  startPage:number = 2;
  tabItemsCount:number = 0;

  showMoreText = {
    id: 0,
    showText: false
  };

  scores = [
    {score: 0, scoreName: 'score_unknown'},
    {score: 1, scoreName: 'score_poor'},
    {score: 2, scoreName: 'score_fair'},
    {score: 3, scoreName: 'score_good'},
    {score: 4, scoreName: 'score_very_good'},
    {score: 5, scoreName: 'score_excellent'},
  ]

  // constructor() { }

  get receivedReviews() {
    return this.reviews;
  }

  ngOnInit() {
    if(this.receivedReviews){
      this.mappedReviews = this.reviews.map( (item: IReviewsView) => {
        const x = this.scores.find(x => x.scoreName == item.score);
        return item.score_id = x.score
      })
      console.log(this.mappedReviews)
    }
  }

  showMore(){
    this.startPage = this.tabItemsCount;
      
  }    

  showLess(){
    this.startPage = 2;
  }

}

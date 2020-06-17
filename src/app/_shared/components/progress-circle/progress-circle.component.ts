import { Component, OnInit,  Input } from '@angular/core';
import { ratingModel } from '../company/write-review/Models/model';
import { utilities } from '../../utilities/utilities';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-progress-circle',
  templateUrl: './progress-circle.component.html',
  styleUrls: ['./progress-circle.component.scss']
})
export class ProgressCircleComponent implements OnInit {
  // Amount of each rate 
  @Input() rates;
  // Amount of  Reviews && Amount of  average rate 
  @Input() amountReviewsAverageRates; 
  

  radius = 30;  
  circumference = 2 * Math.PI * this.radius;
  dashoffset: number;  
  ratesKey: any;    
  
  rateModel = ratingModel;
  utils = utilities;

  constructor() {  }

  ngOnInit() {

    if(this.rates){
      this.ratesKey = Object.keys(this.rates);
      this.ratesKey.splice(this.ratesKey.length - 1, 1);    
    }
  }

  trackByFn =  (index) => index;

  // ** Cordinates for Circle **
  setCordinat(raiting:string){
    switch(raiting){
      case'score_excellent':{
          return 50;
      }
      case'score_very_good':{
        return 150;
      }
      case'score_good':{
        return 250;
      }
      case'score_fair':{
        return 350;
      }
      case'score_poor':{
        return 450;
      }
      case 'score_unknown' : {
        return 750;
      }
      default: return 0;
    }
  }

  // ** Cordinates for percentage ** 
  cordinateforValue(raiting: string, value: number) {
    switch(raiting){
      case'score_excellent':{
        if(value === 100) {
          return 35
        }else
          return 40;
      }
      case'score_very_good':{
        if(value === 100) {
          return 135
        }else
        return 140;
      }
      case'score_good':{
        if(value === 100) {
          return 235
        }else
        return 240;
      }
      case'score_fair':{
        if(value === 100) {
          return 335
        }else
        return 340;
      }
      case'score_poor':{
        if(value === 100) {
          return 435
        }else
        return 440;
      }
      case 'score_unknown' : {
        return 750;
      }
      default: return 0;
    }
  }

  cordinateForStars(raiting: string) {
    switch(raiting){
      case'score_excellent':{
          return 32;
      }
      case'score_very_good':{
        return 132;
      }
      case'score_good':{
        return 232;
      }
      case'score_fair':{
        return 332;
      }
      case'score_poor':{
        return 432;
      }
      case 'score_unknown' :{
        return 750;
      }
      default: return 0;
    }
    
  }


   calcPercentageForRating(value: number){
       if(isNaN(value) || value === 0 ){
         return 0;
       }else {
         return Math.round((value / this.amountReviewsAverageRates.amount_reviews) * 100);  
       }
    }
 

  //   private progress(value: number) {
  //   const progress = value / 100;
  //   this.dashoffset = this.circumference * (1 - progress); 
  // }

  
}


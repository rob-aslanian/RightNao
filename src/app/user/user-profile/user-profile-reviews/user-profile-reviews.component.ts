import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../../_shared/services/user/user-profile.service';
import {  Observable } from 'rxjs';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
 


@Component({
  selector: 'app-user-profile-reviews',
  templateUrl: './user-profile-reviews.component.html',
  styleUrls: ['./user-profile-reviews.component.scss']
})
export class UserProfileReviewsComponent implements OnInit {
 


  reviews$: Observable<any>
  userId: string ;
 

  constructor(

      private userProfileService:UserProfileService,
      private route:ActivatedRoute
      
  ) { }

  ngOnInit() {  
    


    this.userId = this.route.snapshot.params['id'];

      
    if( this.userId ){

      // parse data with id
      this.reviews$ =   this.userProfileService
      .getReviews( this.userId )
        .pipe(map( ({ data })   => {            
              return   data['GetCompanyReviewsOfUser']   

        }))
       
    } 



  }
 
 
  getScore(score: string){
    return utilities.getScore(score); 
  }
  spilitDate( date: string): string{
     return date.split('-').join('.');
  }
    
}   

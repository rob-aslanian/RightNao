import { Component, OnInit, Input } from '@angular/core';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { Observable } from 'rxjs';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-article-comments',
  templateUrl: './article-comments.component.html',
  styleUrls: ['./article-comments.component.scss']
})
export class ArticleCommentsComponent implements OnInit {

  isAddCommentOpen: boolean = false;
 
  @Input() portfolio: any;
  @Input() userId: string;

  companyId: ( string | undefined );

  amountComments: any = 0;
  
  constructor(
     private userProfileService: UserProfileService,
     private globalUserProService: GlobalUserProService
  ) { }

  ngOnInit() {
     
     this.companyId = this.globalUserProService.isCompanyActive() ? 
                      this.globalUserProService.getComapnyId() :
                      undefined;
     

     this.userProfileService
     .portfolioEventEmitter
     .subscribe( data => this.amountComments = data['amountComments'] );

     this.getAmountComments();


  }

  likeUnlikeUserPortfolio( hasLiked: boolean  ) {
 
       const mutation: Observable<any> = hasLiked ? 
                                         this.userProfileService
                                         .unlikeUserInPortfolio(  this.companyId, this.userId, this.portfolio.id ) : 

                                          this.userProfileService
                                          .addLikesInPortfolio( this.companyId, this.userId, this.portfolio.id )
                                          
      mutation.subscribe( () => {

        // toogle like
        this.portfolio['has_liked'] = !hasLiked;

        // increment or decrement likes 
        hasLiked ? this.portfolio['like_count']-- : this.portfolio['like_count']++;
      } );
       
  }
  
  getAmountComments = () =>  this.userProfileService
                              .getCommentsInPortfolio( this.portfolio.id , 0 ,1  ).pipe(
                                map( ({ data }) => data['GetUserPortfolioComments']['comments_amount'] ) 
                                ).subscribe( amountComment => this.amountComments = amountComment )
}

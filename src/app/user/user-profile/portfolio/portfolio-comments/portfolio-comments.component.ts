import { Component, OnInit, Input } from '@angular/core';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
  selector: 'app-portfolio-comments',
  templateUrl: './portfolio-comments.component.html',
  styleUrls: ['./portfolio-comments.component.scss']
})
export class PortfolioCommentsComponent implements OnInit {

  comment: string = '';
  
  company_id: string = '';
  
  @Input() owner_id: string;

  @Input() portfolio_id: string;
  
  after: number = 0;

  comments: any[] = [];

  activeProfile: any;

  isCompanyActive: boolean;

  pagination: BehaviorSubject<number> = new BehaviorSubject<number>( 0 );

  amountOfComments: number;
  
  length: number = 0;

  loading: boolean = true;

  constructor(
     private userProfileService: UserProfileService,
     private globalUserService:  GlobalUserProService
  ) {
    
       this.isCompanyActive = this.globalUserService.isCompanyActive();

       this.company_id = this.isCompanyActive ? 
                         this.globalUserService.getComapnyId() : 
                         undefined

       this.activeProfile = this.isCompanyActive ?
                            this.globalUserService.getCompanyProfile() : 
                            this.globalUserService.getUserProfile();
                     
   };

  ngOnInit() {

      this.pagination.pipe(
         switchMap( after => this.getComments( after ) )
      ).subscribe( ( comments ) => {
          this.comments.push( ...comments['GetUserPortfolioComments']['comments'] );
          this.amountOfComments =  comments['GetUserPortfolioComments']['comments_amount'];
          this.loading = false;

          this.userProfileService
          .portfolioEventEmitter.next( {
              amountComments: this.amountOfComments,
              _case: 'comments'  
          })

      })

  }

 

  addComment() {
     

     if( !this.comment ) return ;

     if(!this.length)  this.length =  this.amountOfComments  

     this.length++ ;
 
     let input = {
        company_id: this.company_id,
        owner_id: this.owner_id,
        portfolio_id: this.portfolio_id,
        comment: this.comment,
     };

     this.userProfileService
     .addCommentsInPortfolio( input ).subscribe( ( { data } ) => {

            this.comments.unshift({
                comment: this.comment,
                company_profile: this.isCompanyActive ? this.activeProfile : undefined ,
                created_at:  new Date().toISOString(),
                id: data['AddCommentToPortfolio']['id'],
                user_profile:  !this.isCompanyActive ? this.activeProfile : undefined
            })  
          
            this.userProfileService
            .portfolioEventEmitter.next({
                  amountComments: this.length,
                  _case: 'comments'  
            })

            this.comment = '';
     } );


     
  };

  handlePagination() {
         
       this.after+=4;
       this.pagination.next(this.after);
  }


  getComments( after: number ): Observable<any> {
     return this.userProfileService
            .getCommentsInPortfolio( this.portfolio_id, after ).pipe(
              map( ( {data} ) => data )
            );
  }

  deleteComment( event: any , idx: number ) {

        if(!this.length)  this.length =  this.amountOfComments;

        this.length--;

       
       this.userProfileService
       .deleteCommentPortfolio(
           this.company_id,
           this.portfolio_id,
           event['id']
       ).subscribe( () => {
         this.comments = this.comments.filter( comment => comment['id'] !==  event['id'] )

         this.userProfileService
            .portfolioEventEmitter.next({
                  amountComments: this.length,
                  _case: 'comments'  
            })

        } )
      
  }

}

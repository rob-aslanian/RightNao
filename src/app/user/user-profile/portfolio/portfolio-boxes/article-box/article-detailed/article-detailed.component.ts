import { Component, OnInit } from '@angular/core';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';

@Component({
  selector: 'app-article-detailed',
  templateUrl: './article-detailed.component.html',
  styleUrls: ['./article-detailed.component.scss']
})
export class ArticleDetailedComponent implements OnInit {

  userId: string = '';
  articleId: string = '';
  selectedArticle : any = null;
  src: string = '';
  zoomImage: boolean;
  companyId: ( string | undefined );

  constructor(
    private userProfileService: UserProfileService,
    private activatedRoute: ActivatedRoute,
    private globalUserProService: GlobalUserProService
  ) { }

  ngOnInit() {
   
    this.userId =     this.activatedRoute.parent.snapshot.params['id'];
    this.articleId  = this.activatedRoute.snapshot.params['id'];
    this.companyId = this.globalUserProService.isCompanyActive() ? this.globalUserProService.getComapnyId() : undefined;

    if( this.userId && this.articleId ) {
      
       this.userProfileService
       .getUserPortfolioById( 
         this.userId,
         this.articleId
       ).pipe(
          map( ({ data }) => data['GetUserPortfolioByID'] )
       ).subscribe( data => this.selectedArticle = data );

       // Add view count to portfolio
       this.userProfileService
       .AddViewCountToPortfolio(
         this.companyId,
         this.userId,
         this.articleId
       ).subscribe(  )

    }

  }


  openModal( img: string ){
       this.src = `/file/${img}`;
       this.zoomImage = true;
  };
}

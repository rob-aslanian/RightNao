 import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedSliderComponent } from 'src/app/_shared/components/shared-slider/shared-slider.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
 
 


@Component({
  selector: 'app-userportfoliodetailed',
  templateUrl: './userportfoliodetailed.component.html',
  styleUrls: ['./userportfoliodetailed.component.scss']
})

export class UserportfoliodetailedComponent implements OnInit {
   

  @ViewChild( SharedSliderComponent , { static: false }) slider: SharedSliderComponent

  selectedPortfolio: any = {};

  loading: boolean = true;

  @Input() portId: string;
 
  @Output() result: EventEmitter<any> = new EventEmitter<any>();

  userId: string = '';

  userProfileId: string = '';
  
  files: string[] = [];

  type: string;

  file: string;

  $destroy: Subject<{ _case: string, portfolioId: string }> = new Subject<{ _case: string, portfolioId: string  }>();

  companyId: (string | undefined);

  amountComments: number = 0;
  
  constructor(
     private userProfileService: UserProfileService,
     private activatedRoute: ActivatedRoute,
     private globalUserProfileService: GlobalUserProService,
     private route: Router
  ) { }

  ngOnInit() {


    

    this.userId =  this.activatedRoute.parent.snapshot.params['id'];

    this.type   = this.activatedRoute.snapshot.data['type'];
     
    this.companyId = this.globalUserProfileService.isCompanyActive() ? this.globalUserProfileService.getComapnyId() : undefined;
  
    this.userProfileId = this.globalUserProfileService.isAuthenticated() && this.globalUserProfileService.getProfileId();
   
    // get Comments length
    this.userProfileService
    .portfolioEventEmitter.subscribe(
       ( data ) => {
           if( data._case === 'comments' ) {
                 this.amountComments = data['amountComments']             
           }
       }
    )
    
    if( this.userId && this.portId ) {

        this.userProfileService
         .getUserPortfolioById(
             this.userId,
             this.portId
          )
          .subscribe(
              ({ data }) => {
                   this.selectedPortfolio = data['GetUserPortfolioByID'];
                   this.loading = false;  
                   this.files = this.selectedPortfolio.files.map( port => port['address'] );
  
                  
                  // View Count
                  this.userProfileService
                  .AddViewCountToPortfolio( this.companyId, this.userId, this.selectedPortfolio.id ).pipe(
                    takeUntil( this.$destroy )
                  ).subscribe( data => console.log( data ) )
                   
              }
          )
    }
    
  }
 

  save() {
        
    const aEl =  document.createElement( 'a' );
    aEl.href = `/file/${this.slider.primaryFile}`;
    aEl.download = this.selectedPortfolio['files'].filter( file => file['address'] === this.slider['primaryFile'] )[0]['name'];
    
    aEl.click();

    aEl.remove();

    this.userProfileService
      .saveCounterPorfolio( this.userId, this.selectedPortfolio.id ).pipe(
          takeUntil( this.$destroy )
      ).subscribe( data => this.selectedPortfolio.saved_count++ );

  }
 
  likeOrUnlikePortfolio( portfolioId: string, hasLiked: boolean ) {
        const mutation = hasLiked ?
                        this.userProfileService.unlikeUserInPortfolio( this.companyId, this.userId, portfolioId ) : 
                        this.userProfileService.addLikesInPortfolio( this.companyId, this.userId, portfolioId );

        mutation.pipe( takeUntil( this.$destroy ) ).subscribe( );

        this.selectedPortfolio['has_liked'] = !hasLiked;

        hasLiked ? this.selectedPortfolio.like_count-- : this.selectedPortfolio.like_count++; 

        this.userProfileService
        .portfolioEventEmitter.next({
             portfolioId: this.selectedPortfolio.id,
             hasLiked,
             _case: 'likes'
        })

  }

  handleDots( portfolioId: string, isEdit: boolean ) {

      if(  !isEdit ) {

        this.userProfileService.removePortfolio(portfolioId).subscribe();

        this.userProfileService
        .portfolioEventEmitter.next(
           {
             _case: 'delete',
             portfolioId
           }
        )
      } else {
            this.route.navigate(['../', 'edit-portfolio', this.selectedPortfolio.id , this.type ], { relativeTo: this.activatedRoute  })
      }

      this.result.emit({ type: 'close' } );
  }
 
  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
    
  }

};

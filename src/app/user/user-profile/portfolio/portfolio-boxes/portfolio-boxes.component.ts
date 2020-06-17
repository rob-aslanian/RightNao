import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';

@Component({
  selector: 'app-portfolio-boxes',
  templateUrl: './portfolio-boxes.component.html',
  styleUrls: ['./portfolio-boxes.component.scss']
})

export class PortfolioBoxesComponent implements OnInit {


  addType: string = '';
  userId:  string;
  $after: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  after: number =  0;
  portfolios: any[] = [];
  isOninit: boolean = true;
  amountPortfolios: number ;
  first: number = 12;
  activeUserId: any;
  companyId: any;
  musics: any[] = []
 

  constructor(
     private activateRoute: ActivatedRoute,
     private userProfileService: UserProfileService,
     private globalUserProService: GlobalUserProService
  ) {
       this.activeUserId  = !globalUserProService.isCompanyActive() && globalUserProService.getProfileId();
       this.companyId     =  this.globalUserProService.isCompanyActive() ? this.globalUserProService.getComapnyId() : undefined;
   }

  ngOnInit() {

     
      this.addType = this.activateRoute.snapshot.data['type'];
    
      this.userId  = this.activateRoute.parent.snapshot.params['id'];

      // Infinity scroll
      this.$after.pipe(
         switchMap( 
            ( after: number ) => {
                return this.userProfileService
                      .getPortfolioByContentType(
                          this.userId,
                          this.addType,
                          after,
                          this.first,
                          this.companyId
                      ).pipe( map( ({ data }) => data['GetUserPortfolios'] ));
            }
          )
      ).subscribe( portfolios => {
           if(  this.addType === "Audio" ) {
              this.parseMusics(portfolios['portfolios']);              
           } else {
             this.portfolios.push(...portfolios['portfolios']);
           }

              
           this.amountPortfolios = portfolios['portfolio_amount'];
           this.after+=12;
           console.log(this.amountPortfolios, this.after);
      }); 

      // Portfolio likes

      this.userProfileService
       .portfolioEventEmitter.subscribe( data => {
               this.handlePortfolioModal( data );
       });

  };

  handleScroll( ): void {

    if( !this.isOninit && this.after < this.amountPortfolios + 12 ) {
        this.$after.next(this.after); 
    };
 
     this.isOninit = false;
  }

  handlePortfolioModal( data: any ) {
     switch (data._case) {
       case 'likes': {
          return this.portfolios.map( (port, i) => {
                if( port.id === data.portfolioId ) {
                    this.portfolios[i]['has_liked'] = !data.hasLiked;
                    data.hasLiked ? this.portfolios[i]['like_count']-- : this.portfolios[i]['like_count']++ ;
                }
            })  
        } 
       case 'delete': {
           return this.portfolios =  this.portfolios.filter( port => port.id !== data.portfolioId );
       }; 
       
     }
 
    
  }
  parseMusics( musics: any[] ) {
    
    musics.map( (music: any) => {
           // Parse portfolios
           if( music.files.length > 0 ) {
             // Parse files
               music.files.map( musicFile => {
                   if( !musicFile.mime_type.startsWith('image') ) {
                     // Add music files 
                        this.calculateMusicDuration( `/file/${musicFile.address}`, music, musicFile );
              

                   }    
               })
           }
    } )

    
}

calculateMusicDuration(  path: string, music ,musicFile  ) {

    const audio = new Audio(path);

    let duration = { time: '' };

     audio.addEventListener( 'loadedmetadata', () => {
              this.musics.push({
                portfolioId:  music.id,
                file:   musicFile.address,
                name:   musicFile.name,
                fileId: musicFile.id,
                duration: audio.duration > 60 ? ((audio.duration - 18) / 60).toFixed(2) : `0.${ audio.duration.toFixed(0)}` 
        })
       
    }, false )
   
    audio.remove();

    return duration;
    

};

removeArtile({ _case, id }) {
     if( _case === 'delete') this.portfolios = this.portfolios.filter( ( article )  => id !== article.id);
     
}

}

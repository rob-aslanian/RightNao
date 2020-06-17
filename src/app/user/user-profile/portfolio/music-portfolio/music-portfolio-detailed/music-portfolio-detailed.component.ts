import { Component, OnInit, ViewChild, ElementRef, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { map } from 'rxjs/operators';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';


@Component({
  selector: 'app-music-portfolio-detailed',
  templateUrl: './music-portfolio-detailed.component.html',
  styleUrls: ['./music-portfolio-detailed.component.scss']
})
export class MusicPortfolioDetailedComponent implements OnInit {

  @ViewChild( 'playe', { static: false } ) player: ElementRef<HTMLAudioElement>;

  music: any = {};
  selectedFile = null;
  id: string;
  userId: string;
  showComments: boolean = true ;
  amountComments: number = 0;
  companyId: ( string | undefined ) = '';
  selectedMusic: any = null ;
  isTurnnedOn: boolean = false;
  musics: any[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userProfileService: UserProfileService,
    private globalUserProService: GlobalUserProService,
    private changDetectorRef: ChangeDetectorRef
  ) { }

 
 
  ngOnInit() {


    this.userProfileService.portfolioEventEmitter.subscribe( data => {
        if(data._case === "comments" ) this.amountComments = data['amountComments']
    } )

    // portfolio id 
    this.id = this.activatedRoute.snapshot.params['id'];

    this.userId = this.activatedRoute.parent.snapshot.params['id'];
 
    this.companyId = this.globalUserProService.isCompanyActive() ?
                     this.globalUserProService.getComapnyId() : 
                     undefined;
    
    
    this.userProfileService
    .AddViewCountToPortfolio(this.companyId, this.userId, this.id).subscribe()


    this.userProfileService
    .getUserPortfolioById(  this.userId, this.id ).pipe(
       map( ({ data }) => data['GetUserPortfolioByID'])
    ).subscribe( data => {
         this.music =  data;
         const music =  this.parseMusic(data.files)[0];
         this.selectedMusic = music ;
         this.parsefileImage(  );
      });
    
 
  }
 
  parsefileImage(  ) {
    if( this.music.files && this.music.files.length > 0 ) {
          const file = this.music.files.filter( file => file.mime_type.startsWith('image') );
          this.selectedFile =  file.length > 0 ? file[0] : {};
    }   
  }

  likeOrUnlike( hasLiked: boolean ) {
      const mutation = !hasLiked ? 
                       this.userProfileService
                       .addLikesInPortfolio( this.companyId, this.userId, this.id ): 
                       this.userProfileService
                       .unlikeUserInPortfolio(this.companyId, this.userId, this.id)

     mutation.subscribe();

     !hasLiked ? this.music.like_count ++ : this.music.like_count--;
     this.music.has_liked = !this.music.has_liked; 
  }

  parseMusic( musics: any[] ) {
       this.musics = musics.filter( ( file )  => file.mime_type.startsWith('audio'));
       return this.musics;      
  }

  playMusic( isPlaying: boolean, isNext: boolean = false ) {
      if( this.player.nativeElement.ended &&  !isNext ) {
           return this.handleonMusicEnd( this.selectedMusic.id );
      }
      
      if( isPlaying ) {
          const playPromise =  this.player['nativeElement'].play();
          if( !!playPromise ) {
              playPromise.catch( () => this.player['nativeElement'].play() );
          }
      }
     else {
      this.player['nativeElement'].pause() ;
     }
 
     this.isTurnnedOn = !this.player['nativeElement'].paused; 
  }

  handleSlide( { target }  ) {
        this.player.nativeElement.currentTime = +target.value;
  }

  // dont touch this 
  onTimeUpdate( ) { }

  handleonMusicEnd( id?: string ) {
       if(!id) return;
       let index = this.musics.findIndex( audio => audio.id === id );     

       if( this.musics[++index] ) {
              this.selectedMusic = this.musics[index];
       }
       else {
              this.selectedMusic = this.musics[0];
       }
       this.changDetectorRef.detectChanges();
       this.playMusic(true, true );
 
  }

  handleSubPlayerClicks( isPause: boolean ) {
       isPause ? 
         this.player.nativeElement.pause() : 
         this.player.nativeElement.play();
         
       this.isTurnnedOn = !this.player['nativeElement'].paused; 

  }

}

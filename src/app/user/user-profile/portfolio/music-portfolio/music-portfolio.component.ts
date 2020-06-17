import { Component, OnInit, Input  } from '@angular/core';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-music-portfolio',
  templateUrl: './music-portfolio.component.html',
  styleUrls: ['./music-portfolio.component.scss']
})
export class MusicPortfolioComponent implements OnInit {

  @Input() portfolios: any[];

 

  userId: string = '';

  constructor(
    private fileService: ImageUploadService,
    private userProfileService: UserProfileService,
    private activatedRoute: ActivatedRoute
  ) { }


  ngOnInit() {
      this.userId =  this.activatedRoute.parent.snapshot.params['id'];
  }



  getMusic( e: any ) {
      if( e._case === "delete" ) {
         if( e.id ) {
             this.fileService
             .removeFilesPortfolio(
               e.portfolioId,
               [e.id]
             ).subscribe( () => this.portfolios.splice( e.index, 1 ) );
         }

      }
      if( e._case == "download" ) {
           this.userProfileService
           .saveCounterPorfolio( this.userId, e.portfolioId ).subscribe()
      }
  }
 
}

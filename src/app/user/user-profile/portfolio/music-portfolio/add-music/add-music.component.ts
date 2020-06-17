import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { switchMap, map } from 'rxjs/operators';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
 
 

interface iMusic  {
    _case: any,
    index: number
};

@Component({
  selector: 'app-add-music',
  templateUrl: './add-music.component.html',
  styleUrls: ['./add-music.component.scss', '../../add-portfolio/add-portfolio.component.scss']
})

export class AddMusicComponent implements OnInit {

  portfolioForm: FormGroup;

  musics: any[] = [];

  file: any = {
      path: '',
      blob: null
  };

  defaultImage: string[] = [
        'assets/img/Music/1.jpg',
        'assets/img/Music/2.jpg',
        'assets/img/Music/3.jpg',
        'assets/img/Music/4.jpg',
        'assets/img/Music/5.jpg',
        'assets/img/Music/6.jpg'
   ];

   isSubmitted: boolean = false;

   utils = utilities;

  constructor(
    private fb: FormBuilder,
    private userProfileService: UserProfileService,
    private imageUploadService: ImageUploadService,
    private router: Router,
    private activatedRoute: ActivatedRoute
 
  ) {
          this.portfolioForm =  this.fb.group({
            title: ['', Validators.required ],
            description: [''],
            is_comment_disabled: [false],
            content_type: ['Audio']
        })
   }

   get portCtrl() {
       return this.portfolioForm.controls;
   }

  ngOnInit() {
  }

  getFiles( e: any ) {
 
      
      const audio = new Audio(e.fileForView['changingThisBreaksApplicationSecurity']);
 
      
      audio.addEventListener( 'canplaythrough', () =>  {
        
        
        this.musics.push( {
            file: e.file,
            name: e.file.name,
            duration: audio.duration > 60 ? ((audio.duration - 18) / 60).toFixed(2) : `0.${ audio.duration.toFixed(0)}`
        });
             
      }, false)

      audio.remove();
  }

  getMusic( e: iMusic ) {
       if( e._case === "delete" )  {
           this.musics.splice( e.index, 1 );
       }
  }

  getUploadImage(  e: any ) {
     this.file.path = e['fileForView'];
     this.file.blob = e.file;     
  };

  setDefaultImage( imgSrc: string  ) {
      this.file.path = imgSrc;
      this.file.blob = null;  
  };

  submitForm() {

    if( this.portfolioForm.invalid || 
        this.musics.length < 0 || 
        !this.file ) return   this.isSubmitted = true;

    if( !this.file.blob ) this.createBlobFromImageUrl( this.file.path );      

    this.userProfileService
    .addPorfolio(
        this.portfolioForm.value
    ).pipe(
      switchMap( ( id ) => this.addFilesInPortfolio( id, [ this.file.blob, ...this.musics.map( file => file.file ) ] ) )
    ).subscribe( data => this.router.navigate(['../../Music'], { relativeTo: this.activatedRoute }) )

  }

  createBlobFromImageUrl( imgPath: string ) {

     const image = new Image();

     image.onload = () => {
          const canvas  = document.createElement('canvas');
          canvas.width = image.width;
          canvas.height = image.height;

          const ctx = canvas.getContext('2d');

          ctx.drawImage( image, 0,0 );

          canvas.toBlob( ( blob: Blob ) => {
              this.file.blob = blob;
              image.remove();
          } )
       
     }
     image.src = imgPath;

  }

  addFilesInPortfolio( portId: string , files: Blob[] ): Observable<any> {
     const  formData: FormData = this.utils
                                 .addFilesInFormData( files );

     return this.imageUploadService
           .uploadPorfolioImage( formData, portId )
       
  };
 

} 

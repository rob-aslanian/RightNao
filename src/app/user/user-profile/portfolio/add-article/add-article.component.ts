import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { switchMap, map } from 'rxjs/operators';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { merge } from 'rxjs';
 

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {


  file: any  = {
      fileForView: '',
      file: {}
  };

  text: FormControl;
  submittedArticle: boolean = false;

  description: string = '';
  articleId: string ;
  userId: string ;
  isEdit: boolean = false;
  fileId: string ;

  constructor(
     private userProfileService: UserProfileService,
     private uploadService: ImageUploadService,
     private router: Router,
     private activatedRouter: ActivatedRoute
  ) {
     this.text = new FormControl( '', Validators.required );
   }

  ngOnInit() {
    // Edit artice starts 
     const data =  this.activatedRouter.snapshot.data;
     if( data && data['type'] && data['type'] === "edit" )  {
           this.editArticles();      
     }
     //
  }

  getFiles( e: any ) {
    console.log(e);
    if(e._case === 'delete' && this.isEdit) {
         this.file.fileForView = '';
    } else {
      let file:Blob = e.file;
      if( !file.type.includes( 'image' ) ) return;
         this.file = e;
    }
  };

  submitArticle() {
      
     if( this.text.invalid || 
         !this.file || 
         !this.file.fileForView || 
         !this.description ) return this.submittedArticle = true;
         

     const input = {
          title: this.description,
          description: this.text.value,
          tools: [ ],
          is_comment_disabled: false,
          content_type: !this.isEdit ? 'Article' : undefined
     };

    if( this.isEdit ) return this.updateArticle( input );
 

    const formData: FormData = new FormData();

    formData.append('file', this.file['file'] )

    this.userProfileService
    .addPorfolio( input )
    .pipe(
      switchMap( ( id: string )  => this.uploadService.uploadPorfolioImage( formData, id ))
    ).subscribe( data => this.router.navigate([ '../', 'Article' ], { relativeTo: this.activatedRouter }) )

     
  }
  
  editArticles() {
        
    this.isEdit = true;
    this.articleId = this.activatedRouter.snapshot.params['id'];
    this.userId = this.activatedRouter.snapshot.parent.params['id'];

    this.userProfileService
    .getUserPortfolioById( 
      this.userId,
      this.articleId
    ).pipe(
      map( ({ data }) => data['GetUserPortfolioByID'] )
    ).subscribe( data => {
           this.text.setValue(data.description);
           this.description = data.title;
           this.file.fileForView = data.files[0]['address'];
           this.file.fileForView = data.files[0]['address'];
           this.fileId  = data.files[0]['id'];
    } );

  }

  updateArticle( input ) {

    // Old image is deleted and new is added 
        if( 'name' in this.file.file ) {
            const formData = new FormData();
            formData.append('file', this.file.file);

             merge(
                this.uploadService.removeFilesPortfolio( this.articleId , [ this.fileId ] ),
                this.uploadService.uploadPorfolioImage( formData, this.articleId )
             ).subscribe( )
        }
    
        this.userProfileService
         .changePortfolio( this.articleId, input ).subscribe( data => this.router.navigate(['../../../', 'Article'], { relativeTo: this.activatedRouter }) );
        
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { map, switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { supportedType } from '../model.interface';
import tools from 'src/assets/data/en/tools';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { utilities } from 'src/app/_shared/utilities/utilities';
 
 


@Component({
  selector: 'app-add-portfolio',
  templateUrl: './add-portfolio.component.html',
  styleUrls: ['./add-portfolio.component.scss']
})



export class AddPortfolioComponent implements OnInit {

  portfolioId: any;
 
  files: any [] = [ null, null, null, null ];

  supportedType: string = '';

  portfolioForm: FormGroup
 
  isSubmitted: boolean = false;

  primaryFile: any =  {
      file:        '',
      fileForView: '',
      id: '',
      size: 0
  };

 addType: supportedType;

 fileErr: boolean;
 
 tools = tools;
 
 selectedTools: any[] = [];

 userId: string = '';

 isEdit: boolean = false;

 deletePortfolioFiles: string[] = [];

 userUrl: string;

 utilites = utilities;

 fileSize: number = 0;

 maximumFileSize: number = 0;

 fileSizeInPercentage: number = 0;

 

  constructor(
      private fb: FormBuilder,
      private activeRoute: ActivatedRoute,
      private uploadService: ImageUploadService,
      private router: Router,
      private route: ActivatedRoute,
      private userProfileService: UserProfileService,
      private globalUserProService: GlobalUserProService
  ) {


    this.portfolioForm =  this.fb.group({
                              title: ['', Validators.required ],
                              description: [''],
                              is_comment_disabled: [false],
                              content_type: ['']
                          })
  }


  get prtCtrls() {
      return this.portfolioForm.controls;
  }


  ngOnInit() {
 

    this.addType = this.activeRoute.snapshot.params['type'];

    this.userId = this.globalUserProService.isAuthenticated() && this.globalUserProService.getProfileId();

    this.userUrl = this.globalUserProService.getProfile()['url'];

    if( this.addType ) {
        this.portfolioForm
        .get('content_type')
        .setValue( this.addType );

    }

    const data =  this.activeRoute.snapshot.data['type'];

    if( data === 'edit' && this.userId  ) {
         
        this.isEdit = true;

        this.portfolioId = this.activeRoute.snapshot.params['id'];

        this.userProfileService
        .getUserPortfolioById( this.userId, this.portfolioId ).pipe(
            map( ({ data }) => data['GetUserPortfolioByID'] )
        )
        .subscribe( data => {
            if( data ) this.handleEditPortfolio( data );
        } )
    };

    // Validations for maximum file sizes
    this.addType === 'Photo' ? this.maximumFileSize = 25 : this.maximumFileSize =  100; 
      
  }


  getFiles( e: any , idx: number, isPrimaryFile: boolean) {

     
     // validations 
      if( this.fileErr ) this.fileErr = false;

      // Calculate combined file sizes 
      if( e._case === 'add' && e.file && e.file.size &&  !this.fileSizeBar( e.file.size , true ) ) return;
 

      if( isPrimaryFile && e._case === 'add' ) {
    
          return  this.primaryFile = {
                          file: e.file,
                          fileForView: e.fileForView,
                          size: e.file.size
                    } ;
      };
  
 
      if( e._case === "delete" ) {
        
         const fileSize = isPrimaryFile ? this.primaryFile['size'] : this.files[idx]['size'];

         this.fileSizeBar(  fileSize , false );
 
 
         if( this.isEdit && ( this.primaryFile['id']  || this.files[idx]['id']) ) {
           this.deletePortfolioFiles.push( isPrimaryFile ? this.primaryFile['id'] :  this.files[idx]['id'] );
         }     
           isPrimaryFile ? this.primaryFile = { file: '', fileForView: '', id: '', size: 0 } : this.files[idx] = null;
        
      } else if ( e._case === 'primary' ) {
            this.swapFiles(e, idx);
      }
      // Add

      else {
 
         this.files[idx] = {
               file: e.file,
               fileForView: e.fileForView,
               size: e.file.size
          } ;
      }

   
      
  };

  submitForm() {

        if( !this.portfolioForm.valid ) {
            return this.isSubmitted = true;
        } 

        if( this.hasFilesErr() ) {
            this.isSubmitted = true;
            return  this.fileErr = true;
        }

       const { title, description, is_comment_disabled, content_type } = this.portfolioForm.value;
 

       let input = {
            title,
            description,
            is_comment_disabled,
            content_type: this.isEdit ? undefined : content_type,
            tools: this.selectedTools.map( tool => tool.id )
       };

       let mutation: Observable<any> = this.isEdit ? 

       this.editPortfolio( this.portfolioId, input ) : 
       
       this.addPortfolio( input );
        
       // Delete files in portfolio
       if( this.isEdit && this.deletePortfolioFiles.length > 0 ) this.deletePortfolioFilesDB( this.deletePortfolioFiles );

      // Add or edit portfolio
       mutation.pipe(
                    switchMap( ( id: string ) => {
                        return  this.uploadFilesInPortfolio( this.isEdit? this.portfolioId :  id, [ this.primaryFile, ...this.files ]);
                }))

      .subscribe( data =>  {
            setTimeout( () => 
                this.router.navigate([ this.isEdit ? '../../../' : '../../', this.addType ], { relativeTo: this.route }) 
            , 1000 )
       }); 
  };

  addPortfolio( input: any ): Observable<any> {
    return  this.userProfileService
                .addPorfolio( input );
  }


  editPortfolio( id: string,  input: any ): Observable<any> {
    return this.userProfileService
               .changePortfolio( id, input );
  }

  swapFiles( e: any, idx ) {
      this.files[idx] = this.primaryFile;
      this.primaryFile = e ;

  };

  uploadFilesInPortfolio( portfolioId: string , files: any[] ): Observable<any>  {

    const formDataFiles: FormData =  this.appendFilesToFormData( files )
                                        
    return this.uploadService
            .uploadPorfolioImage( formDataFiles, portfolioId );
  };

  appendFilesToFormData( files: any[] ): FormData {

      const formData: FormData = new FormData();
      
      files.map( file => {

          if( file && file.file ) {
              formData.append( 'file', file.file );
          }
      } )
      return formData;
  }

  hasFilesErr(): boolean {
     return !this.primaryFile.file && !this.primaryFile.fileForView;
  }

  searchTool = (text$: Observable<string>) =>    
      text$.pipe(
            debounceTime(100),
            distinctUntilChanged(),
            map( term => term.length > 1 ?
                 this.tools.filter( (tool) =>  tool.name.toUpperCase().includes(term.toUpperCase() )  ) : [] 
             ))

  toolFormatter = ( result ) => result.name;

  selectTool( e: any, hasId: boolean , templateVar: any ) {

        if( hasId && templateVar.value && this.selectedTools.length < 10 ) {
              e.preventDefault();
              const { item } = e;
              this.selectedTools.push({ name: item.name, id: item.id })
              templateVar.value = '';
              
        } else if( !hasId && e.target.value && this.selectedTools.length < 10 ) {            
              this.selectedTools.push({ name: e.target.value, id: e.target.value })
              e.target.value  =  '';
        };
  }

  handleEditPortfolio( data: any ) {
   
    // patchvalue to forms
    
    const { 
            title, 
            description, 
            is_comments_disabled,
            content_type, 
            tools,
            files
          } = data;

       this.portfolioForm.patchValue({
            title,
            description,
            is_comment_disabled: is_comments_disabled,
            content_type
       })

       // handle tools edit
       if( tools.length > 0 ) {
           this.selectedTools = tools.map( item => {
               return this.parseTools(item);
           } );    
       }
       
       if( files.length > 0 ) {
             this.handleFIlesOnEdit( files );
       }
       
  }


  parseTools( item ) {

      for (let index = 0; index < this.tools.length; index++) {
             if( item === this.tools[index]['id'] ) {
                   return {
                        name: this.tools[index]['name'],
                        id:   this.tools[index]['id']
                   }
             } 
      }
    
    // Case if tool couldnot be found 
    return {
        name: item,
        id:   item
    }
  }


  handleFIlesOnEdit( files ) {

      files.map( (file,i ) => {
        this.files[i] =  {
                    id: file['id'],
                    fileForView:`/file/${ file['address'] }`
             }
     }) 

     this.primaryFile.fileForView = `/file/${ files[0]['address'] }`;
     this.primaryFile.file = `/file/${ files[0]['id'] }`;
     this.primaryFile.id =  files[0]['id'];
    //  this.files.splice( 0, 1 )
    this.files.length === 5 ? this.files.splice( 0, 1 ) : this.files[0] = null;
    
  }

  removeTool( idx: number ) {
    this.selectedTools.splice( idx, 1 );
  };

  deletePortfolioFilesDB( files: string[] ) {
      return  this.uploadService
             .removeFilesPortfolio( this.portfolioId, files )
             .subscribe()
  }

  fileSizeBar( size: any, isAdd: boolean ): boolean {
 
      if( size ) {

           // Validations for progress bar
          const fileSize = this.utilites.bytesToMB( size );
       
          if( isAdd ) this.fileSize += fileSize;

          if( !isAdd ) this.fileSize -= fileSize;

          const calcFilzePercantge =  +(( this.fileSize / this.maximumFileSize ) * 100).toFixed(0);

          if( calcFilzePercantge - 50 > 0 ) return false ;

          this.fileSizeInPercentage = calcFilzePercantge;

       return true;


      }
      return false;
  }
  

};

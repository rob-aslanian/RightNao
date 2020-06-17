import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { supportedType, _case } from '../../model.interface';
import { supportedTypes } from '../../model.interface'; 
import { utilities } from 'src/app/_shared/utilities/utilities';
 


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})


export class UploadFileComponent implements OnInit {
   

  file: ( SafeResourceUrl | string ) = '';

  filesToInclude: any[]  = [];

  utilites = utilities;

  /**
   * Maximum file sizes
   * 
   */
  validateSizes: {
      Photo: number,
      Video: number,
      Music: number
  } = {
      Photo: 5,
      Video: 25,
      Music: 15
  };
  maximumFileSize: any;

  /**
   * 
   * Get files for edit
   */

  @Input() set fileEdit( file: any ) {
        this.file = file;
  }
 
  /**
   * 
   * get type for upload
   * 
   */
  
  @Input() supportedType: supportedType;

  /**
   * 
   * pass index for ng for 
   * 
   */


  @Input() index: number = -1;


  /**
   * Emit files
   * 
   */

  @Output() result: EventEmitter<{ file?: Blob | string , _case: _case, fileForView?: SafeResourceUrl }> = new EventEmitter<{ file?: Blob | string, fileForView: SafeResourceUrl, _case: _case}>();
 

  constructor(
     private sanitize: DomSanitizer
  ) { }

  ngOnInit() {
       if( this.supportedType ) {
            this.filesToInclude =  supportedTypes[this.supportedType];
            this.maximumFileSize = this.validateSizes[this.supportedType];
          
        }
  }

  uploadFile( e: any ) {
       const file: Blob = e.target.files[0];
       if( !file ) return;     
       const path =  URL.createObjectURL(file);

       const fileForView =  this.sanitize.bypassSecurityTrustResourceUrl(path);     
 
       let size = Math.round( this.utilites.bytesToMB( file.size ));
 
       if( !this.isTypeSupported( file.type ) || size >= this.maximumFileSize ) return ;
       this.result.emit(
            {
               file,
               fileForView,
               _case: 'add'
            }
       )
  };

  removeFile() {

      this.file = null;

      this.result.emit(
            {
              _case: 'delete'
            }
      );

  };

  makePrimary( file: any ) {
       
       if( file ) {
         this.result.emit(
           {
            fileForView: file,
             _case: 'primary'
           }
         )
       };
  };

  isTypeSupported( fileType: string ): boolean {
        return this.filesToInclude.includes( fileType );
  }

}

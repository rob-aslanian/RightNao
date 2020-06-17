import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
 
@Component({
  selector: 'app-upload-service-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss', '../../../services/services-service-requests/services-post-service/services-post-service.component.scss']
})
export class UploadFileServiceComponent implements OnInit {

 
  showFiles: boolean = false; 
  previewUrl: any = null; 

  @Output() result: EventEmitter<any> = new EventEmitter<any>(); 

  files: any[] = [];

  private _data: BehaviorSubject<any> = new BehaviorSubject<any>( [] );

  @Input() set editFiles( files: any[] ) {       
        if( files.length > 0 ) this._data.next( files );
  }
 
  constructor(
    private sanitariaze: DomSanitizer
  ) { }

  ngOnInit() {
     this._data.subscribe( files => this.files = files );
  }

  uploadFile(event: any) { 
 
   
    const file: any = event.target.files[0]; 

    let mimeType = file.type; 

    
    if(!mimeType.startsWith('image') && !mimeType.startsWith('application')  || !file ) {
      return; 
    }
 
   
    this.files.push({ 
        address: this.preview( file ), 
        blob: file, mime_type: file.type === 'application/pdf' ? file.type : file.type.split('/')[0],
        name: file.name.split('.')[0]
    });

    this.result.emit({
        files: this.files,
        case: 'add',
    })
    
  }

  preview( file ): SafeResourceUrl {
      const url = URL.createObjectURL(file);
      const Fileurl = this.sanitariaze.bypassSecurityTrustUrl(url);
      return Fileurl;
  }

  delete( idx: number ) {
       if( this.files[idx]['id'] ) {
          this.result.emit({
              id: this.files[idx]['id'],
              case: 'delete'
          })
       }
      this.files.splice( idx, 1 );
  }
}

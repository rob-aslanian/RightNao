import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { map, tap } from 'rxjs/operators';
import { IFile } from 'src/app/_shared/models/files.interface';
import { GalleryService } from '../../gallery.service';
import { utilities } from 'src/app/_shared/utilities/utilities';



@Component({
  selector: 'app-gallery-img-row',
  templateUrl: './gallery-img-row.component.html',
  styleUrls: ['./gallery-img-row.component.scss']
})
export class GalleryImgRowComponent implements OnInit {

  @Input() files:IFile[] = Array(3).fill(null);
  companyId:string;
  utils = utilities;
  errors:{
    [type:string]:boolean
  } = {}

  @Output() result:EventEmitter<IFile[]> = new EventEmitter<IFile[]>();


  constructor(
    private uploadService:ImageUploadService,
    private galleryService:GalleryService
  ) { }

  ngOnInit() {
    this.companyId = this.galleryService.comapyId;

  }

  emitFiles(){
    this.result
        .emit(
          this.files
              .filter(el => el !== null)
        )
  }

 async uploadFile(e  , i:number){
    let file:File = e.target.files[0],
        type = this.utils.getFileMimeType(file.type),
        size = file.size;

      this.errors = {};
      /// Validation
      if( (type === 'video' && this.utils.bytesToMB(size) > 25 ) || 
          (type === 'image' && this.utils.bytesToMB(size) > 5
          ))
        { this.errors[type] = true; }

      else{
        let form = new FormData();
        form.append('files' , file)

        this.errors = {};
    
        await   this.uploadService
                    .uploadGallery(this.companyId , form)
                    .subscribe(
                      (el) => {
      
                          this.files[i] = {
                            id:el.id,
                            address:el.url,
                            isImage:file.type.split('/')[0] === 'image',
                            mime_type:file.type,
                            ...el
                          };   
                          
                          /// Emit data if done
                          if(el.status === 'done'){
                            this.emitFiles();
                          }
                        
                      }
                    )
      }



  }

  removeFile(file){
    let fileIndex = this.files.findIndex(el => el === file);

    this.uploadService
        .delteGalleryFile(this.companyId , [file.id])
        .subscribe(
          () => {
            fileIndex > -1 ? this.files[fileIndex] = null : null;
            this.emitFiles();
          }
        )


  }

}

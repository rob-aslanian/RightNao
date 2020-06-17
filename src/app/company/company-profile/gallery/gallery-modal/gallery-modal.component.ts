import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { GalleryService } from '../gallery.service';
import { IFile } from 'src/app/_shared/models/files.interface';

@Component({
  selector: 'app-gallery-modal',
  templateUrl: './gallery-modal.component.html',
  styleUrls: ['./gallery-modal.component.scss']
})
export class GalleryModalComponent implements OnInit {

  sliders:any[] = Array(1).fill(0);

  files:any[][] = [];
  existFiles:IFile[] = [];

  @Output() result:EventEmitter<{files:IFile[], type:string}> = new EventEmitter<{files:IFile[], type:string}>();

  @Input() type:string = 'Add';

  constructor(
    private config:NgbCarouselConfig,
    private galleryService:GalleryService
  ) {

    config.showNavigationIndicators = false;
    config.keyboard = true;

    this.existFiles = [...this.galleryService.files];
   
   }

  ngOnInit() {
    setTimeout(() => this.patchData() , 200)
  }

  patchData(){
    if(this.existFiles && this.type === 'Edit'){
      if(this.existFiles.length > 3){
        let count = Math.floor(this.existFiles.length / 3);

        for(let i = count; i >=  0 ; i--){
          this.files[i] = this.existFiles.splice(i , 3);

          i !== 0 ? this.sliders.push(i) : null;
        }

        this.files.reverse();
      }
      else { this.files[0] = this.existFiles; }

    }
  }

  
  getRowImages(files:any[] , idx:number , _i:number){

    this.files[idx] = files;

    let length = this.files[idx].length;

    if(length > 0 && length % 3 === 0 && this.files.length !== idx){
      this.sliders.push(this.files.length)
    }

    if(length === 0 && this.sliders.length > 1){      
      this.sliders.splice(_i , 1);
    }
    
  }

  submit(){
    let res = [].concat(...this.files);

    this.result.emit({
      files:res,
      type:this.type
    });
  }

}

import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ICompanyGalleries, ICompanyGallery } from 'src/app/_shared/models/company/gallery.interface';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { IFile } from 'src/app/_shared/models/files.interface';
import { GalleryService } from './gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;

  private _data:ICompanyGalleries;

  @Input() 
        set data(value:ICompanyGalleries){
            this.isAdmin = value['isAdmin'];
            this.galleries = value['galleries'];

            this._data = value;

            this.galleryService.comapyId = value['companyId'];
            this.galleryService.files = value['galleries'];
        };

        get data() : ICompanyGalleries{
          return this._data;
        }

  isAdmin:boolean;
  galleries:IFile[];
  modalType:string;

  constructor(
    private galleryService:GalleryService
  ) { }

  ngOnInit() {
  }


  open(type:string){
    this.modal.open();
    this.modalType = type;

    if(type !== 'preview' ){
      this.modal.title = `${type} Gallery`;
    }else{
      this.modal.title = 'Gallery';
    }
    
  }

  getFiles({files , type}){
    if(files){
       type === 'Add' ? this.galleries.unshift(...files) :
                        (this.galleries = files , this.galleryService.files = files)
    }

    this.modal.close();
  }
  openEmptyModal() {
     this.open('Add');
  }
}

import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ICoverImage } from 'src/app/_shared/models/company/coverImage.interface';
import { CoverImageService } from 'src/app/_shared/services/companies/cover-image.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CdkDrag, CdkDragEnd } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-cover-image',
  templateUrl: './cover-image.component.html',
  styleUrls: ['./cover-image.component.scss']
})
export class CoverImageComponent implements OnInit , OnDestroy {


  private _data:ICoverImage;

  destroy$:Subject<any> = new Subject<any>();

  hasImage:boolean = false;
  image:string | ArrayBuffer;
  imageName:string;
  imageLoaded:boolean = false;
  cropPossition:number = 0;
  isClickedVisitor:boolean = false;
  coverType: string ;

  @Input()
      set type( value: string ) {
         this.coverType = value;
  }
  @Output() changeRole: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() 
          set data(value:ICoverImage){
            this._data = value;
            this.hasImage = value.cover !== '';
            
            this.image =  this.hasImage ?  value.cover :
                            null;
          }

          get data() : ICoverImage{
            return this._data;
          }
          
  // In groups there is not view as visitor button 
  @Input() hasViewMode: boolean = true;


  showPopup:boolean = false;

  constructor(
    private coverService:CoverImageService
  ) { }

  ngOnInit() {

  }

  imageUpload(e){
    let file:File = e.target.files[0],
        reader = new FileReader();


    reader.readAsDataURL(file);

    this.imageName = file.name;
    reader.onload = (_e) => {
       
       this.image = reader.result;  
       this.imageLoaded = true;
    }
  }

  viewAsVisitor(isClicked:boolean){
    this.changeRole.emit(!isClicked);
    this.isClickedVisitor = isClicked;
    
  }

  discard(){
    this.imageLoaded = false;
    this.image = this.data.cover;
    this.showPopup = false;
  }

  removeImage(){
    this.coverService
        .removeImage(this.data.id, this.coverType, this._data.company_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            this.image = null;
            this.data.cover = null;
            this.showPopup = false;
          },
        )
  }


  drag(e:CdkDragEnd){

     let  y = (<any>e.source._dragRef)._passiveTransform.y;

     if(y){

       this.cropPossition =  y;
     }
  }

  reposition(){
    this.imageLoaded = true;
    this.imgToBase64();
    this.cropImage();
  }


  imgToBase64(){
    let image = new Image();
    (<any>image.src) = '/file/' + this.image;

    let canvas = document.createElement("canvas");
    let ctx;

    image.onload = event => {
      canvas.width = image.width;
      canvas.height = image.height;
  
      ctx = canvas.getContext("2d");
      
      ctx.drawImage(image, 0,  0);
      this.image = canvas.toDataURL("image/png");
    };
  }
  

  cropImage(cb?:any){
    let baseImage = new Image();
    (<any>baseImage.src) = this.image;

    let canvas = document.createElement("canvas");
    let ctx;


    baseImage.onload = event => {
      canvas.width = baseImage.width;
      canvas.height = 1281;
  
      ctx = canvas.getContext("2d");
 
      ctx.drawImage(baseImage, 0,  this.cropPossition );
      this.image = canvas.toDataURL("image/png");

      if(cb){
        let result = {
          file:this.image,
          name:this.imageName
        };

        return cb.call(this , result);
      }

      
    };


  }

  uploadImage(result?){
    this.coverService
        .uploadImage(this.data.id, result, this.coverType)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            let url = data['info'][0].url;
            this.image = url;
            this.data.cover = url;
          }
        )
  }

  saveImage() {
    let result ={
      file:this.image,
      name:this.imageName
    },
    companyId = this.data.id;

    this.hasImage = true;
    this.imageLoaded = false;

    this.coverService
        .uploadImageOrigin(companyId , result, this.coverType)
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => {
            let url = data['info'][0].url;
          
            if(this.cropPossition !== 0){

              return this.cropImage(this.uploadImage);
            }

            return this.uploadImage(result);

          }
        )
    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

  }

}

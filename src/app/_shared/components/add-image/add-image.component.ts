import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import Cropper from 'croppie';
import { utilities } from "../../utilities/utilities";

@Component({
  selector: "app-add-image",
  templateUrl: "./add-image.component.html",
  styleUrls: ["./add-image.component.scss"]
})
export class AddImageComponent implements OnInit {

  public selectedFile: File;
  public url_img_show: any;
  public url: string = "";
  public ImgEdit: string;
  public deleteFille:File;
  public deleteImg:string = "";
  selected:boolean = true;

  imageHeight:number = 400;
  imageWidth:number = 400;


  file:Subject<any> = new Subject<any>();
  cropie;
  isCropperInited:boolean = false;
  fileSizeValid:boolean = true;
  _formDataFile:Blob;


  @Output() result: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteResult: EventEmitter<any> = new EventEmitter<any>();


  @Input() img:string;
  @Input() type: string;
  @Input() editImage: string;
  @Input() cropType: string = 'square';

  constructor() {}

  ngOnInit() {
  
     this.fileChange();

     if(this.type && this.editImage){
        this.ImgEdit = this.editImage;
     }
  }

  get getFile(){
    return {
      file:this._formDataFile,
      originImage:this.selectedFile,
      name: this.selectedFile ? 
            this.selectedFile.name : undefined,
      _fileFormData:this._formDataFile
    }
  }

  ngAfterContentInit() {
    if(this.img){
      this.img = '/file/' + this.img;
      setTimeout(
        () => {
          this.cropperInit();
          this.cropier();
        }
      )
    }
    
  }

  cropperInit(){
    let el = document.getElementById('image-context');

    this.cropie = new Cropper(el , {
      viewport:{width:200 , height:200 , type: this.cropType},
      boundary:{height:300},
      showZoomer:true,
      enableOrientation:true,
      // enableResize:true,
    });

    this.isCropperInited = true;

    el.addEventListener('update' , () => {      
      this.cropie.result('blob').then(
        (e) => {
           this._formDataFile = e;
           
        }
      )
    })
 
    
  }

  fileChange(){
    this.file
        .subscribe(
          (data) => {
            
            if(!this.isCropperInited){
              this.cropperInit();
            }
            this.img = data;
            this.cropier();
          },
          (err) => {}
          
        )
  }
  

  cropier(){
    this.cropie.bind({
      url:this.img,
      orientation:1
    });
  }

  clearAll(){
    this.img = '';
    this.isCropperInited = false;
    this.cropie.destroy();
    this.selectedFile = null;
  }

  rotate(){
    this.cropie.rotate(90);
  }

  onSelectFile(event) { 
  
    //if add
    event.preventDefault();
    this.selectedFile = event.target.files[0];
    let reader = new FileReader();

    if(utilities.bytesToMB(this.selectedFile.size) < 5){
      this.fileSizeValid = true;
      reader.onload = (event: any) => {
        this.img = event.target.result;
        this.file.next(event.target.result);
      };
    
      reader.readAsDataURL(event.target.files[0]);
    } else { this.fileSizeValid = false; }
  }

  deleteImage() {
      this.img = "";
      this.isCropperInited = false;
      this.cropie.destroy();
      this.selectedFile = undefined;
      this._formDataFile = undefined;
  }


  }


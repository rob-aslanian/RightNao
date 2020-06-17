import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdsCreateService } from '../ads-create.service';

@Component({
  selector: 'app-ads-create-image',
  templateUrl: './ads-create-image.component.html',
  styleUrls: ['./ads-create-image.component.scss']
})
export class AdsCreateImageComponent implements OnInit {
  
  @Input() view:string = 'box';
  @Input () i:number = 0;

  @Output() onSrc:EventEmitter<any> = new EventEmitter<any>();
  @Output() removeImage:EventEmitter<any> = new EventEmitter<any>();
  @Output() carouselSrc:EventEmitter<any> = new EventEmitter<any>();
  @Output() removeCarouselSrc:EventEmitter<any> = new EventEmitter<any>();

  file;
  src;
  srcForModal;


  constructor(
    private domSanitazor:DomSanitizer,
    private adCreateService: AdsCreateService
  ) {}

  ngOnInit() {}


  uploadFile(e) {
    const file: any = e.target.files[0];
    if( !file.type.startsWith('image') ) {
      return;
    }
    const filePreview = URL.createObjectURL(file);
    const src = this.domSanitazor.bypassSecurityTrustUrl(filePreview);
    let input = {
      file: src,
      blob: file
   };
   this.src = src;
   this.onSrc.emit(this.src);
   this.carouselSrc.emit({
     src: this.src,
     index: this.i
   })
   this.adCreateService.files.push(input)
  }

  removeFile() {
    this.src = '';
    // this.adCreateService.files = [];
    this.removeImage.emit();
    this.removeCarouselSrc.emit({
      src: this.src,
      index: this.i
    })
  }
  openModal(){
    this.srcForModal = this.src;
  }
  closeModal(){
    this.srcForModal = '';
  }

}

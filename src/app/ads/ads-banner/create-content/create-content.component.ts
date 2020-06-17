import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddImageComponent } from 'src/app/_shared/components/add-image/add-image.component';
import { AdsService } from 'src/app/_shared/services/ads/ads.service';
import { IAdsContent } from 'src/app/_shared/models/ads';
import { AdsBannerService } from '../ads-banner.service';

@Component({
  selector: 'app-create-content',
  templateUrl: './create-content.component.html',
  styleUrls: ['./create-content.component.scss']
})
export class CreateContentComponent implements OnInit {
  
  @ViewChild(AddImageComponent, { static: false }) image:AddImageComponent;

  @Output() result:EventEmitter<IAdsContent> = new EventEmitter<IAdsContent>();

  @Input() isResponsive:boolean = true;
  
  contentForm:FormGroup;
  submited:boolean = false;
  isGallery:boolean = false;
  imgSrc:string;


  constructor(
    private f:FormBuilder,
    private adsService:AdsService,
    private adsBannerService:AdsBannerService
  ) { 
    this.contentForm = f.group({
      title:['' , Validators.required],
      description:['' , Validators.required],
    })
  }

  get form(){
    return this.contentForm.controls;
  }


  ngOnInit() {
  
  }

  submit(){
    let form = this.contentForm;
    this.submited = true;

    if((form.valid && this.isResponsive) || !this.isResponsive){
       this.uploadImageAndEmit();
    }
  }

  uploadImageAndEmit(){
    let formValues = this.contentForm.value,

        formData = new FormData();
        formData.append('file' , this.image.getFile._fileFormData);
    

    this.adsService
        .createContent(formData)
        .subscribe(
          (data) => {
             this.result.emit({
               ...formValues,
               file_id:data['id'],
               _image:`/file/${data['url']}`
               
             })
            
          }
        )
  }

  getImage(image){
    this.isGallery = false;
    this.adsBannerService.modal.title = 'Create content';
    this.adsBannerService.modal.width = 597;

    if(image) { this.imgSrc = image.address; } 
    
  }

}

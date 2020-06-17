import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidation } from 'src/app/_shared/register.validator';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { AdsService } from 'src/app/_shared/services/ads/ads.service';

@Injectable({
  providedIn: 'root'
})
export class AdsCreateService {
  adsContentFormValid:boolean = false;
  adsContent:BehaviorSubject<any> = new BehaviorSubject<any>({});
  adsContentForm:FormGroup;
  files = [];
  activeFormat = '';
  campaign_id = '';
  carouselContent = [];

  constructor(
    private fb:FormBuilder,
    private imageUploadService:ImageUploadService,
    private adsService: AdsService
  ) { 
    this.adsContentForm = this.fb.group({
      name: ['', Validators.compose([Validators.required])],
      url: ['', Validators.compose([Validators.required, PasswordValidation.detectURL])],
      description: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
      line: ['', Validators.compose([Validators.required])],
      image: ['', Validators.required]
    })
  }

  responsiveAdd() {
    let controls = this.adsContentForm.controls;
    return {
      id: undefined,
      name: controls.name.value,
      url: controls.url.value,
      type: this.adsService.input.type,
      content: {
        headline: controls.line ? controls.line.value : '',
        description: controls.description ? controls.description.value : '',
        custom_button: controls.btn ? controls.btn.value : '',
        url: controls.url.value
      }
    }
  }

  carouselAdd() {
    let content = this.adsContentForm.get('cards').value.map((elem) => {
      return {
        headline: elem['headline'],
        description: '',
        custom_button: '',
        url: elem['url']
      }
    });
    
    let controls = this.adsContentForm.controls;
    return {
      id: undefined,
      name: controls.name.value,
      type: this.adsService.input.type,
      url: '',
      content: content
    }
  }


  



  uploadFilesToDb( id: string ) {

    const formData = new FormData();

    this.files.map( file => formData.append( 'file', file.blob  ) );

    return this.imageUploadService.uploadAdvertImage(formData, id)


 }
  
}

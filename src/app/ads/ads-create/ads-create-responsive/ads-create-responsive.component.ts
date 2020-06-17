import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { buttonText } from '../model';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AdsCreateService } from '../ads-create.service';

@Component({
  selector: 'app-ads-create-responsive',
  templateUrl: './ads-create-responsive.component.html',
  styleUrls: ['./ads-create-responsive.component.scss']
})
export class AdsCreateResponsiveComponent implements OnInit, OnDestroy {

  destroy$:Subject<any> = new Subject<any>();

  responsiveForm: FormGroup;
  formType:string = '';

  content;

  buttons:string [] = buttonText;

  constructor(
    private domSanitazor: DomSanitizer,
    private fb:FormBuilder,
    private activeRout: ActivatedRoute,
    private adsCreateService:AdsCreateService
  ) {
    // this.responsiveForm = this.fb.group({
    //   description: ['', Validators.compose([Validators.required, Validators.maxLength(100)])],
    //   line: ['', Validators.required],
    //   image: ['']
    // }) 
    
   }

  ngOnInit() {

    this.responsiveForm = this.adsCreateService.adsContentForm;
    // this.adsCreateService.activeFormat = this.activeRout.snapshot.data['type'];
    this.formType = this.adsCreateService.activeFormat;
    console.log(this.formType);
    


    if(this.formType=='spotlight'  || this.formType=='single_image') {
      this.responsiveForm.addControl('btn', this.fb.control('', Validators.required));
    }
    if(this.formType == 'image') {
      this.responsiveForm.removeControl('description');
      this.responsiveForm.removeControl('line');
    }

    this.responsiveForm.valueChanges
                      .pipe(
                        takeUntil(this.destroy$),
                        debounceTime(200),
                        distinctUntilChanged()
                        )
                      .subscribe( (data) => { 
                        this.adsCreateService.adsContentFormValid = this.responsiveForm.valid;
                        this.adsCreateService.adsContent.next(data);
                       })
  }

  get respForm(){
    return this.responsiveForm.controls;
  }
  addImage(e) {
    this.responsiveForm.get('image').setValue(e);
  }
  removeImage() {
    this.adsCreateService.files = [];
    this.responsiveForm.get('image').setValue('');
  }
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

}

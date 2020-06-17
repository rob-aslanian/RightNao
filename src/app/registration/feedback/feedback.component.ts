import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import Emojies from 'src/app/_shared/models/emojies-model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistrationService } from '../services/registration.service';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import {  delay, switchMap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageUploadService } from 'src/app/_shared/services/shared/image-upload.service';
import { Observable, merge } from 'rxjs';


@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})

export class FeedbackComponent implements OnInit {

  @ViewChild( AppModalComponent, { static: true } ) _modal: AppModalComponent; 

  emojies = Emojies; 
  feedbackForm: FormGroup;
  selectedId: string = '';
  submitedForm: boolean = false;

  bugs: any[] = [];

  suggestions: any[] = [];


  constructor(
    private fb: FormBuilder,
    private registerService: RegistrationService,
    private router: Router,
    private globalUserService: GlobalUserProService,
    private domSanitazor: DomSanitizer,
    private imgUploadService: ImageUploadService
  ) {
    this.feedbackForm = fb.group({
                            reaction: ['', Validators.required],
                            compliment: fb.group({
                                favorite_features: [''],
                                improve_experience: [''],
                                services_to_have: ['']
                            }),
                            complaint: fb.group({
                                missing_or_wrong: [''],
                                improve_experience: [''],
                                tell_us_more: ['']
                          }),
                            bugs: [''],
                            could_not_find: [''],
                            suggestion: fb.group({
                                  idea: [''],
                                  proposal: ['']
                            }),
                            other: fb.group({
                                  subject: [''],
                                  description: ['']
                            })
                        })
    }

  ngOnInit() {
 
      
  }

  trackByFn =  (index) => index;


  beforeChange( e: NgbPanelChangeEvent) {   
     
     if( e.panelId === 'ngb-panel-0' ) {
       return   e.preventDefault();
     }

    return this.selectedId = e.nextState ?  e.panelId : '';
  }
 


  submitForm() {

    let companyId: ( string | undefined ) = undefined;

    this.globalUserService.isCompanyActive() 
     ? companyId = this.globalUserService.getComapnyId()
      : companyId = undefined;
         
    

    const input = this.feedbackForm.value;

    if( !this.feedbackForm.valid ) return this.submitedForm = true ;

    this._modal.open();
    this._modal.title = 'Thank you';

    this.registerService
     .submitFeedBack({
        ...input,
        companyId
     })
     .pipe(
       map( ({ data }) => data['SubmitFeedback']['id'] ),
       switchMap( ( id ) => this.uploadFilesToDb( id ) ),
       delay(1500),
     )
      .subscribe( data => {
          this._modal.close();
          this.router.navigate(['/landing'])
      } )
    
  }


  uploadFile( e,  type: string ) {

      
      const file: Blob = e.target['files'][0];    
      
      const filePreview = URL.createObjectURL(file);
  
      if( !file ) return;

      // Validations for images
      if( type === 'bugs' && !file.type.startsWith('image') ) return;

      // Validations for files
      if( type === 'suggestions' && 
          !file.type.startsWith('application') || 
          (this.suggestions.length >= 1 && type === 'suggestions' ) ) return;
      
      const src = type === 'bugs' ? 
                  this.domSanitazor.bypassSecurityTrustUrl(filePreview) : 
                  'assets/img/144.svg'

      let input = {
         file: src,
         blob: file
      };

      type === 'bugs' ? this.bugs.push( input ) : this.suggestions.push( input );
  
      
  }

  deleteFile( idx: number, type: string ) {
    type === 'bugs' ?
       this.bugs.splice( idx, 1 ) : 
         this.suggestions.splice( idx, 1 )

  }

  uploadFilesToDb( id: string ): Observable<any>  {

     const formDataBugs = new FormData();

     this.bugs.map( bug => formDataBugs.append( 'file', bug.blob  ) );

     const formDataSuggest = new FormData();

     this.suggestions.map( file => formDataSuggest.append( 'file', file.blob  ) );


     return  merge(
          this.imgUploadService.uploadFilesFeedback( id, formDataBugs, 'feedback_bugs' ),
          this.imgUploadService.uploadFilesFeedback( id, formDataSuggest, 'feedback_suggestion' )
     )

  }
}

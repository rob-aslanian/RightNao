import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit , OnDestroy {

  destroy$:Subject<any> = new Subject<any>();

  feedbackForm:FormGroup;
  submited:boolean = false;
  utils = utilities;
  isSend:boolean = false;


  constructor(
    private f:FormBuilder,
    private utilService:UtilsService
  ) { 
    this.feedbackForm = f.group({
      name:['' , Validators.required],
      email:['' , Validators.compose([Validators.required , Validators.email])],
      message:['' , Validators.required],

    })
  }

  get form() {
    return this.feedbackForm.controls
  }

  ngOnInit() {
  }

  submit(){
     this.submited = true;

     let form = this.feedbackForm;

     if(form.valid){
        this.utilService
            .saveFeedback(form.value)
            .pipe(takeUntil(this.destroy$))
            .subscribe(
              (data) => {
                this.submited = false;
                this.isSend = true;
              },
              (err) => {
                this.isSend = false;
               
              },
              () => this.submited = false
            )
     }

     
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

}

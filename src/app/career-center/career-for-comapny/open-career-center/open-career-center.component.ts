import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidation } from 'src/app/_shared/register.validator';
import { CareerBtnTitles } from '../../models/career-center.model';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { CareerCenterService } from '../../career-center.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-open-career-center',
  templateUrl: './open-career-center.component.html',
  styleUrls: ['./open-career-center.component.scss']
})
export class OpenCareerCenterComponent implements OnInit , OnDestroy {

  destroy$:Subject<any> = new Subject<any>();
  customBtnTexts = CareerBtnTitles;
  careerForm:FormGroup;
  
  isSubmit:boolean = false;
  timer;

  constructor(
    private f: FormBuilder,
    private globalService:GlobalUserProService,
    private careerService:CareerCenterService,
    private router:Router,
  ) { 
    this.careerForm = f.group({
       title:['' , Validators.required],
       description:['' , Validators.required],
       cv_button_enabled:[false],
       custom_button:f.group({
         enabled:[false],
         title:['Fill form'],
         url:['' , PasswordValidation.detectURL()]
       })
    })
  }

  get cf() {
    return this.careerForm.controls;
  }

  get customBtnForm() {
    return this.cf.custom_button;
  }

  ngOnInit() {
    this.parseData();
  }

  parseData(){
     const profile = history.state['profile'] || 
                     this.globalService.getCompanyCareerCenter();

     if(profile) {
         this.careerForm
             .patchValue({
                title:profile.title,
                description:profile.description,
                cv_button_enabled:profile.cv_button_enabled,
                custom_button:{
                  enabled:profile.custom_button_enabled,
                  title:profile.custom_button_title,
                  url:profile.custom_button_url
                }
             })
     }
  }

  submit(){
    this.isSubmit = true;

    if(this.careerForm.valid) {
      const formValue = this.careerForm.value,
            { custom_button }  = formValue;

       this.careerService
           .openCareerCenter(formValue)
           .pipe(takeUntil(this.destroy$))
           .subscribe(() => {      
               this.globalService
                   .updateCompanyProfile({
                     career_center:{
                       ...formValue,
                       custom_button_enabled:custom_button.enabled,
                       custom_button_url:custom_button.url,
                       custom_button_title:custom_button.title,
                     }
                    })

             this.timer = setTimeout(() => this.router.navigateByUrl('/career_center/company') , 500)
           })
    }
    
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    clearTimeout(this.timer);
    
  }

}

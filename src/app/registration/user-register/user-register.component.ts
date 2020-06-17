import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { PasswordValidation } from '../../_shared/register.validator';


import { CookieService } from 'ngx-cookie-service';

import { Router, ActivatedRoute } from '@angular/router';
import { GlobalUserProService } from '../../_shared/services/global-user-pro.service';
import {MONTHS,Years , Days} from '../../_shared/models/date.model'
import { graphqlUserProfile } from 'src/app/_shared/graphql/user-profile';
import { isCorrectDate } from 'src/app/_shared/dateValidation';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { Observable, Subject } from 'rxjs';
import { RegionService } from 'src/app/_shared/region.service';
import { UtilsService } from 'src/app/_shared/services/shared/utils.service';
import { takeUntil } from 'rxjs/operators';
import { RegistrationService } from '../services/registration.service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss', '../../_shared/css/registration_shared_styles.scss']
})

export class UserRegisterComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;

  destroy$:Subject<any> = new Subject<any>();
  registerForm: FormGroup;
  countries:Observable<any>;
  years_arr = [];
  submitted = false;
  remember: any;
  tokenUser: any;
  yearNow:any;
  firstName: String = "";
  lastname: String = "";
  email: String = "";
  spaceExistRex = /^[\w.]+$/;
  yearsNowNumber:Number;
  // Error_message = null;
  userNameExist:boolean = false;
  emailExist:boolean = false;
  upTo;
  type: string = 'user';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieService: CookieService,
    private globalUserProfileService: GlobalUserProService,
    private region: RegionService,
    private utilService: UtilsService,
    private registerService: RegistrationService
  ) {
    this.registerForm = this.formBuilder.group({

      gender: ['', Validators.required],
      firstname: [null, Validators.compose([Validators.required , PasswordValidation.detectAnySymbols()])],
      lastname: [null, Validators.compose([Validators.required , PasswordValidation.detectAnySymbols()])],
      email: [null, Validators.compose([Validators.required , PasswordValidation.detectEmail()])],
      username:['',Validators.compose([Validators.required , 
                   Validators.pattern(this.spaceExistRex),
                   Validators.maxLength(30),
                   Validators.minLength(6)])],
      password: ['',  Validators.compose([
                      Validators.required, 
                      PasswordValidation.detectUppercase(), 
                      PasswordValidation.detectNumber(), 
                      PasswordValidation.detectLength(7), 
                      // PasswordValidation.detectSymbols(), 
                      // PasswordValidation.detectInitials()
      ])],
      country: [''],
      day: ['', [Validators.required]],
      month: ['', [Validators.required]],
      year: ['', [Validators.required]],
    });

    this.type = registerService.profileType || 'user';
   }

  days = Days;
  Months =  MONTHS;
  viewValidator = false;
  viewUserNameValidator:boolean = false;
  showModal:boolean = false;

  hide = true;

  ngOnInit() {

    this.countries = this.region.Countries;

    this.remember = this.cookieService.get('remember');
    this.tokenUser = this.cookieService.get('token_user');
    if (this.remember == "true" || this.tokenUser) {

      //redirect user directly to user profile
      this.router.navigate(['user/profile/' + this.globalUserProfileService.getUserId()]);

    }

      this.yearNow = new Date();

      this.yearsNowNumber =  this.yearNow.getFullYear();
      this.years_arr = Years;
      this.upTo = this.years_arr.filter(now => now + 13 <= this.yearsNowNumber);  
  
    // this.registerForm.get('firstname')
    //     .valueChanges
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe((value) => {

    //       this.firstName = value;
          
    //       this.f['password'].updateValueAndValidity();
          
    //     });

    // this.registerForm.get('lastname')
    //     .valueChanges
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe((value) => {
    //       this.lastname = value;
    //       this.f['password'].updateValueAndValidity();
    //     });

    
    this.registerForm.get('username')
        .valueChanges
        .pipe(takeUntil(this.destroy$))
        .subscribe((value) => {

              this.userNameExist = false;
              if(this.registerForm.get('username').valid){
                  this.utilService
                      .checkUserName(value)
                      .pipe(takeUntil(this.destroy$))
                      .subscribe(
                        (data) => this.userNameExist = data['checkUsername']
                      )
              }
            
          })

    // this.registerForm.get('email')
    //     .valueChanges
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe((value) => {
    //       this.email = value;
    //       this.Error_message = null;
    //       this.f['password'].updateValueAndValidity();
    //     });

  }
  


  get f() : any { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true
    let   day = this.f.day.value,
          month = this.f.month.value,
          year = this.f.year.value;
    // stop here if form is invalid
    if (this.registerForm.valid &&  isCorrectDate({year , month , day} , this.registerForm) && !this.userNameExist) {
        this.showModal = true;
        this.modal.open();
        this.modal.title = 'Terms';
    }else return;
  } //end of submit


  register(){

    let {  day , month , year  } = this.registerForm.value;

    
    this.modal.close();

    this.utilService
        .RegisterUser({
          ...this.registerForm.value,
          birthday: `${day}-${month}-${year}`,
          invited_by: this.globalUserProfileService.getInviterID,
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe(
          (data) => { 

             // Remove inviter id 
             if( this.globalUserProfileService.getInviterID ) {
                     this.globalUserProfileService.removeInviterID();
             }

             this.router.navigate(['/registration/activation' , data['id'] ]);
             this.globalUserProfileService.removeInviterID();
          },
          (err) => { 
            let message:string = err.message;
          
            if(message) {
               this.userNameExist =  message.endsWith("this_username_already_in_use");
               this.emailExist    =  message.endsWith('this_email_already_in_use');
              
            }
            
          }
        )
  }


  ngOnDestroy() {
     this.destroy$.next();
     this.destroy$.complete();

  }

}




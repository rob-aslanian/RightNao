import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient,HttpErrorResponse  } from "@angular/common/http";

import { Apollo } from 'apollo-angular';

import gql from 'graphql-tag';
import { Router, ActivatedRoute } from '@angular/router';

import { PasswordValidation } from '../../_shared/register.validator';
import { GlobalUserProService } from '../../_shared/services/global-user-pro.service';

const RecoverPassword = gql`

mutation ($recoveryRequest:RecoveryRequestInput!){
  RecoverPassword(recoveryRequest: $recoveryRequest){
    success
  } 
  }
`;

@Component({
  selector: 'app-user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: ['./user-reset-password.component.scss','../../_shared/css/registration_shared_styles.scss']
})
export class UserResetPasswordComponent implements OnInit {

  subscribe: any;
  passwordRecovery: FormGroup;
  submitted = false; 
  viewValidator:boolean = false;
  viewValidatorConfirm:boolean = false;
  globaluserservice: GlobalUserProService
  
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private apollo: Apollo,
    private router: Router,
    private activeRoute: ActivatedRoute
) { }

hide = true;
error_server= "";


ngOnInit() {
  
  this.passwordRecovery = this.formBuilder.group({

    password: ['', [Validators.required,
                    PasswordValidation.detectLength(8), 
                    PasswordValidation.detectUppercase(), 
                    PasswordValidation.detectNumber(), 
                    PasswordValidation.detectSymbols() ]],
    confirmPassword: ['', [Validators.required] ],

  },{ validator: PasswordValidation.MatchPassword } );

  const queryParams = this.activeRoute.snapshot.queryParams


  this.passwordRecovery.get('confirmPassword').valueChanges.subscribe(value => {
    let pass = this.passwordRecovery.get('password');
    if(pass.invalid && pass.value != value){
      this.passwordRecovery.get('confirmPassword').setErrors({'wrong': true});
    }else{
      this.passwordRecovery.get('confirmPassword').clearValidators();
    }
  });

}

get f() { return this.passwordRecovery.controls; }

onSubmit() {

  
  this.submitted = true;

  
  // stop here if form is invalid
  if (this.passwordRecovery.invalid) {
    return;
  }

  let password = this.f.password.value;
  const queryParams = this.activeRoute.snapshot.queryParams
  let code = queryParams.token;
  let id = queryParams.user_id;

  let  input= {
    "code": code,
    "password": password,
    "id": id
  };


  this.apollo.mutate({
    mutation: RecoverPassword,
    variables: {
      recoveryRequest: {
        "code": code,
        "password": password,
        "id": id
      }
      
    }
  }).subscribe(({ data }) => {
    //let data_json = JSON.parse(data);
    //console.log(data_json);
    if(data.RecoverPassword.success ==true){
      this.router.navigate(['registration/login']);
    }
    // else if(data.Login.status !="not_activated"){

    // }
    
  },(error) => {
    console.log('there was an error sending the query', error);
    
    // if(error.type="AuthError"){
    //   this.error_server = "Wrong Login or Password.";
    // }
    this.error_server = "Unknown user";

  });


}


}



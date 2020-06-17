import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient  } from "@angular/common/http";

import { Apollo } from 'apollo-angular';

import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { PasswordValidation } from 'src/app/_shared/register.validator';

const SendRecoverRequest = gql`

  mutation ($login: String!, $methods: RecoverMethods!){
    SendRecoverRequest(login:$login, methods: $methods){
      success
    }
      
  }

`;

@Component({
  selector: 'app-user-forget-password',
  templateUrl: './user-forget-password.component.html',
  styleUrls: ['./user-forget-password.component.scss','../../_shared/css/registration_shared_styles.scss']
})

export class UserForgetPasswordComponent implements OnInit {

  forgetpasswordForm: FormGroup;
  submitted = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private httpClient: HttpClient,
    private apollo: Apollo,
    private router: Router
  ) { }

  error_server:any= "";
  sucess_msg:any = "";
  ngOnInit() {

    this.forgetpasswordForm = this.formBuilder.group({
        recoverType:['username'], 
        email: ['', [Validators.required, PasswordValidation.detectEmail()]]
    });

  }

  get f() { return this.forgetpasswordForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgetpasswordForm.invalid) {
      return;
    }

    let email = this.f.email.value,
        recoverType = this.f.recoverType.value;

    let  input= {
      "login": email,
      "methods": {
        "by_SMS": false,
        "by_email":  true,
        "send_username": recoverType === 'username' || 
                         recoverType === 'all' ? true : false,
        "reset_password":recoverType === 'password' || 
                         recoverType === 'all' ? true : false,
      }
    };


    this.apollo.mutate({
      mutation: SendRecoverRequest,
      variables: input
    }).subscribe(({ data }) => {

      if(data.SendRecoverRequest.success == true){
        //this.router.navigate(['user/PasswordRecovery']);
        this.sucess_msg = "We have sent mail, Please check your email.";
        this.error_server = "";
      }

      
    },(error) => {
      console.log(error);
      
      if(error.type="NotFountError"){
        this.error_server = "User not found.";
        this.sucess_msg = "";
      }

    }
    );


  }

}











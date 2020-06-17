import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrationRoutingModule } from './registration-routing.module';
import { RegistrationComponent } from './registration.component';
import { SharedUnloginHeaderComponent } from './shared/shared-unlogin-header/shared-unlogin-header.component';
import { RegistrationMainComponent } from './registration-main/registration-main.component';
import { TranslateModule } from '@ngx-translate/core';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserAgreeModalComponent } from './user-register/user-agree-modal/user-agree-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../_shared/shared.module';
import { WelcomeComponent } from './welcome/welcome.component';
import { UserLoginPageComponent } from './user-login-page/user-login-page.component';
import { UserLoginComponent } from './shared/user-login/user-login.component';
import { SavedUsersComponent } from './shared/user-login/saved-users/saved-users.component';
import { UserForgetPasswordComponent } from './user-forget-password/user-forget-password.component';
import { UserResetPasswordComponent } from './user-reset-password/user-reset-password.component';
import { UserActivationComponent } from './user-activation/user-activation.component';
import { CompanyRegistrationComponent } from './shared/company-registration/company-registration.component';
import { NgbTypeaheadModule, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { CompanyRegisterPageComponent } from './company-register-page/company-register-page.component';
import { CompanyLoginPageComponent } from './company-login-page/company-login-page.component';
import { RegisterGroupsComponent } from './register-groups/register-groups.component';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  declarations: [
    RegistrationComponent,
    SharedUnloginHeaderComponent,
    RegistrationMainComponent,
    UserRegisterComponent,
    UserAgreeModalComponent,
    UserLoginComponent,
    SavedUsersComponent,
    WelcomeComponent,
    UserLoginPageComponent,
    UserForgetPasswordComponent,
    UserResetPasswordComponent,
    UserActivationComponent,
    CompanyRegistrationComponent,
    CompanyRegisterPageComponent,
    CompanyLoginPageComponent,
    RegisterGroupsComponent,
    FeedbackComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FormsModule,
    NgbTypeaheadModule,
    ReactiveFormsModule,
    RegistrationRoutingModule,
    NgbAccordionModule
  ]
})
export class RegistrationModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration.component';
import { RegistrationMainComponent } from './registration-main/registration-main.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginPageComponent } from './user-login-page/user-login-page.component';
import { UserForgetPasswordComponent } from './user-forget-password/user-forget-password.component';
import { CompanyRegisterPageComponent } from './company-register-page/company-register-page.component';
import { CompanyRegistrationComponent } from './shared/company-registration/company-registration.component';
import { CompanyLoginPageComponent } from './company-login-page/company-login-page.component';
import { CheckAuthorizeGuard } from '../_shared/guards/check-authorize.guard';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterGroupsComponent } from './register-groups/register-groups.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { UserResetPasswordComponent } from './user-reset-password/user-reset-password.component';


const routes: Routes = [
  { path:"" , component:RegistrationComponent , children:[
    { path:"" , component:RegistrationMainComponent },
    { path:'activation/:id' , component:WelcomeComponent },
    /// User 
    { path:"user" , component:UserRegisterComponent },
    { path:'login' , component:UserLoginPageComponent },
    { path:'forget_password' , component:UserForgetPasswordComponent },
    { path: 'PasswordRecovery', component: UserResetPasswordComponent },

    /// Company 
    { path:"company_sign_in" , component:CompanyRegisterPageComponent  },
    { path:"company" , component:CompanyRegistrationComponent , canActivate:[CheckAuthorizeGuard]  },
    { path:'login_company' , component:CompanyLoginPageComponent , canActivate:[CheckAuthorizeGuard] },
  
    //Group
    { path: 'groups', component: RegisterGroupsComponent, canActivate:[CheckAuthorizeGuard] },
    //  { path:"proffesional" },
    //  { path:"organization" },
    
    { path: 'feedback' , component: FeedbackComponent, canActivate: [CheckAuthorizeGuard]}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }

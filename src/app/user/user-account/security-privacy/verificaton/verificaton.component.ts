import { Component, OnInit, Output, EventEmitter,OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserAccountService } from 'src/app/_shared/services/user/user-account.service';
import { IVerification } from '../../models/interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserProfileService } from 'src/app/_shared/services/user/user-profile.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';



@Component({
  selector: 'app-verificaton',
  templateUrl: './verificaton.component.html',
  styleUrls: ['./verificaton.component.scss']
})

export class VerificatonComponent implements OnInit,OnDestroy {
  
  $destroy:Subject<any> = new Subject<any>()

 @Output() result:EventEmitter<boolean> = new EventEmitter<boolean>();
 @Input() isRemove = false;

 verficationForm:FormGroup
 verifcation
 submitedVerifcation: boolean;
 verificationData:IVerification


  constructor(
         private fb:FormBuilder,
         private userAcountService:UserAccountService,
         private globalUserProService:GlobalUserProService

  ) { 
     this.verficationForm = this.fb.group({
           verificationCode:['',Validators.required]

     })

  }

  ngOnInit() {    
    if(!this.isRemove){
      this.userAcountService
      .twoFARespone()
      .pipe(takeUntil(this.$destroy))
      .subscribe(({data}) => {
        this.verificationData = data['Init2FA']        
      } )
  

    }

  }
  activateVerification(){
    
    this.submitedVerifcation = true;    
      if(this.verficationForm.invalid){          
              return;
      } 

      this.userAcountService
      .Enable2FA(this.verficationForm.get('verificationCode').value)
       .pipe(takeUntil(this.$destroy))
        .subscribe(data => {
          this.result.emit(
             true
          )
        },
        (error) => {
          this.verficationForm.get('verificationCode').setErrors({
            incorrect:true
          })    
        } )
  }

   DeActivate(){

     this.submitedVerifcation = true;
        if(this.verficationForm.invalid){         
          return;
    } 

      this.userAcountService
      .Disable2FA(this.verficationForm.get('verificationCode').value)
      .subscribe(data => {
        this.result.emit(
          false
        )
      },
      (error) => {

        this.verficationForm.get('verificationCode').setErrors({
          incorrect:true
        })    
      } )
   }
  ngOnDestroy(){
    this.$destroy.next()
    this.$destroy.complete();
  }
}

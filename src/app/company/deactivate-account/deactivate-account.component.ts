import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup,FormBuilder, Validators  } from '@angular/forms';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import {CompanyAccountService} from '../../_shared/services/companies/company-account.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-deactivate-account',
  templateUrl: './deactivate-account.component.html',
  styleUrls: ['./deactivate-account.component.scss']
})


 export class DeactivateAccountComponent implements OnInit {

 @Input() deactivate;
 @Input() companyID;

 @ViewChild(AppModalComponent, { static: false })  _modal:AppModalComponent;
 @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();


  formDeactivate:FormGroup
  closedModal: boolean;
  password:string;
  inncorectPassword:boolean;


  constructor(
    private fb:FormBuilder,
    private companySetting:CompanyAccountService,
    private userService:GlobalUserProService,
    private router:Router
  ) {
      this.formDeactivate =  this.fb.group({
        password:['',Validators.required]        
      });
   }

  ngOnInit() {
      
    
   }

  get deactAccount(){
      return this.formDeactivate.controls;
  }

  saveResult(){

      this.deactivate = true;
      this.inncorectPassword = false;
      if(this.deactAccount.invalid){
      }

      this.password  =  this.deactAccount.password.value
      this.formDeactivate.reset();
  }

   deactivateAccount(){
        // this.deactivate = false;
           
           let input = {
              "company_id":this.companyID,
              "password":this.password,
           }

           this.companySetting
               .deactivateCompany(input)
               .subscribe(
                 ({ data }) => {
                   this.closeModal.emit(true);
                   this.router.navigate(['/user/profile/' +  this.userService.getUserId()])
                 }, 
                 (err) => {
                   console.log(err);
                   this.inncorectPassword = true;
                   this.deactivate = false;
                   
                 }
                )  
    }
 }

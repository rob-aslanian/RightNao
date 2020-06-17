import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { graphqlUserAccount } from '../../../_shared/graphql/user-account';
import { GlobalUserProService } from '../../../_shared/services/global-user-pro.service';
import { Router } from '@angular/router';
import { PasswordValidation } from '../../../_shared/register.validator';
import privacies from './privacies';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { UserAccountService } from 'src/app/_shared/services/user/user-account.service';


@Component({
  selector: 'app-security-privacy',
  templateUrl: './security-privacy.component.html',
  styleUrls: ['./security-privacy.component.scss', '../../../_shared/css/account_shared_style.scss']
})
export class SecurityPrivacyComponent implements OnInit {

  @ViewChild('deactivate', { static: true }) deactivate;
  @ViewChild(AppModalComponent, { static: true }) _modal:AppModalComponent 

  state:any = {
    toggle: {
      selected: null,
      active: []
    }
  }
  closeResult: string;
  ngTemplate:any;
  private querySubscription: any;
  privacy: any;
  privacies = privacies;

  //for change password
  changePasswordForm: FormGroup; 
  submittedchangePasswordForm: boolean = false;

  // for check password
  checkPass: FormGroup;
  firstName:String;
  lastname:String;
  email:String;

  MessageError: any;
  MessageSuccess: any;
  viewValidator:boolean = false;
  modalType: string;
  isVerificationActive: any;
  isToggle:boolean = true;
  lastChangedDate: any;

  
  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private modalService: NgbModal,
    private globalUserProfileService: GlobalUserProService,
    private router: Router,
    private userAccountService:UserAccountService
  ) { }

  ngOnInit() {
      this.isVerificationActive = this.globalUserProfileService.getUserProfile().is_2fa_requeried;
 
   
    this.ngTemplate = {
      changePassword: false,
      changeVerification:false,
      changeSession:false
    };

    this.querySubscription = this.apollo.watchQuery({
      query: graphqlUserAccount.getUserPrivacy,
    }).valueChanges.subscribe
    ((data:any) => {
      let privacyData = data.data.getAccount;
      this.firstName = privacyData.firstname;
      this.lastname = privacyData.lastname;
      this.email = privacyData.email.find(item => item.primary).email;
      
      this.lastChangedDate = privacyData.last_change_password;
      
      this.changePasswordForm= this.formBuilder.group({
        oldPassword: ['', Validators.required],
        newPassword: ['',  Validators.compose([
          Validators.required, 
          PasswordValidation.detectUppercase(), 
          PasswordValidation.detectNumber(),
           PasswordValidation.detectLength(7), 
          //  PasswordValidation.detectSymbols()
          ])
        ],
        confirmPassword: ['', Validators.required]
      });

      this.privacy = privacyData.privacy;
      
    });


    this.checkPass = this.formBuilder.group({
      password: ['',Validators.required]
    })

  }

  // toggle function
  myToggle( index ){
    this.state['toggle']['active'][index] = !this.state['toggle']['active'][index];
    if( this.state['toggle']["selected"] != index ){
      this.state['toggle']['active'][this.state['toggle']["selected"]] = false;
    }
    this.state['toggle']["selected"] = index;
  }

  editDropDown(event,body){

    event.target.classList.toggle("active");
    this.ngTemplate[body] = !this.ngTemplate[body];

  }

  addDropDown(event,body){
    event.target.classList.add("d-none");
  }

   /*
  =============================================== 
  shortage for forms names
  =============================================== 
  */

    get passFo() { return this.changePasswordForm.controls; }

   /*
  =============================================== 
  end of shortage for forms names
  =============================================== 
  */

  //change First Name
  changePasswordFun(){
    
    this.submittedchangePasswordForm = true;
    if (this.changePasswordForm.invalid || this.changePasswordForm.get('newPassword').value !== this.changePasswordForm.get('confirmPassword').value) {
      this.MessageSuccess =false;
      this.MessageError = "Password certeria: 1-At least 8 Numbers 2-At Least one Uppercase, At least one number (0-9) 3-At least one special character";
      return;
    }
    this.apollo.mutate({
      mutation: graphqlUserAccount.changePassword,
      variables: 
      {
        "old_password": this.passFo.oldPassword.value,
        "new_password": this.passFo.newPassword.value
      }
    }).subscribe(({ data }) => {
      this.MessageError = false;
      this.MessageSuccess = "Password change successfully";
      //this.modalService.dismissAll();
      //this.ngTemplate.firstName = false;
     
    },(error) => {
      this.changePasswordForm.get('oldPassword').setValue('');
      console.log( error);
       
    });
  }

  // change privacy permissions

  ChangePrivacy(privacy,permission){
    this.apollo.mutate({
      mutation: graphqlUserAccount.ChangePrivacy,
      variables: {
        privacy: privacy,
        permission: permission
      }
    }).subscribe((success:any) => {
        this.myToggle(1);
        this.privacy[privacy] = permission;
      
    });
  }

  checkPassFunc(){
    let value = this.checkPass.get("password").value;
    this.apollo.watchQuery({
      query: graphqlUserAccount.checkPassword,
      variables: {
        password: value
      }
    }).valueChanges.subscribe((data:any) => {
      let success = data.data.checkPassword.success;
      if( success ){
        this.openModal(this.deactivate);
      }
    });
  }

  deactivateAccountFun(){
    let value = this.checkPass.get("password").value;
    
    this.apollo.mutate({
      mutation: graphqlUserAccount.DeactivateUserAccount,
      variables: {
        password: value
      }
    }).subscribe((data:any) => {
      let success = data.data.DeactivateUserAccount.success;
      if(success){
        this.modalService.dismissAll();
        this.globalUserProfileService.signOut();
      }

    });
  }

  openModal(content){
    this.modalService.dismissAll();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
  }

  getDismissReason(reason: any): string {

    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }

  }
  openVerification(){
    
       this.modalType = 'verification';
        this._modal.open();
        this._modal.title = 'Two step verification'
  }

  getVerificationResult(event){
    let user ={
      is_2fa_requeried:event
    }
     this.globalUserProfileService.updateUserProfile(user);
      this._modal.close();      
     this.isVerificationActive =  !this.isVerificationActive
  }
  turnOffVerification(){
    //aq iyo dato
         this._modal.open()
         this._modal.title = 'Two step verification';
         this.modalType = 'removeVerification'
  }
}

import { Component, OnInit } from '@angular/core';
import { NetworkCompanyService } from 'src/app/_shared/services/network/network-company.service';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { utilities } from 'src/app/_shared/utilities/utilities';
import { NetworkService } from 'src/app/_shared/services/filters/network-service.service';
import { NetworkUserService } from 'src/app/_shared/services/network/network-user.service';
import { WalletService } from 'src/app/wallet/shared/wallet.service';

@Component({
  selector: 'app-network-import',
  templateUrl: './network-import.component.html',
  styleUrls: ['./network-import.component.scss'],
  host: {
    class: "netowrk-custom-col"
  }
})
export class NetworkImportComponent implements OnInit {

  importInfo:Observable<any>;

  id:string;
  url:string;
  name:string;
  isCompanyActive: boolean;

  emailControl:FormControl;
  invitedUser:{
    name:string;
  }

  utils = utilities;
  routeNavigate: string = 'network';

  invitationForm: FormGroup;
  submited:boolean = false; 
  
  constructor(

    private networkService:NetworkCompanyService,
    private globalService:GlobalUserProService,
    private networkServiceUser:NetworkUserService,
    private walletService:WalletService,
    private f:FormBuilder

  ) { 
    this.isCompanyActive = globalService.isCompanyActive();
    if( this.isCompanyActive ) {
      // Get Company Info
           this.id = globalService.getCompanyProfile()['id'];
           this.url = globalService.getCompanyProfile()['url'];
           this.name = globalService.getCompanyProfile()['name'];
           this.routeNavigate = '/network-company';
    } else {
     // Get User Info
          this.id = globalService.getUserProfile()['id'];
          this.url = globalService.getUserProfile()['url'];
          this.name = globalService.getUserProfile()['name'];
          this.routeNavigate = '/network';
    }

   
    this.emailControl = new FormControl('' , Validators.compose([Validators.required ,  Validators.email]));

    this.invitationForm = this.f.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      message: ['']
    })
  }

  ngOnInit() {

   if( this.isCompanyActive ) {
   this.importInfo = this.networkService
                         .getNetworkImportInfo(this.url)
                         .pipe(map(({data}) => data['GetCompanyProfile']['network_info'])) /// Get import info for Comapany
    } else {
      //Get info for User
      this.importInfo = this.networkServiceUser
                          .getUserInfo(this.id)
                          .pipe(map( ({data}) => data['getProfileByID']['network_info']) );   

      }      
    }
                         
 

  // old form
  // submit(){
  //   let control = this.emailControl;

  //   if(control.valid){
  //      let email = control.value,
  //          name  = this.name,
  //          id    = this.id;
         
  //   //Import connections for Company
  //     if( this.isCompanyActive )  {
  //     this.networkService
  //         .sentEmailInvitation(email , name , id)
  //         .subscribe(
  //           (data) => {
  //              this.invitedUser = { name:email };
  //              control.reset();
  //              control.setErrors(null);

  //              //adder coins
  //              this.getCoinsForInvitation();
  //           },
  //           (err) => {
  //             control.setErrors({'email_exist':true});
  //           },
  //           () => {}            
  //         )
  //       }
  //   // Import Connections for User
  //     else {
  //       this.networkServiceUser
  //       .SentEmailInvitation(email,name)
  //         .subscribe(data => {
  //               this.invitedUser = { name:email };
  //               control.reset();
  //               control.setErrors(null);

  //               //added coins 
  //               this.getCoinsForInvitation();
                
  //         },
  //             (error) => {              
  //               control.setErrors({'email_exist':true});
  //             }

  //         )
  //     }
  //   }
  // }


  get iv(){
    return this.invitationForm.controls;
  }
  submit() {
    this.submited = true;
    if(this.invitationForm.valid)
    {
      const inviteMessage = {
        name: this.invitationForm.get('name').value,
        email: this.invitationForm.get('email').value,
        message: this.invitationForm.get('message').value,
        silver_coins: 1
      }
      this.invitedUser = { name:inviteMessage['email'] };
      this.walletService.contactInvitationForWallet(inviteMessage)
                        .subscribe ( () => {
                          this.walletService.changindLocalCoins(1);
                        })
      this.invitationForm.reset();
    }
  }


  getCoinsForInvitation() {
    this.walletService.earnCoinsForWallet('invitation', {silver_coins: 1})
                      .subscribe ( (data) => {
                        this.walletService.changindLocalCoins(1);
                      })
  }
}

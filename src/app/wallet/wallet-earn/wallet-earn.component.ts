import { Component, OnInit, ViewChild } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { earnCategories } from './earn.model';
import { Router } from '@angular/router';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
@Component({
  selector: 'app-wallet-earn',
  templateUrl: './wallet-earn.component.html',
  styleUrls: ['./wallet-earn.component.scss']
})
export class WalletEarnComponent implements OnInit {
  [x: string]: any;
 
  @ViewChild( AppModalComponent, { static: true } ) _modal: AppModalComponent;

  earnCategories = earnCategories;
  modalType: string;

  constructor(
    private route: Router,
    private globalService: GlobalUserProService
  ) { }

  ngOnInit() {
  }

  showInviteModal() {
    this.modalType = 'Invite';
    this._modal.title = 'Contact Invitation';
    this._modal.open();
  };
  closeInviteModal() {
    this._modal.close();
  }


  showShareModal () {
    this.modalType = 'share';
    this._modal.title = 'Share';
    this._modal.open();
  }

  showUserRegisterModal () {
    this.modalType = 'registeredUser';
    this._modal.title = 'Registered User';
    this._modal.open();
  }

  showCompanyRegisterModal () {
    this.modalType = 'registeredCompany';
    this._modal.title = 'Registered Company';
    this._modal.open();
  }

  
  test(type: string) {
    switch(type) {
      case 'invite': this.showInviteModal();
      break;
      case 'share': this.showShareModal();
      break;
      case 'registeredUser': this.showUserRegisterModal();
      break;
      case 'registeredCompany': this.showCompanyRegisterModal();
      break;
      case 'Apply for a job': this.route.navigate(['/search/job']);
      break;
      case 'Become a Candidate': this.route.navigate(['/jobs/user/carrer-interest/manage']);
      break;
      case 'Create a Post': this.route.navigate(['/user','profile', this.globalService.getUserId(), 'wall', this.globalService.getUserProfile()['id']]);
      break;
      case 'Complete Profile': this.route.navigate(['/user','profile', this.globalService.getUserId()]);
    }
  }

}

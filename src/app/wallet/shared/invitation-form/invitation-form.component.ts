import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WalletService } from '../wallet.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-invitation-form',
  templateUrl: './invitation-form.component.html',
  styleUrls: ['./invitation-form.component.scss']
})
export class InvitationFormComponent implements OnInit, OnDestroy {

  destroy$:Subject<any> = new Subject<any>();

  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  invitationForm: FormGroup;
  submited:boolean = false; 

  constructor(
    private f: FormBuilder,
    private walletService: WalletService
    ) { 
    this.invitationForm = this.f.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      message: ['']
    })
  }

  ngOnInit() {
    
  }
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
      this.walletService.contactInvitationForWallet(inviteMessage)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe ( () => {
                          this.walletService.changindLocalCoins(1);
                        })
      this.onClose.emit();
    }
  }
  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}

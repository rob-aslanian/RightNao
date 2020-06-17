import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { WalletService } from '../wallet.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-earn-share-modal',
  templateUrl: './earn-share-modal.component.html',
  styleUrls: ['./earn-share-modal.component.scss']
})
export class EarnShareModalComponent implements OnInit, OnDestroy {

  destroy$:Subject<any> = new Subject<any>();

  @Input() modalType: string;

  referalLink:string;
  profileID:string;
  
  constructor(
     private globalUserProfileService: GlobalUserProService,
     private walletService: WalletService 
     ) { }

  ngOnInit() {
    this.profileID = this.globalUserProfileService.getProfileId();
    this.referalLink = `${location.protocol}//${location.host}/registration?invited_id=${this.profileID}`;
  }
  
  copyReferalLink(e){
    e.preventDefault();

    let __textArea = document.createElement('textarea');

    __textArea.style.position = 'fixed';
    __textArea.style.opacity = '0';
    __textArea.style.top = '0';
    __textArea.style.left = '0';
    __textArea.value = this.referalLink;

    document.body.appendChild(__textArea);

    __textArea.focus();
    __textArea.select();

    document.execCommand('copy');

    document.body.removeChild(__textArea);


  }

  EarnCoinsForShare() {
    this.walletService.earnCoinsForWallet('share', {silver_coins: 2})
                      .pipe(takeUntil(this.destroy$))
                      .subscribe ( (data) => {
                      this.walletService.changindLocalCoins(2);
                      })
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

}

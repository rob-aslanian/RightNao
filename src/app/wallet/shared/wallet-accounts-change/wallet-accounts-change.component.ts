import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WalletService } from '../wallet.service';
import { currencies } from '../../wallet-earn/earn.model';

@Component({
  selector: 'app-wallet-accounts-change',
  templateUrl: './wallet-accounts-change.component.html',
  styleUrls: ['./wallet-accounts-change.component.scss']
})
export class WalletAccountsChangeComponent implements OnInit {

  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();

  currencies = currencies;

  accountType: string = 'Gold HyperCoins';
  
  constructor() { }

  ngOnInit() {

  }


  changeAccount (currency: string) {
    let type: string;
    switch (currency) {
      case 'Gold HyperCoins': type = 'gold';
      break;
      case 'Silver HyperCoins': type = 'silver';
      break;
    }
    this.onChange.emit(type);
  }

}

import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-wallet-accounts',
  templateUrl: './wallet-accounts.component.html',
  styleUrls: ['./wallet-accounts.component.scss']
})
export class WalletAccountsComponent implements OnInit {
  coinType: string = 'gold';
  coinTypes: BehaviorSubject<string> = new BehaviorSubject<string>('gold');

  constructor() { }

  ngOnInit() {
  }

  onChange(type: string) {
    this.coinType = type;
    
  }

}

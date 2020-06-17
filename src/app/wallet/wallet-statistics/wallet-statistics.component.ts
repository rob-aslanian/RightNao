import { Component, OnInit } from '@angular/core';
import { currencies } from '../wallet-earn/earn.model';

@Component({
  selector: 'app-wallet-statistics',
  templateUrl: './wallet-statistics.component.html',
  styleUrls: ['./wallet-statistics.component.scss']
})
export class WalletStatisticsComponent implements OnInit {
  currencies = currencies;
  activeCurrency = 'Dollar';

  constructor() { }

  ngOnInit() {
  }

}

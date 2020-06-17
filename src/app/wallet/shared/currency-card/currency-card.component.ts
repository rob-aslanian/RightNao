import { Component, OnInit, Input, } from '@angular/core';
import { WalletService } from '../wallet.service';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {
  @Input() currency;
  silverCoins: number;
  goldCoins: number;
  constructor( 
    private walletService: WalletService
   ) { }

  ngOnInit() {
    this.walletService.coins$.subscribe ((data) => {
      this.silverCoins = data.silverCoins;
      this.goldCoins = data.goldCoins;
    })
  }

}

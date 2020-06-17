import { Component, OnInit } from '@angular/core';
import { WalletService } from '../wallet.service';
import { currencies } from '../../wallet-earn/earn.model';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';

@Component({
  selector: 'app-wallet-counter',
  templateUrl: './wallet-counter.component.html',
  styleUrls: ['./wallet-counter.component.scss']
})
export class WalletCounterComponent implements OnInit {
  coins = {
    goldCoins: 0,
    silverCoins: 0,
    pendingAmount: 0 
  };
  currencies = currencies;


  constructor( 
    private walletService: WalletService,
    private globalService: GlobalUserProService
     ) { }

  ngOnInit() {
    this.walletService.getAccoutWalletAmount()
                      .subscribe(  (  data   ) => { this.walletService.coins$.next({
                                                    goldCoins: data['gold_coins'],
                                                    silverCoins: data['silver_coins'],
                                                    pendingAmount: data['pending_amount'] });
                                                  });
          
          
    this.walletService.coins$
                      .subscribe( (data) => { this.coins = data; 
                                              currencies[0]['amount'] = this.coins['goldCoins'];
                                              currencies[1]['amount'] = this.coins['silverCoins'];
                                            });
      

            
    this.currencies.map( (currency) => currency.accountNumber = `RT${this.globalService.getProfile()['id']}`);


      
            
      }

      


}
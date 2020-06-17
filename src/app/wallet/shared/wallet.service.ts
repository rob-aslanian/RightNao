import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { walletGraphql } from 'src/app/_shared/graphql/wallet/wallet';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {

  constructor( 
    private apollo: Apollo,
    private gloablService:GlobalUserProService,
   ) { }
   


   // Coins
   coins$: BehaviorSubject<any> = new BehaviorSubject<any>({});
   amount: number;
   


   // query



  getAccoutWalletAmount () {
    return this.apollo.watchQuery({
      fetchPolicy:'network-only',
      query: walletGraphql.getAccoutWalletAmount,
      variables: {
        user_id:this.gloablService.getProfile()['id'],
      }
    })
    .valueChanges
    .pipe(map(({data}) => data['GetAccoutWalletAmount']))
  }



  contactInvitationForWallet(wallet_input) {
    return this.apollo.mutate ({
      mutation: walletGraphql.contactInvitationForWallet,
      variables: {
         wallet_input
      }
    })
  }
  

  getWalletTransactions(first: number, after: string, type: string) {
    return this.apollo.query({
      fetchPolicy: 'network-only',
      query: walletGraphql.getWalletTransactions,
      variables: {
        user_id: this.gloablService.getProfile()['id'],
        pagination: {
          first,
          after
        },
        type
      }
    })
    .pipe(map(({data}) => data['GetWalletTransactions']))
  }


  earnCoinsForWallet(actionType, amount) {
    return this.apollo.mutate ({
      mutation: walletGraphql.earnCoinsForWallet,
      variables: {
        user_id: this.gloablService.getProfile()['id'],
        wallet_input: {
          action_type: actionType,
          amount
        }
      }
    })

  }





   // query


  changindLocalCoins(amount:number) {
      let allCoins =  this.coins$.getValue();
      allCoins['pendingAmount'] += amount;
      this.coins$.next(allCoins);
      setTimeout(() => {
        allCoins['pendingAmount'] -= amount;
        allCoins['silverCoins'] += amount;
        this.coins$.next(allCoins);
      }, 30000);
  }

}

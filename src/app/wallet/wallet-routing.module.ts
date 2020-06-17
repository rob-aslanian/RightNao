import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WalletComponent } from './wallet.component';
import { MyWalletComponent } from './my-wallet/my-wallet.component';
import { WalletAccountsComponent } from './wallet-accounts/wallet-accounts.component';
import { WalletStatisticsComponent } from './wallet-statistics/wallet-statistics.component';
import { WalletEarnComponent } from './wallet-earn/wallet-earn.component';
import { WalletTransferComponent } from './wallet-transfer/wallet-transfer.component';


const routes: Routes = [
   { path:"" , component:WalletComponent, children: [
      {path: "", component: MyWalletComponent},
      {path: "accounts", component: WalletAccountsComponent},
      {path: "statistics", component: WalletStatisticsComponent},
      {path: "earn", component: WalletEarnComponent},
      {path: "transfer", component: WalletTransferComponent} 
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WalletRoutingModule { }

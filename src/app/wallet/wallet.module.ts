import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { WalletAccountsComponent } from './wallet-accounts/wallet-accounts.component';
import { WalletStatisticsComponent } from './wallet-statistics/wallet-statistics.component';
import { WalletEarnComponent } from './wallet-earn/wallet-earn.component';
import { WalletTransferComponent } from './wallet-transfer/wallet-transfer.component';
import { MyWalletComponent } from './my-wallet/my-wallet.component';
import { SharedModule } from '../_shared/shared.module';
import { InvitationFormComponent } from './shared/invitation-form/invitation-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TransactionInfoComponent } from './shared/transaction-info/transaction-info.component';
import { CurrencyCardComponent } from './shared/currency-card/currency-card.component';
import { CurrencyInfoComponent } from './shared/currency-info/currency-info.component';
import { EarnShareModalComponent } from './shared/earn-share-modal/earn-share-modal.component';
import { ShareModule } from '@ngx-share/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
// import { WalletCounterComponent } from './shared/wallet-counter/wallet-counter.component';
import { TransactionsHistoryComponent } from './shared/transactions-history/transactions-history.component';
import { WalletAccountsChangeComponent } from './shared/wallet-accounts-change/wallet-accounts-change.component';
import { WalletStatmentComponent } from './shared/wallet-statment/wallet-statment.component';
import { WalletOffersComponent } from './shared/wallet-offers/wallet-offers.component';

@NgModule({
  declarations: [
    WalletComponent, 
    WalletAccountsComponent, 
    WalletStatisticsComponent, 
    WalletEarnComponent, 
    WalletTransferComponent, 
    MyWalletComponent, 
    InvitationFormComponent, 
    TransactionInfoComponent, 
    CurrencyCardComponent, 
    CurrencyInfoComponent, 
    EarnShareModalComponent, 
    // WalletCounterComponent, 
    TransactionsHistoryComponent, 
    WalletAccountsChangeComponent, 
    WalletStatmentComponent, 
    WalletOffersComponent
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    ShareModule,
    NgbModule
  ]
})
export class WalletModule { }

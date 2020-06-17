import { Component, OnInit, ViewChild } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { WalletService } from '../shared/wallet.service';
import { ITransactions, ICurrency } from '../shared/interfaces';
import {  currencies, transactionType, coinTypes } from '../wallet-earn/earn.model';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-my-wallet',
  templateUrl: './my-wallet.component.html',
  styleUrls: ['./my-wallet.component.scss']
})
export class MyWalletComponent implements OnInit {
  @ViewChild( AppModalComponent, { static: true } ) _modal: AppModalComponent;


  after:BehaviorSubject<number> = new BehaviorSubject<number>(12)
  first:number = 12;
  amount:number = 14;
  infinityScroll: boolean = false;


  modalType:string;

  coinTypes = coinTypes;

  currencies = currencies;

  currency = {};

  isLoaded = true;

  transactions: ITransactions[] = [];
  transactionType = transactionType;

  // slider variables
  prevView: string = ''
  prevBtn: boolean = false;
  sliderItems = [];
  sliderItemAmount: number = 4;
  sliderItemFirst: number = 0;
  sliderItemLast: number = this.sliderItemAmount;
  //slider variables


  constructor( 
    private walletService: WalletService 
    ) { }




  ngOnInit() {
    this.after.subscribe ( (after) => {
      if( after+1 < this.amount ) {
        this.isLoaded = true; 
        this.getTransactions(after);
      }
    } )
    
    this.nextSlide();
    
  }



  getTransactions(after) {
    this.walletService.getWalletTransactions(after, '0', 'all')
                      .subscribe((data) => {
                                            this.transactions = data['transitions'];
                                            this.amount = data['transition_amount'];
                                            this.isLoaded = false;

                                            this.transactions.map( (transaction) => {
                                              transaction.transition_at = this.getOfficeCreatedDate(transaction.transition_at)

                                            //added description
                                              transaction.description = ` ${transactionType[transaction['transaction_type']]},
                                                                        received 
                                                                        ${ transaction['wallet_amount'][ coinTypes[ transaction['coin_type'] ] ] }  
                                                                        HPC `
                                              transaction.amount = transaction['wallet_amount'][ coinTypes[ transaction['coin_type'] ] ]; }
                                            )}, 
                      (err) => { this.isLoaded = false },
                      () => { this.isLoaded = false }) 

  }

  transactionInfoModal( transaction ) {
    this.modalType = 'transactionInfo';
    this._modal.open();
  }
  currencyInfoModal(currency) {
    this.modalType = 'currencyInfo';
    this._modal.open();
    this.currency = currency;
  }
  onClose() {
    this._modal.close();
  } 

  getOfficeCreatedDate( date: string ) {
    const dateInMonthAndYears =  date.split(' ')[0].split('-');
    return `${dateInMonthAndYears[1]}/${dateInMonthAndYears[2]}/${dateInMonthAndYears[0]}`
 }


  // scroll(){
  //   if ( this.infinityScroll ) {
  //     console.log('scroll');
    

    
  //     if(this.first + 12 > this.amount){
  //       this.after.next(this.amount - 1);
  //     }
   
  //     if(this.first <= this.amount && this.first + 12 < this.amount){
  //       let next = this.first += 12;
  
  //       this.after.next(next);
  //     } 
  //   } 
  // }

  showMoreTransactions() {
    this.infinityScroll = true;

    if(this.first + 12 > this.amount){
      this.after.next(this.amount - 1);
    }

    if(this.first <= this.amount && this.first + 12 < this.amount){
      let next = this.first += 12;
      this.after.next(next);
    }

  }


  //slider
  nextSlide() {
    this.sliderItems = [];
    
    for(let i = this.sliderItemFirst; i < this.sliderItemLast; i++) {
      if( this.currencies[i] ) {
        this.sliderItems.push( this.currencies[i] );
      }
    }
    if( this.sliderItemLast > this.currencies.length ) {
      this.sliderItemFirst = 0;
      this.sliderItemLast = this.sliderItemAmount;
      this.prevBtn = true;
      this.prevView = 'prevView';
      
    }  else {
      this.sliderItemFirst += this.sliderItemAmount;
      this.sliderItemLast += this.sliderItemAmount;
      this.prevBtn = false;
      this.prevView = '';
    }
  }
  //slider

}

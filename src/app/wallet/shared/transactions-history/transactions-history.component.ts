import { Component, OnInit, ViewChild, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { transactionsCategory, transactionType, coinTypes } from '../../wallet-earn/earn.model';
import { ITransactions } from '../interfaces';
import { WalletService } from '../wallet.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

import * as XLSX from 'xlsx';
import { finalize, takeUntil } from 'rxjs/operators';
type AOA = any[][];

@Component({
  selector: 'app-transactions-history',
  templateUrl: './transactions-history.component.html',
  styleUrls: ['./transactions-history.component.scss']
})
export class TransactionsHistoryComponent implements OnInit , OnChanges, OnDestroy {
  
  destroy$:Subject<any> = new Subject<any>();

  @Input() coinType:string = "all";

  isLoaded: boolean = true;

  printed: boolean = false;

  data: AOA = [];

  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;

  @ViewChild( AppModalComponent, { static: true } ) _modal: AppModalComponent;
  modalType:string;

  categories = transactionsCategory;
  transactions:ITransactions [] = [];
  transactionType = transactionType;
  coinTypes = coinTypes;

  tableType: string = "transactions";

  amount: number;
  after:BehaviorSubject<number> = new BehaviorSubject<number>(0); 
  first:number = 10;
  page:number = 1;

  constructor(
    private walletService: WalletService,
    private calendar:  NgbCalendar
  ) { 
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 0);
   }

  ngOnInit() {
    this.after
    .pipe(takeUntil(this.destroy$))
    .subscribe((after: number) => {
      this.getTransactions(after);
    })
  }

  ngOnChanges(changes:SimpleChanges) {
     if (changes['coinType']){
       this.first = 10;
       this.after.next(0);
       this.page = 1;
        this.getTransactions(this.after.value);
     }
     
  }




  getTransactions(after: number){
      this.walletService
      .getWalletTransactions(this.first, after.toString(), this.coinType)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
                  this.transactions = data['transitions'];
                  this.parseTransasactions(this.transactions);
                  this.amount = data['transition_amount'];
                  this.isLoaded = false;
                  setTimeout(() => {
                    if(this.printed) {
                      window.print();
                      this.printed = false;
                    }
                  }, 200);
                  
      }, (err) => { 
          this.isLoaded = false;
          this.transactions = []; },
          () => { this.isLoaded = false; 
      })
  }

  //Added transaction description
  parseTransasactions(transactions: ITransactions[]) {
      transactions.map( (transaction:ITransactions) => {

        transaction.transition_at = this.getOfficeCreatedDate(transaction.transition_at)

        let TransactionType = transactionType[transaction['transaction_type']];
        let transactionAmount = transaction['wallet_amount'][ coinTypes[ transaction['coin_type'] ] ];
        transaction.description = ` ${ TransactionType }, received ${ transactionAmount } HPC `;
        transaction.amount = transactionAmount;
    } )
  }

  //show or close modal
  transactionInfoModal() {
    this.modalType = 'transactionInfo';
    this._modal.open();
  }
  
  onClose() {
    this._modal.close();
  }

  //pagination
  changePage(e){
    let page = e ===  1 ? 0 : this.first * --e;
    this.after.next(page); 
   }
   
   //print or dowload start

   print () {
     this.first = this.amount;
     this.after.next(0);
     this.printed = true;
   }

   export(){
     this.data = [];
    this.transactions.forEach ((transaction) => {
      
      let transactionItem = [
        transaction['status'],
        transaction['transition_at'],
        transaction['description'],
        transactionType[transaction['transaction_type']],
        transaction['amount']
      ];
      this.data.push(transactionItem);
    })


    const ws:XLSX.WorkSheet = XLSX.utils.aoa_to_sheet([
      ["Status","Date" , "Description" , "Category" , "Amount" ],
      ...this.data
    ]);

    const wb:XLSX.WorkBook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb,ws , 'test');


    XLSX.writeFile(wb , `transactions_${new Date().toDateString()}.xlsx`);
  }

   //print or dowload finish

  //dropDown calendar start

  onDateSelection( date: NgbDate ) {
  if(!this.fromDate && !this.toDate) {
    this.fromDate = date;
    
  } else if ( this.fromDate && !this.toDate && date.after(this.fromDate) ) {
    this.toDate = date;
  } else {
    this.toDate = null;
    this.fromDate = date;
  }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside( date: NgbDate ) {
    return date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange( date: NgbDate ) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

  //dropDown calendar finish

  getOfficeCreatedDate( date: string ) {
    const dateInMonthAndYears =  date.split(' ')[0].split('-');
    return `${dateInMonthAndYears[1]}/${dateInMonthAndYears[2]}/${dateInMonthAndYears[0]}`
 }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }

}

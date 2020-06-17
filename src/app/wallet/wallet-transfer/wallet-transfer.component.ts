import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { currencies } from '../wallet-earn/earn.model';

@Component({
  selector: 'app-wallet-transfer',
  templateUrl: './wallet-transfer.component.html',
  styleUrls: ['./wallet-transfer.component.scss']
})
export class WalletTransferComponent implements OnInit {


  currencies = currencies;
  currency;
  

  transferForm: FormGroup;


  constructor(
    private f: FormBuilder
  ) {
    this.transferForm = this.f.group({
      name: ['', Validators.required],
      amount: ['', Validators.required],
      save: ['']
    })
   }

  ngOnInit() {
  }

  showCard(currency) {
    this.currency=currency;
  }

  submit() {
    console.log(this.transferForm.get('name').value);
    console.log(this.transferForm.get('amount').value);
    console.log(this.transferForm.get('save').value);
    
  }
}

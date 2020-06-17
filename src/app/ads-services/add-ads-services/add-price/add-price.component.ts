import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Price, Currency } from '../../models/models';

@Component({
  selector: 'app-add-price',
  templateUrl: './add-price.component.html',
  styleUrls: ['./add-price.component.scss']
})
export class AddPriceComponent implements OnInit {
  @Input() form:FormGroup;
  priceList = Price;
  currencyList = Currency;

  constructor() { }

  ngOnInit() {
    console.log(this.form.value);
  }

}

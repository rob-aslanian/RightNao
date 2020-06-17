import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { currencies } from '../../wallet-earn/earn.model';

@Component({
  selector: 'app-currency-info',
  templateUrl: './currency-info.component.html',
  styleUrls: ['./currency-info.component.scss']
})
export class CurrencyInfoComponent implements OnInit {
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();
  @Input() currency;

  currencies = currencies;

  constructor() { }

  ngOnInit() {  
  }
  close() {
    this.onClose.emit();
  }
}

import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-total-price',
  templateUrl: './total-price.component.html',
  styleUrls: ['./total-price.component.scss']
})
export class TotalPriceComponent implements OnInit, OnChanges {
  @Input() totalPrice;
  total = 0;

  constructor() { }

  ngOnInit() {
    
  }


  ngOnChanges(changes:SimpleChanges) {
    this.total = 0;
    this.totalPrice.forEach(el => {
      this.total += el['price'];
    });
    
  }



}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { openBox, adsImpressions } from '../model';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-ads-budget-box',
  templateUrl: './ads-budget-box.component.html',
  styleUrls: ['./ads-budget-box.component.scss']
})
export class AdsBudgetBoxComponent implements OnInit {

  form: FormGroup;


  @Input() modelItem;
  @Input() index;
  @Input() boxNumber;
  @Input() allCategory;
  @Input() per:boolean = false;
  @Output() onTotal:EventEmitter<any> = new EventEmitter<any>();
  openBox = openBox;

  impressions = adsImpressions;



  


  constructor(
    private fb:FormBuilder
  ) { 
    this.form = this.fb.group({
      amount: ['']
    })
  }

  ngOnInit() {
    this.form.get('amount')
              .valueChanges
              .subscribe((value)=> {
                if(this.boxNumber==0) value *= 1000;

                this.changePrice(value);
                
              })
  }



  selectBox(categoryIndex:number, boxIndex:number) {
    if(categoryIndex==1) {
      this.openBox[0]['selectedCards']=-1;
      this.allCategory[0].forEach((el)=>{el.active = false})
    }
    if(categoryIndex==0) {
      this.openBox[1]['selectedCards']=-1;
      this.allCategory[1].forEach((el)=>{el.active = false})
    }
    if(this.openBox[categoryIndex]['selectedCards'] == boxIndex) {
      this.openBox[categoryIndex]['selectedCards'] = -1;
      this.allCategory[categoryIndex][boxIndex]['active'] = false;
      // this.total();
      this.onTotal.emit();
      return;
    }
    this.openBox[categoryIndex]['selectedCards'] = boxIndex;
    this.allCategory[categoryIndex].forEach( el =>  el['active'] = false )
    this.allCategory[categoryIndex][boxIndex]['active'] = true;
    this.onTotal.emit();

  }

  plus(e, input) {
    e.preventDefault();
    input.price_per += 1;
    let value = this.form.get('amount').value;
    this.changePrice(value);
  }
  minus(e, input) {
    e.preventDefault();
    if(input.price_per<=1) {
      return
    } 
    input.price_per -= 1;
    let value = this.form.get('amount').value;
    this.changePrice(value);
  }
  changePrice(value) {
    if(this.per) {
      this.modelItem.value.count = value;
      this.modelItem.value.price = this.modelItem.value.count * this.modelItem.price_per;
    } else {
      this.modelItem.value.count = value;
      if(this.boxNumber==0) {
        value =  value / 1000
      }
      this.modelItem.value.price = value * 2;
    }
    this.onTotal.emit();
  }
}

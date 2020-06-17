import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AdsType } from 'src/app/_shared/models/ads';
import { IAdsReview } from 'src/app/_shared/models/ads/shared.interface';

@Component({
  selector: 'app-ads-review-modal',
  templateUrl: './ads-review-modal.component.html',
  styleUrls: ['./ads-review-modal.component.scss']
})
export class AdsReviewModalComponent implements OnInit {


  @Input() type:AdsType;
  @Input() data:IAdsReview;
  @Input() isResponsive:boolean = false;

  @Output() result: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  trackByFn =  (index) => index;
  
  emitData(type:string){
    this.result.emit(type);
  }

}

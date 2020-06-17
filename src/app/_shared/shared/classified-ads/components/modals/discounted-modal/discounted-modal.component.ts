import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-discounted-modal',
  templateUrl: './discounted-modal.component.html',
  styleUrls: ['./discounted-modal.component.scss']
})
export class DiscountedModalComponent implements OnInit {
  @Input() place;
  @Input()annousement;

  constructor() { }

  ngOnInit() {
  }

}

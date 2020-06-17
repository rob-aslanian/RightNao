import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-repeat-modal',
  templateUrl: './repeat-modal.component.html',
  styleUrls: ['./repeat-modal.component.scss']
})
export class RepeatModalComponent implements OnInit {

  @Output() close:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }


}

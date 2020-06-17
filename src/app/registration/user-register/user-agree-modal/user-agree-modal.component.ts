import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-agree-modal',
  templateUrl: './user-agree-modal.component.html',
  styleUrls: ['./user-agree-modal.component.scss']
})
export class UserAgreeModalComponent implements OnInit {


  @Output() agree:EventEmitter<boolean> = new EventEmitter<boolean>()

  read:boolean = false;

  constructor() { }

  ngOnInit() {
  }

}

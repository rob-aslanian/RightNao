import { Component, OnInit, ViewChild } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';

@Component({
  selector: 'app-calendar-left',
  templateUrl: './calendar-left.component.html',
  styleUrls: ['./calendar-left.component.scss']
})
export class CalendarLeftComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: false }) _child: AppModalComponent;
  modalType: string;

  constructor() { }

  ngOnInit() {
  }
  foo() {
      this._child.title = 'Add calendar';
      this.modalType = 'add';
      this._child.open();  
  }
}

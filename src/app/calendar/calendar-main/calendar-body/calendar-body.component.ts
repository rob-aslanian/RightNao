import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';

@Component({
  selector: 'app-calendar-body',
  templateUrl: './calendar-body.component.html',
  styleUrls: ['./calendar-body.component.scss']
})
export class CalendarBodyComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) _modal: AppModalComponent;
  @ViewChildren(AppModalComponent) modals:AppModalComponent;

  modalType: string;

  constructor() { }

  ngOnInit() {
  }

  openModal(type: string) {
    this.modalType = type;
    this._modal.open(); 

    switch(type) {
      case 'add': {
        this._modal.title = '';
        break;
      }
      case 'create-poll' : {
        this._modal.title = '';
        break;
      }
      case 'poll' : {
        this._modal.title = '';
        break;
      }
    }


  }

}

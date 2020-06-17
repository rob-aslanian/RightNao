import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';

@Component({
  selector: 'app-add-event-modal',
  templateUrl: './add-event-modal.component.html',
  styleUrls: ['./add-event-modal.component.scss']
})
export class AddEventModalComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;


  modalType:string = null;
  reminder:string = '';

  constructor(
  ) { }

  ngOnInit() {
  
  }

  open(type:string) {
    this.modalType = type;
    this.modal.open();

    switch (type) {
      case 'repeat':{
        this.modal.title = "Repeat";
        break;
      }
      case 'timezone': {
        this.modal.title = "Event time zone";
        break;
      }
    }
  }

  close(){
    this.modal.close();
    // this.modalType = null;
  }

}

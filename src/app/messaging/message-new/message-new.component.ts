import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart } from '@angular/router';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { map, filter } from 'rxjs/operators';
import { ListenersService } from '../shared/services/listeners.service';

@Component({
  selector: 'app-message-new',
  templateUrl: './message-new.component.html',
  styleUrls: ['./message-new.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessageNewComponent implements OnInit {

  selectedItems: any = [];
  conversation = null;

  @ViewChild( AppModalComponent, { static: true } ) _modal: AppModalComponent;
  modalType: string;


  constructor(
    private router: Router,
    private activeRouter:ActivatedRoute,
    private listenService:ListenersService
  ) { }

  ngOnInit() {
     

    if(history.state.users) {
      this.selectedItems = history.state.users;
    }
  
    
   }

  handleAfterSending(converstionId) {
    this.router.navigate(['messaging/v/', converstionId]);
    console.log(this.selectedItems);
  }



}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ListenersService } from './shared/services/listeners.service';
import { utilities } from '../_shared/utilities/utilities';

@Component({
  selector: 'app-messaging',
  templateUrl: './messaging.component.html',
  styleUrls: ['./messaging.component.scss', '../_shared/css/modals_shared_styles.scss', '../../assets/scss/messaging.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessagingComponent implements OnInit {

  isHide:boolean = false;
  isMobile:boolean = utilities.isMobile;

  constructor(
    private messageServicce:ListenersService
  ) { }

  ngOnInit() {
    this.messageVisibility();
  }

  messageVisibility(){
    if(utilities.isMobile){
      this.messageServicce
          .hideMessage
          .subscribe(
            (e) => this.isHide = e,
          )
    }
    return;
  }
  
  

}

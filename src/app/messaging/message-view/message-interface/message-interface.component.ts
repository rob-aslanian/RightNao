import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { ListenersService } from 'src/app/messaging/shared/services/listeners.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-message-interface',
  templateUrl: './message-interface.component.html',
  styleUrls: ['./message-interface.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MessageInterfaceComponent implements OnInit {
  // This component contains the center part of the screen that is chat messages. 

  @Input() conversation: any;
 

  conversationId: any;
  messageText: any = '';
  messageList: any = [];
  currentUserId: any;
  selectedItems: any = [];
  showSearchUserFields = false;
  totalUnread

  routeListener: Subscription;
  searchUserFields: Subscription;

  constructor(
    private listenersService: ListenersService,
    private activatedRoute: ActivatedRoute,
    private cookieService: CookieService,
  ) { }

  ngOnInit() {
    this.currentUserId = this.cookieService.get('user_id');

    console.log(this.getParticipant());
    

    // get conversation id from route param
    this.routeListener = this.activatedRoute.params.subscribe(params => {
      this.conversationId = params['conversationId'];
      
    })

    // Listen to + icon click from the header and show the search controls in this component. 
    this.searchUserFields = this.listenersService.searchUserFields.subscribe(val => {
      this.showSearchUserFields = val;
    })
  }

  ngOnDestroy() {
    this.routeListener.unsubscribe();
    this.searchUserFields.unsubscribe();
  }

  downloadImage(file) {
    window.open(file)
  }

  // get participant details based on participant id 
  getParticipant() {
    let participant = this.conversation.participants[0];
    return participant
  }

  getAllParticipant(){
    return this.conversation.participants;
  }

  handleAfterSending() {
    this.showSearchUserFields = false;
    this.selectedItems = [];
  }
}

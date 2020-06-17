import { Component, ViewEncapsulation, ViewChild, QueryList, ViewChildren, isDevMode } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, RoutesRecognized, NavigationStart } from '@angular/router';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { CookieService } from 'ngx-cookie-service';
import { ListenersService } from 'src/app/messaging/shared/services/listeners.service';
import { Subscription } from 'rxjs';
import { SmallConversationsComponent } from 'src/app/messaging/small-conversations/small-conversations.component';
import { SmallNewChatComponent } from 'src/app/messaging/small-new-chat/small-new-chat.component'
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  @ViewChild('smallConvBox', { static: false }) smallConvBoxRef: SmallConversationsComponent;
  @ViewChild('smallChatBoxNew', { static: false }) smallChatBoxNewRef: SmallNewChatComponent;

  urlFirstChild: any;
  title = 'Hypercube';

  // app.component contains the same code as messaging.component.ts to initialize the small chat boxes through out the applciation - Murtuza
  showSmallChatBoxes = false;
  conversationIdArr = [];
  routeConversationId: any;
  showSmallNewChat = false;
  loggedInUserId = this.cookieService.get('user_id');
  lastRoute: string;
  routeSubscription: Subscription;

  constructor(
    public router: Router,
    private globalUserProfileService: GlobalUserProService,
    private cookieService: CookieService,
    private listenersService: ListenersService,
    private activatedRoute: ActivatedRoute,
    private translateService:TranslateService,
  ) {
    
  }


  ngOnInit() {

    
    /// Init Multilangue

    this.translateService.addLangs([
          'en' , 'ru' , 'ka' , 
          'fr', 'hy' , 'es' , 
          'tr' , 'uk' , 'zh' , 'ar']);

    this.translateService.setDefaultLang('en');
    this.translateService.use(this.globalUserProfileService.getInterfaceLang());


    this.router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        
        
        if ( ev.url !== '/' && !ev.url.includes('registration') ){

          if (this.globalUserProfileService.isAuthenticated() && !this.listenersService.messagingWebSocket) {            
            this.initializeWebsocket();
            this.showSmallChatBoxes = true;
          }
        }
        else {    
          this.showSmallChatBoxes = false;
          this.conversationIdArr = [];
       }
        
        this.urlFirstChild = ev.url.split("/")[1];
        this.routeConversationId = ev['url'].split('/messaging/v/')[1];
      }
    });
    
   

  }


  get getProtocol(): string{
    return location.protocol === 'http:' ? 'ws:' : 'wss:';
  }


  // Instace of web socket is created here globally througout the messaging module
  initializeWebsocket() {

    try{
      let token = this.cookieService.get('token_user');
    
      let webSocketPath = this.globalUserProfileService.isCompanyActive() ? (`?token=${token}&company_id=${this.globalUserProfileService.getComapnyId()}`) : ("?token=" + token);
      this.listenersService.messagingWebSocket = new WebSocket(`${this.getProtocol}//${location.host}/ws/messenger`+ webSocketPath);
      this.listenersService.messagingWebSocket.onopen = () => {
  
    
        this.listenersService.messagingWebSocket.onmessage = ((event) => {
          let message = JSON.parse(event.data);
          if (message.error) {
            
          } else {
            if (message.type == "MessageStatus") {
              (message.sender_id !== this.loggedInUserId) && this.listenersService.triggerUpdateMessageStatus(message)
            }
            else if (message.type == "TotalUnreadCount") {
              this.listenersService.triggerTotalUnreadCounts(message.total_unread_count)
              // update unreadd count
            }
            else {
              if (!(message.type == "ParticipantLeft" && message.sender_id == this.loggedInUserId)) {  // Do notify if the logged in user is the one who left the group
                (message.sender_id !== this.loggedInUserId) && this.sendWebsocketMessage(message) // Send received confirmation
                this.listenersService.triggerNewMessage(message); // trigger components that a new UserMessage type text is received. 
  
                setTimeout(() => { // Wait till the new conversation is inserted in the 'conversationlist' of small conversation component
                  let x = this.routeConversationId == null ? true : (this.routeConversationId !== message.conversation_id);
                    
                  let isConvMuted = this.smallConvBoxRef.conversationList.find((conv => conv.id == message.conversation_id));
                  console.log(isConvMuted);
                  
                      isConvMuted = isConvMuted > -1 ? isConvMuted.muted : false;
                  if (this.conversationIdArr.indexOf(message.conversation_id) == -1 && x && !isConvMuted) { // Conditions to open small chat box.
                    this.addChatBox(message.conversation_id)
                  }
                }, 500)
              }
            }
          }
        })
  
  
      }
  
      this.listenersService.messagingWebSocket.onclose = (err:CloseEvent) => {
        
        console.log('ON CLOSE' , err);

        if (this.listenersService.messagingWebSocket ) {
              return (err.code === 1000 || err.code === 1006) ? this.initializeWebsocket() : 
                                                                this.listenersService.messagingWebSocket.close();
        }
        return;
      }
  
      this.listenersService.messagingWebSocket.onerror = (err) => {
        console.log('ON ERROR' , err);
         this.listenersService.messagingWebSocket.close();
      }
    } catch(exp) {
      console.log(exp);
      
    }
  }

  // When a message is received, we are sending the websocket message to notify the other user that it was received. 
  sendWebsocketMessage(message) {
    let _message = {
      "id": message.id,
      "conversation_id": message.conversation_id,
      "text": "received",
      "type": "MessageStatus"
    }
    this.listenersService.messagingWebSocket.send(JSON.stringify(_message));
  }

  // When there is a new incoming message, we show the small chat box. 
  addChatBox(conversationId) {

    
    if (this.conversationIdArr.indexOf(conversationId) == -1) {

      if (conversationId == 'NEW') {
        this.showSmallNewChat = true;
      } else {
        this.conversationIdArr.length > 2 && this.conversationIdArr.pop();
        this.conversationIdArr.push(conversationId);
      }
    }

  }

  // close the chat box. 
  onClose(conversationId) {
    console.log(this.conversationIdArr, conversationId);
    
    this.conversationIdArr.splice(this.conversationIdArr.indexOf(conversationId), 1)
  }



  // close the chat box with 'create message' template.
  onCloseNewChatBox() {
    this.showSmallNewChat = false;
  }

  prePopulateNewChatBoxText(text) {
    this.smallChatBoxNewRef && (this.smallChatBoxNewRef.sendMessageFormRef['messageText'] = text)
  }

  trackByFn =  (index) => index;
  
  ngOnDestroy(): void {
    this.listenersService.messagingWebSocket.close();
  }
}

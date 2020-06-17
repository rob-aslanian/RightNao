import { Component, OnInit, Input, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { Subscription } from 'rxjs';
import { ListenersService } from 'src/app/messaging/shared/services/listeners.service';
import { FilepathPipe } from 'src/app/messaging/shared/pipes/filepath.pipe';
import { MessageDatePipe } from 'src/app/messaging/shared/pipes/message-date.pipe';
import { HttpClient } from '@angular/common/http';
import { Apollo } from 'apollo-angular';
import { MessageStatusPipe } from 'src/app/messaging/shared/pipes/message-status.pipe';

import { MappingService } from 'src/app/messaging/shared/graphql/mapping.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-chat-container',
  templateUrl: './chat-container.component.html',
  styleUrls: ['./chat-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatContainerComponent implements OnInit {

  // This components hold the message for each conversation 

  @ViewChild('scrollChatCtnr', { static: true }) scrollChatCtnrRef: CdkVirtualScrollViewport;

  @Input() conversation;
  @Input() totalUnread;
  @Output() totalUnreadChange = new EventEmitter();

  messageList = [];
  currentUserId;
  filePathPipe = new FilepathPipe();
  messageDatePipe = new MessageDatePipe();
  messageStatusPipe = new MessageStatusPipe(this.cookieService, this.graphQLMappingService);
  modalRef: any;
  selectedPhotoIndex = 0;
  selectedItems = [];
  searchText = null;

  newMessageListener: Subscription;
  updateMessageStatus: Subscription;
  searchMessageSubscription: Subscription;
  forwardMsgIds:Set<any> = new Set<any>();

  constructor(
    private cookieService: CookieService,
    public listenersService: ListenersService,
    private graphQLMappingService: MappingService,
    private http: HttpClient,
    private ngbModalService: NgbModal,
    private apollo: Apollo,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.getAllMessages();
    this.getAllFiles();

    this.conversation.unread && this.setReadUnread();

    this.currentUserId = this.graphQLMappingService.isCompany ? this.graphQLMappingService.companyId : this.cookieService.get('user_id');

    this.newMessageListener && this.newMessageListener.unsubscribe(); // To avoid duplicate subscription
    this.newMessageListener = this.listenersService.newMessage.subscribe(newMessage => {
      let message = JSON.parse(JSON.stringify(newMessage))
      if (message.conversation_id == this.conversation.id && this.messageList.indexOf(message.id) == -1) {

        // Add date if this was the first message of today.
        let messageListLen = this.messageList.length
        let messageDateStr = this.messageDatePipe.transform(messageListLen !== 0 ? this.messageList[messageListLen - 1].timestamp : message.timestamp)
        let currDateStr = this.messageDatePipe.transform(message.timestamp)
        if (messageDateStr !== currDateStr) {
          let data = {
            type: 'MessageDate',
            timestamp: message.timestamp
          }

          this.messageList = [...this.messageList, data]
          this.changeDetectorRef.detectChanges();

          currDateStr = messageDateStr
        }

        // Add actualy message
        this.messageList = [...this.messageList, message];

        this.changeDetectorRef.detectChanges();
        this.scrollToBottom();

        // Send websockt message that message is seen
        (message.sender_id !== this.currentUserId) && this.sendSeenMessage(message);
        
        // Add photos/files if any to the array
        if (message.files !== null && message.files.length) {
          message.files.forEach((file)=>{
            let dotIndex = file.file_name.lastIndexOf('.')
            let fileExt = file.file_name.substring(dotIndex);
            file.fileUrl = file.file;
            if (this.listenersService.isImage(fileExt)) {
              this.listenersService.conversationPhotos.push(file); // put photo in photos array
            } else {
              this.listenersService.conversationFiles.push(file);//put file in files array
            }
          })
        }
      }
    });

    // update message status (delivered, received, seen etc)
    this.updateMessageStatus = this.listenersService.updateMessageStatus.subscribe(message => {
      this.messageList.filter((element) =>
        element.id == message.id
      ).map((item) => {
        item.seen_by = message.seen_by;
        item.received_by = message.received_by;
        return item;
      })
      this.changeDetectorRef.detectChanges();
      this.scrollToBottom();
    })

    // Listen to search message from the message details (from right side of the screen)
    this.searchMessageSubscription = this.listenersService.searchInsideInterface.subscribe(text => {

      this.searchText = text;

      let variables = {
        conversationId: this.conversation.id,
        query: text,
        file: ''
      }

      this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

      this.apollo.query({
        query: this.graphQLMappingService.SearchInConversation,
        fetchPolicy: 'network-only',
        variables: variables,
      }).subscribe
        (({ data }) => {
          this.messageList = data[Object.keys(data)[0]]
          this.changeDetectorRef.detectChanges();
          this.scrollToBottom();
        });
    })


  }

  ngOnDestroy() {
    this.newMessageListener.unsubscribe();
    this.updateMessageStatus.unsubscribe();
    this.searchMessageSubscription.unsubscribe();
  }

  // Get all messages inside the conversation. 
  getAllMessages() {
    let variables = {
      conversationId: this.conversation.id
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.messageList = [];
    this.apollo.query({
      query: this.graphQLMappingService.getAllMessages,
      fetchPolicy: 'network-only',
      variables: variables,
    }).subscribe
      (({ data }) => {
        this.messageList = data[Object.keys(data)[0]];
        this.changeDetectorRef.detectChanges();
        this.insertDateInMessageBatch();
        this.markMessagesRead();
      });
  }

  sendSeenMessage(message) {
    let _message = {
      "id": message.id,
      "conversation_id": message.conversation_id,
      "text": "seen",
      "type": "MessageStatus"
    }
    this.listenersService.messagingWebSocket.send(JSON.stringify(_message));
    this.totalUnreadChange.emit(0) // Set the 'total unread count' on the small chat box to zero because all the messages are seen when this box is opened. 
  }

  // Method to insert the date item in the messages list(light grey color). 
  insertDateInMessageBatch() {
    let currDateStr;

    this.messageList = this.messageList.reduce((a, b) => {
      let messageDateStr = this.messageDatePipe.transform(b.timestamp)

      if (messageDateStr !== currDateStr || currDateStr == null) { // Add if already don't exists or if its a first message of the iteration.
        let data = {
          type: 'MessageDate',
          timestamp: b.timestamp
        }
        currDateStr = messageDateStr;
        a.push(data)
      }
      a.push(b);
      return a;
    }, [])
    this.scrollToBottom()
  }

  setReadUnread() {
    let variables = {
      conversationId: this.conversation.id,
      flag: !this.conversation.unread
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)
    this.apollo.mutate({
      mutation: this.graphQLMappingService.setReadUnread,
      variables: variables
    }).subscribe(({ data }) => {
      this.listenersService.triggerReadUnreadUpdate({
        conversationId: this.conversation.id,
        unread: !this.conversation.unread
      })
    }, (error) => {

    });
  }

  scrollToBottom() {
    this.scrollChatCtnrRef.scrollToIndex(this.messageList.length - 1);
    setTimeout(() => { this.scrollChatCtnrRef.scrollTo({ bottom: 0 }) }, 100)
  }


  getParticipant(id) {
    let participant = this.conversation.participants.filter((item) => item.id == id)[0];

    return participant
  }

  getSecondParticipant() {
    let loggedInUserId = this.cookieService.get('user_id');
    let participant = this.conversation.participants.filter((item) => item.id !== loggedInUserId)[0];
    return participant
  }



   downloadImage(files:any[]) {

    if(files.length > 0)
    {
      files.map(async file => {
         let isImage = await this.listenersService.isImage(this.getFileExt(file.file_name));

         if (isImage){

          let filepath = this.filePathPipe.transform(file.file)
          let a = document.createElement('a');
          try {
            a.href = await this.toDataURL(filepath)
            a.download = new Date().getTime() + '.png';         
            a.target = '_blank'
            document.body.appendChild(a);
            a.click();
            setTimeout(() => { document.body.removeChild(a) }, 500)
          }
          catch (err) {
         
          }
        } else {
          let filepath = this.filePathPipe.transform(file.file)
          window.open(filepath)
        }
         
      })
    }


  }

  forwarMsg(files:any[]){
    this.forwardMsgIds.add(files.map(file => file.file));
  }

  toDataURL(url) {
    return fetch(url,
      {
        credentials: 'include',
        // mode: 'no-cors'      
      }).then((response) => {
        return response.blob();
      }).then(blob => {
        return URL.createObjectURL(blob)
      })
  }

  openSharedPhotosModal(content, fileId) {
    this.selectedPhotoIndex = this.listenersService.getConversationPhotos.findIndex((item) => item.fileUrl == fileId);
    setTimeout(() => {
      this.modalRef = this.ngbModalService.open(content, { windowClass: 'messaging-shared-photos-modal' })
    }, 200)
  }

  getFileExt(file_name) {
    let dotIndex = file_name.lastIndexOf('.')
    let fileExt: string = file_name.substring(dotIndex);
    return fileExt.toLowerCase()
  }

  getMetaContent(html, name) {
    return html.filter((index, tag) => tag && tag.name && tag.name == name).attr('content')
  }

  // get all the links written in a specific message
  getLinksInMessage(text) {
    let links = text.match(/\bhttps?:\/\/\S+/gi);
    return (links || []);
  }

  closeModal() {
    this.modalRef.close();
  }

  markMessagesRead() {
    this.messageList.forEach(message => {
      if (message.type == 'UserMessage') {
        let seenByIndex = message.seen_by.indexOf(this.currentUserId)

        if (message.sender_id! !== this.currentUserId && seenByIndex == -1) { // not send by me and not seen by me, only then mark it as read
          this.sendSeenMessage(message)
        }
      }
    });
  }

  // Get all the files and photos on the conversation to show at the bottom right of the screen
  getAllFiles() {
    this.listenersService.setConversationPhotos = [];
    this.listenersService.setConversationFiles = [];

    let variables = {
      conversationId: this.conversation.id,
      query: '',
      file: '.*'
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.query({
      query: this.graphQLMappingService.SearchInConversation,
      fetchPolicy: 'network-only',
      variables: variables,
    }).subscribe
      (({ data }) => {
        let token = this.cookieService.get('token_user');

        data[Object.keys(data)[0]].forEach(message => {
          message.files.forEach((element) => {
            let dotIndex = element.file_name.lastIndexOf('.')
            let fileExt = element.file_name.substring(dotIndex);
            element.fileUrl = element.file;
            element.sender_id = message.sender_id;
            element.timestamp = message.timestamp;
            if (this.listenersService.isImage(fileExt)) {
              this.listenersService.conversationPhotos.push(element); // put photo in photos array
            } else {
              this.listenersService.conversationFiles.push(element);//put file in files array
            }
          })
        });
      });
  }

  forwardFile(message) {
    
  }
}

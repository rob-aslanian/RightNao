import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import { ListenersService } from 'src/app/messaging/shared/services/listeners.service';
import { Subscription } from 'rxjs';
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';

import { MappingService } from 'src/app/messaging/shared/graphql/mapping.service'

@Component({
  selector: 'app-small-conversations',
  templateUrl: './small-conversations.component.html',
  styleUrls: ['./small-conversations.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SmallConversationsComponent implements OnInit {

  @Output() addChatBox = new EventEmitter;

  showBody = false;
  conversationList = [];
  totalUnread = 0;

  newMessageSubscription: Subscription;
  readUnreadUpdate: Subscription;
  deleteConversationSubscription;
  archivedUpdate: Subscription;
  muteUnmuteSubscription: Subscription;
  groupInfoUpdated: Subscription;
  profileUpdate: Subscription;

  constructor(
    private apollo: Apollo,
    private cookieService: CookieService,
    public listenersService: ListenersService,
    private graphQLMappingService: MappingService,
    private globalUserProService: GlobalUserProService
  ) { }

  ngOnInit() {
    
    this.getConversationList({
      labelId: '',
      text: ''
    });

    this.profileUpdate = this.globalUserProService.profileUpdatedSource$.subscribe(profile => {
      if (this.globalUserProService.isAuthenticated()) {
        this.getConversationList({
          labelId: '',
          text: ''
        });
      }
    })

    this.newMessageSubscription = this.listenersService.newMessage.subscribe(newMessage => {

      setTimeout(() => {
        this.getConversationList({
          labelId: '',
          text: ''
        });
      }, 500)

      // let message = JSON.parse(JSON.stringify(newMessage))
      // let chatExists = this.conversationList.findIndex(item => item.id == message.conversation_id);

      // if (chatExists == -1) {
      //   this.getConversation(message.conversation_id, (conversation) => {
      //     this.conversationList.unshift(conversation);

      //     if (message.type == 'ParticipantLeft' || message.type == 'AddParticipant') {
      //       let groupNotificationPipe = new GroupNotificationPipe();
      //       message.text = groupNotificationPipe.transform(message, conversation);
      //     }

      //     // Remove duplicates in conversation list if any because web socket notification comes almost at the same time. 
      //     this.conversationList = this.conversationList.reduce((a, c) => {
      //       let isAlreadyPresent = a.find((item) => item.id == c.id);
      //       (isAlreadyPresent == undefined) && a.push(c);
      //       return a;
      //     }, [])
      //   })
      // } else {
      //   for (let i = 0; i < this.conversationList.length; i++) {
      //     if (this.conversationList[i].id == message.conversation_id) {
      //       let temp = this.conversationList[i];

      //       if (message.type == 'ParticipantLeft' || message.type == 'AddParticipant') {
      //         let groupNotificationPipe = new GroupNotificationPipe();
      //         message.text = groupNotificationPipe.transform(message, this.conversationList[i])
      //       }

      //       temp.last_message.text = message.text;
      //       temp.last_message.timestamp = message.timestamp;
      //       this.conversationList.splice(i, 1);
      //       this.conversationList.unshift(temp);
      //       break
      //     }
      //   }
      // }
    })

    this.listenersService.totalUnreadCounts.subscribe((count) => {
      this.totalUnread = count;
    })

    // To toggle readUnread on the list item. 
    this.readUnreadUpdate = this.listenersService.readUnreadUpdate.subscribe((event) => {
      this.conversationList.filter((element) =>
        element.id == event.conversationId
      ).map((item) => item.unread = event.unread)
    })

    // Remove the chat from the list if the chat is deleted from other component. 
    this.deleteConversationSubscription = this.listenersService.deleteConversationUpdate.subscribe((event) => {
      this.conversationList = this.conversationList.filter((element) =>
        element.id !== event.conversationId
      )
    })

    // To toggle archived/unarchived on the list item. 
    this.archivedUpdate = this.listenersService.archivedUpdate.subscribe((event) => {
      if (event.archived) {
        this.conversationList = this.conversationList.filter((element) =>
          element.id !== event.conversationId
        )
      } else {
        this.getConversation(event.conversationId, (conversation) => {
          this.conversationList.unshift(conversation);
        })
      }
    })

    // To toggle Mute icon on the list item. 
    this.muteUnmuteSubscription = this.listenersService.muteUnmuteUpdate.subscribe((event) => {
      this.conversationList.filter((element) =>
        element.id == event.conversationId
      ).map((item) => item.muted = event.mute)
    })

    // Update the group ICON if changed from some other component. 
    this.groupInfoUpdated = this.listenersService.groupInfoUpdated.subscribe((event) => {
      this.conversationList.some((item) => {
        if (item.id == event.conversationId) {
          item.avatar = event.groupAvatar;
          item.name = event.groupName;
          return true;
        }
      })
    })

    this.isOnline();
  }

  getConversation(conversationId, callback) {
    let variables = {
      id: conversationId,
    }

    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.query({
      query: this.graphQLMappingService.GetConversation,
      fetchPolicy: 'network-only',
      variables: variables,
    }).subscribe
      (({ data }) => {
        callback(data[Object.keys(data)[0]]);
      });
  }

  ngOnDestroy() {
    this.newMessageSubscription && this.newMessageSubscription.unsubscribe();
    this.readUnreadUpdate.unsubscribe();
    this.deleteConversationSubscription.unsubscribe();
    this.archivedUpdate.unsubscribe();
    this.muteUnmuteSubscription.unsubscribe();
    this.groupInfoUpdated.unsubscribe();
    this.profileUpdate.unsubscribe();
  }

  getConversationList(data) {
    let variables = {
      category: 'All',
      labelId: data.labelId,
      text: data.text
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.query({
      query: this.graphQLMappingService.getConversationList,
      fetchPolicy: 'network-only',
      variables: variables
    }).subscribe
      (({ data }) => {
        this.conversationList = data[Object.keys(data)[0]].filter((item) => {
          if (item.is_group && item.has_left) {
            return;
          } else {
            return item
          }
        })
        this.totalUnread = this.conversationList.filter((item) => item.unread == true).length;
      });
  }

  getParticipant(conversation) {
    let loggedInUserId = this.cookieService.get('user_id');
    let participant = conversation.participants.filter((item) => item.id !== loggedInUserId)[0];
    return participant
  }

  onConversationTap(conversationItem) {
    conversationItem.unread && this.setReadUnread(conversationItem);
    this.addChatBox.emit(conversationItem.id)
  }

  setReadUnread(conversationItem) {
    let variables = {
      conversationId: conversationItem.id,
      flag: !conversationItem.unread
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.mutate({
      mutation: this.graphQLMappingService.setReadUnread,
      variables: variables
    }).subscribe(({ data }) => {
      conversationItem.unread = !conversationItem.unread;

    }, (error) => {
      alert('Error 101 ' + error)
    });
  }

  onNewChat() {
    this.addChatBox.emit('NEW')
  }

  toggleOnline() {
    let variables = {
      offline: !this.listenersService.isOnline
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.mutate({
      mutation: this.graphQLMappingService.SetOffline,
      variables: variables
    }).subscribe(({ data }) => {

    }, (error) => {
      alert('Error 101 ' + error)
    });
  }

  isOnline() {
    let variables = {
      url: this.graphQLMappingService.isCompany ? this.globalUserProService.getCompanyProfile().url : this.globalUserProService.getUserProfile().url
    }

    // this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.query({
      query: this.graphQLMappingService.isOnline,
      fetchPolicy: 'network-only',
      variables: variables
    }).subscribe
      (({ data }) => {
        this.listenersService.isOnline = data[Object.keys(data)[0]].online;
      });
  }

}



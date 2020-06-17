import { Component, OnInit, ViewEncapsulation, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap';
import { debounceTime, distinctUntilChanged, map, filter } from 'rxjs/operators'
import { Observable, Subscription, Subject, merge } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { ListenersService } from 'src/app/messaging/shared/services/listeners.service';
import { CookieService } from 'ngx-cookie-service';
import { MessageDatePipe } from 'src/app/messaging/shared/pipes/message-date.pipe';
import { DateFormatPipe } from 'src/app/messaging/shared/pipes/date-format.pipe';

// Queries and Mutations
import { MappingService } from 'src/app/messaging/shared/graphql/mapping.service'
import { utilities } from 'src/app/_shared/utilities/utilities';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MessageListComponent implements OnInit {

  // This component show the list of chats on the left hand noSideEffects. 

  @ViewChild(AppModalComponent ,{ static:true }) modal: AppModalComponent;
  @ViewChild('reportChatModal', { static: true }) reportChatModalRef: ElementRef;
  @ViewChild('blockUserModal', { static: true }) blockUserModalRef: ElementRef;
  @ViewChild('instance', { static: false }) instance: NgbTypeahead;

  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  messageDatePipe = new MessageDatePipe();
  dateFormatPipe = new DateFormatPipe();

  conversationList: any[];
  blockedUsers = [];
  activeUsers = [];
  allChatLabel: any[];
  label: any;
  conSearchText: '';

  formatMatches = (value: any) => value.name || '';

  selectedLabelId = '';
  selectedListType = 'All';
  selectedConversation: any;
  modalRef: any;
  showNewChatInList: boolean = false;
  routeConversationId

  routeSubscription: Subscription;
  newMessageSubscription: Subscription;
  muteUnmuteSubscription: Subscription;
  deleteConversationSubscription: Subscription;
  groupInfoUpdated: Subscription;
  readUnreadUpdate: Subscription;
  archivedUpdate: Subscription;

  modalType:string;

  constructor(
    private ngbModalService: NgbModal,
    private apollo: Apollo,
    private router: Router,
    private cookieService: CookieService,
    private listenersService: ListenersService,
    public graphQLMappingService: MappingService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    // To highlight the current chat in the list. 
    setTimeout(() => {
      this.routeConversationId = this.activatedRoute.firstChild.snapshot.params['conversationId'];
    }, 2000)

    this.getConversationList({
      labelId: this.selectedLabelId,
      text: this.conSearchText
    }, false);
    this.appendListeners();
  }

  ngOnDestroy() {
    this.routeSubscription && this.routeSubscription.unsubscribe()
    this.newMessageSubscription && this.newMessageSubscription.unsubscribe();
    this.muteUnmuteSubscription.unsubscribe();
    this.groupInfoUpdated.unsubscribe();
    this.readUnreadUpdate.unsubscribe();
    this.archivedUpdate.unsubscribe();
  }

  appendListeners() {

    // Method to get the conversation ID from the route param. 
    this.routeSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event['url'] == '/messaging/new') {
          this.showNewChatInList = true;
          this.routeConversationId = event['url'];
        } else {
          this.showNewChatInList = false;
          this.routeConversationId = event['url'].split('/messaging/v/')[1];
        }
      }
    })

    // Things that will happen on the list when a new message is received. 
    this.newMessageSubscription = this.listenersService.newMessage.subscribe(newMessage => {

      setTimeout(() => {
        this.getConversationList({
          labelId: this.selectedLabelId,
          text: this.conSearchText
        }, false);
      }, 500)


      // let message = JSON.parse(JSON.stringify(newMessage))

      // let chatExists = this.conversationList.findIndex(item => item.id == message.conversation_id);
      // if (chatExists == -1) { // New Conversation which does not exsit in conversation list. 
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
      // } else { // Conversation exists in the list. 
      //   for (let i = 0; i < this.conversationList.length; i++) {
      //     if (this.conversationList[i].id == message.conversation_id) {
      //       let temp = this.conversationList[i];

      //       if (message.type == 'ParticipantLeft' || message.type == 'AddParticipant') {
      //         let groupNotificationPipe = new GroupNotificationPipe();
      //         message.text = groupNotificationPipe.transform(message, this.conversationList[i])
      //       }

      //       temp.last_message.text = message.text;
      //       temp.last_message.timestamp = message.timestamp;
      //       temp.unread = !(this.routeConversationId === temp.id);
      //       this.conversationList.splice(i, 1);
      //       this.conversationList.unshift(temp);
      //       break
      //     }
      //   }
      // }
    })

    this.getAllLabels();

    // To toggle Mute icon on the list item. 
    this.muteUnmuteSubscription = this.listenersService.muteUnmuteUpdate.subscribe((event) => {
      this.conversationList.filter((element) =>
        element.id == event.conversationId
      ).map((item) => item.muted = event.mute)
    })

    // Remove the chat from the list if the chat is deleted from other component. 
    this.deleteConversationSubscription = this.listenersService.deleteConversationUpdate.subscribe((event) => {
      this.conversationList = this.conversationList.filter((element) =>
        element.id !== event.conversationId
      )
      if (this.conversationList.length !== 0) {
        this.router.navigate(['messaging/v/', this.conversationList[0].id])
      } else if (this.selectedListType == 'All') {
        this.router.navigate(['messaging/new'])
      } else if (this.selectedListType == 'Archived') {
        this.changeChatListType('All')
      }
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

    // To toggle readUnread on the list item. 
    this.readUnreadUpdate = this.listenersService.readUnreadUpdate.subscribe((event) => {
      this.conversationList && this.conversationList.filter((element) =>
        element.id == event.conversationId
      ).map((item) => item.unread = event.unread)
    })

    // To toggle archived/unarchived on the list item. 
    this.archivedUpdate = this.listenersService.archivedUpdate.subscribe((event) => {
      this.conversationList = this.conversationList.filter((element) =>
        element.id !== event.conversationId
      )

      if (this.conversationList.length !== 0) {
        this.router.navigate(['messaging/v/', this.conversationList[0].id])
      } else if (this.selectedListType == 'All') {
        this.router.navigate(['messaging/new'])
      } else if (this.selectedListType == 'Archived') {
        this.changeChatListType('All')
      }
    })
  }

  // get the details of a particular conversation with conversation ID
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

  // Get all the labels created by this user to show in the drop down. 
  getAllLabels() {
    let variables = {}
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.query({
      query: this.graphQLMappingService.GetAllLabels,
      variables: variables,
      fetchPolicy: 'network-only'
    }).subscribe
      (({ data }) => {
        this.allChatLabel = data[Object.keys(data)[0]]
      });
  }

  // NG Bootstrap type ahead function to search by label.
  search = (text$: Observable<string>) => {
    const debounceTime$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clicksWithClosedPopup$ = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));
    const inputFocus$ = this.focus$;

    return merge(debounceTime$, inputFocus$, clicksWithClosedPopup$).pipe(
      map(term => (term === '' ? this.allChatLabel
        : this.allChatLabel.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10)
      )
    )
  }

  // When a label is selected from ng type ahead, hit the API for search with Label id. 
  onLabelSelect(selectedLabel) {
    this.selectedLabelId = selectedLabel.item.id;
    this.getConversationList({
      labelId: this.selectedLabelId,
      text: this.conSearchText
    }, true);
  }

  // Get the list of chats/Conversation of the logged in user. 
  getConversationList(data, showTopConversation) {
    let variables = {
      category: this.selectedListType,
      labelId: data.labelId,
      text: data.text
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.query({
      query: this.graphQLMappingService.getConversationList,
      fetchPolicy: 'network-only',
      variables: variables,
    }).subscribe
      (({ data }) => {
        this.conversationList = data[Object.keys(data)[0]].filter((item) => {
          if (item.is_group && item.has_left) {
            return;
          } else {
            return item
          }
        })

        if (this.conversationList.length !== 0) {
          if (showTopConversation || this.router.url == "/messaging") {
            this.selectedConversation = this.conversationList[0];
            this.router.navigate(['messaging/v/', this.conversationList[0].id]);
          } else {
            this.selectedConversation = this.conversationList[this.conversationList.findIndex(item => item.id == this.routeConversationId)];
          }
        } else if (this.selectedListType == 'All') {
          this.router.navigate(['messaging/new']);
        }
      }, (error) => {
      });
  }

  getLabel(id) {
    return this.allChatLabel.filter((item) => {
      return item.id == id;
    })[0];
  }

  onClearSearch() {
    this.selectedLabelId = '';
    this.label = '';
    this.getConversationList({
      labelId: '',
      text: ''
    }, false);
  }

  openLeaveGroupModal(content) {
    this.modalRef = this.ngbModalService.open(content, { windowClass: 'messaging-leave-group-modal' })
  }

  archiveConversation(conversationItem) {
    let variables = {
      conversationId: this.selectedConversation.id,
      archive: !this.selectedConversation.archived
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.mutate({
      mutation: this.graphQLMappingService.archiveConversation,
      variables: variables
    }).subscribe(({ data }) => {
      conversationItem.archived = !conversationItem.archived;
    }, (error) => {
    });
  }

  changeChatListType(type) {
    this.selectedListType = type;
    if (type === 'Blocked') {
      this.getBlocked()
    } else if (type === 'Active') {
      this.getActive()
    } else {
      this.getConversationList({
        labelId: this.selectedLabelId,
        text: this.conSearchText
      }, true);
    }

  }

  getActive() {
    let variables = {}

    this.apollo.query({
      query: this.graphQLMappingService.GetActiveConnections,
      fetchPolicy: 'network-only',
      variables: variables,
    }).subscribe
      (({ data }) => {
        this.activeUsers = data[Object.keys(data)[0]];
      }, (error) => {
      });
  }

  getBlocked() {
    let variables = {}
    this.graphQLMappingService.isCompany && (variables['company_id'] = this.graphQLMappingService.companyId)

    this.apollo.query({
      query: this.graphQLMappingService.getBlockedUsersOrCompanies,
      fetchPolicy: 'network-only',
      variables: variables,
    }).subscribe
      (({ data }) => {
        this.blockedUsers = data[Object.keys(data)[0]];
      }, (error) => {
     
      });
  }


  onConversationTap(conversationItem) {
    
    conversationItem.unread = false;
    this.selectedConversation = conversationItem;
    this.router.navigate(['messaging/v/', conversationItem.id]);
    
    if(utilities.isMobile){
      this.listenersService.triggerMessageList(true);
    }
  }

  openMuteChatModal(content) {
    this.modalRef = this.ngbModalService.open(content, { windowClass: 'messaging-mute-chat-modal' })
  }

  openDeleteChatModal(content) {
    this.modalRef = this.ngbModalService.open(content, { windowClass: 'messaging-mute-chat-modal' })
  }

  openReportBlockModal(content) {
    this.modalRef = this.ngbModalService.open(content, { windowClass: 'messaging-report-block-modal' })
  }

  onRename() {
    this.listenersService.triggerToggleRenameGroupInput(true)
  }

  closeModal() {
    this.modalRef.close();
  }

  onNext(type) {
    let modalType = type == "report" ? this.reportChatModalRef : this.blockUserModalRef
    this.closeModal();
    this.modalRef = this.ngbModalService.open(modalType, { windowClass: 'messaging-mute-chat-modal' })
  }

  // Route to the new chat when user click the plus button.
  onAddChat() {
    this.modal.title = 'New Conversation';
    this.modalType = 'add';
    this.modal.open();
  }

  getResult( e: any[] ) {
    

    let users = e.map(
      ( user: any ) => {

         return {
            avatar: user.avatar,
            id: user.id,
            name: user.fullName,
            url: user.url
         }

      }
    );

    // this.listenersService.newUsersMessage.next(users);

    this.router.navigate(['/messaging/new'] , {
      state:{ users }
    })
    this.modal.close();
    
 }

  onHideNewChat() {
    this.router.navigate(['messaging/v/', this.conversationList[0].id])
  }

  // Get the participant other than the logged in user from the participants array inside the conversation. 
  getParticipant(conversation) {
    let loggedInUserId = this.cookieService.get('user_id');
    let participant = conversation.participants.filter((item) => item.id !== loggedInUserId)[0];
    return participant
  }


  unBlockUser(user , index:number) {
    
    let mutation = user.is_company ? 
                   this.graphQLMappingService.unBlockCompany(user.id) :
                   this.graphQLMappingService.unBlockUser(user.id)

    mutation.
    subscribe(({ data }) => {
      this.blockedUsers.splice(index,1);
    }, (error) => {

    });
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
      
    });
  }

  // Showing time vs date on the list. If its today, show only time. If it is not today, show only date
  getConversationTime(conversationItem) {
    let messageDateStr = this.messageDatePipe.transform(conversationItem.last_message.timestamp)
    let currDateStr = this.messageDatePipe.transform(new Date().getTime())
    if (messageDateStr !== currDateStr) {
      return messageDateStr
    }
    else {
      return this.dateFormatPipe.transform(conversationItem.last_message.timestamp)
    }
  }
}

import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { ListenersService } from 'src/app/messaging/shared/services/listeners.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MappingService } from 'src/app/messaging/shared/graphql/mapping.service'
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { utilities } from 'src/app/_shared/utilities/utilities';

@Component({
  selector: 'app-small-chat-box',
  templateUrl: './small-chat-box.component.html',
  styleUrls: ['./small-chat-box.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SmallChatBoxComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;

  @Input() conversationId;
  @Output() onClose = new EventEmitter;
  @ViewChild('reportChatModal', { static: false }) reportChatModalRef: ElementRef;
  @ViewChild('blockUserModal', { static: false }) blockUserModalRef: ElementRef;
  @ViewChild('sendMessageForm', { static: false }) sendMessageFormRef: ElementRef;

  showBody = true;
  showSearch = false;
  totalUnread = 0;

  modalRef: any;
  selectedReply: any;

  messageText: any = '';
  conversation: any;
  conversationLoaded = false;
  currentUserId: any;
  formData: FormData;

  selectedItems = [];

  showSearchUserFields = false

  deleteConversationSubscription: Subscription;
  conversationChange: Subscription;
  readUnreadUpdate: Subscription;
  archivedUpdate: Subscription;
  newMessageListener: Subscription;
  modalType:string;
  isCompany:boolean = false;
  isBlocked:boolean = false;
  participantLink:string;
  isMobile: boolean; 

  constructor(
    private apollo: Apollo,
    private cookieService: CookieService,
    private globalService:GlobalUserProService,
    private listenersService: ListenersService,
    private ngbModalService: NgbModal,
    private graphQLMappingService: MappingService,
  ) { }

  ngOnInit() {

    this.conversationLoaded = false;
    this.currentUserId = this.globalService.isCompanyActive() ? 
                         this.globalService.getComapnyId() : this.globalService.getUserProfile()['id'];

    this.conversationChange = this.getConversation();


    this.newMessageListener = this.listenersService.newMessage.subscribe(newMessage => {
      
      (newMessage.sender_id !== this.currentUserId) &&
      (newMessage.conversation_id === this.conversationId) && 
      (this.totalUnread = this.totalUnread + 1);
    })

    this.deleteConversationSubscription = this.listenersService.deleteConversationUpdate.subscribe((event) => {
      this.close();
    })

    // To toggle readUnread on the list item. 
    this.readUnreadUpdate = this.listenersService.readUnreadUpdate.subscribe((event) => {
      this.conversation.unread = event.unread
    })

    // To toggle archived/unarchived on the list item. 
    this.archivedUpdate = this.listenersService.archivedUpdate.subscribe((event) => {
      this.conversation.archived = event.archived;
    })
  }

  ngOnDestroy() {
    this.deleteConversationSubscription.unsubscribe();
    this.conversationChange.unsubscribe();
    this.readUnreadUpdate.unsubscribe();
    this.archivedUpdate.unsubscribe();
    this.newMessageListener.unsubscribe();
  }

  getConversation() {
    let variables = {
      id: this.conversationId,
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)


    return this.apollo.watchQuery({
      query: this.graphQLMappingService.GetConversation,
      fetchPolicy: 'network-only',
      variables: variables,
    }).valueChanges.subscribe
      (({ data }) => {

        this.conversation = data[Object.keys(data)[0]];

        this.getSecondParticipant();
        
        
        this.conversationLoaded = true;
      });
  }

  getParticipant(id) {
    let participant = this.conversation.participants.filter((item) => item.id == id)[0];
    return participant
  }

  getSecondParticipant() {
    let loggedInUserId = this.cookieService.get('user_id');
    let participant = this.conversation.participants.filter((item) => item.id !== loggedInUserId)[0];
    this.isCompany = participant.is_company;

    this.participantLink = this.isCompany ? `/company/profile/${participant.url}` :
                                            `/user/profile/${participant.url}`;

    
    return participant;
  }

  getAllParticipant(){
    return this.conversation.participant;
  }

  open(type:string , content?:any){
    this.modal.open();
    this.modalType = type;

    if(type === 'report'){
      this.modal.title = `Report ${content.name}`;
    };
  }

  close() {
    this.onClose.emit(this.conversationId)
  }

  minimize() {
    this.showBody = !this.showBody
  }

  resetSearchUserFields() {
    this.selectedItems = [];
    this.showSearch = false;
  }

  closeModal() {
    this.modalRef.close();
  }

  // Modal code
  openMuteChatModal(content) {
    this.modalRef = this.ngbModalService.open(content, { windowClass: 'messaging-mute-chat-modal' })
  }

  // To open different boostrap modal - starts
  openLeaveGroupModal(content) {
    this.modalRef = this.ngbModalService.open(content, { windowClass: 'messaging-leave-group-modal' })
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
      this.listenersService.triggerReadUnreadUpdate({
        conversationId: this.conversationId,
        unread: !this.conversation.unread
      })
    }, (error) => {
      alert('there was an error sending the query' + error);

    });
  }

  archiveConversation(conversationItem) {
    let variables = {
      conversationId: this.conversation.id,
      archive: !this.conversation.archived
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.mutate({
      mutation: this.graphQLMappingService.archiveConversation,
      variables: variables
    }).subscribe(({ data }) => {
      conversationItem.archived = !conversationItem.archived;
      this.listenersService.triggerArchiveUpdate({
        conversationId: this.conversation.id,
        archived: conversationItem.archived
      });
    }, (error) => {
      alert('there was an error sending the query' + error);

    });
  }

  openDeleteChatModal(content) {
    this.modalRef = this.ngbModalService.open(content, { windowClass: 'messaging-mute-chat-modal' })
  }

  openReportBlockModal(content) {
    this.modalRef = this.ngbModalService.open(content, { windowClass: 'messaging-report-block-modal' })
  }

  onNext(type) {
    let modalType = type == "report" ? this.reportChatModalRef : this.blockUserModalRef
    this.closeModal();
    this.modalRef = this.ngbModalService.open(modalType, { windowClass: 'messaging-mute-chat-modal' })
  }

  handleAfterSending() {

  }

  unBlockUser(user) {
    
    let mutation = user.is_company ? 
                   this.graphQLMappingService.unBlockCompany(user.id) :
                   this.graphQLMappingService.unBlockUser(user.id)

    mutation.
    subscribe(({ data }) => {
       this.isBlocked = false;
       
    }, (error) => {

    });
  }

  toggleMuteUnmute() {
    let variables = {
      conversationId: this.conversationId,
      mute: !this.conversation.muted
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)
    this.apollo.mutate({
      mutation: this.graphQLMappingService.muteChat,
      variables: variables
    }).subscribe(({ data }) => {
      this.conversation.muted = !this.conversation.muted;
      this.listenersService.triggerMuteUnmuteUpdate({
        conversationId: this.conversationId,
        mute: this.conversation.muted
      })
    }, (error) => {
      alert(error)
    });
  }

}

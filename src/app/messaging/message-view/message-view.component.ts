import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import { ListenersService } from 'src/app/messaging/shared/services/listeners.service';
import { MappingService } from 'src/app/messaging/shared/graphql/mapping.service';
import { AppModalComponent } from 'src/app/_shared/components/app-modal/app-modal.component';
import { utilities } from 'src/app/_shared/utilities/utilities';

@Component({
  selector: 'app-message-view',
  templateUrl: './message-view.component.html',
  styleUrls: ['./message-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MessageViewComponent implements OnInit {

  @ViewChild(AppModalComponent, { static: true }) modal:AppModalComponent;
  // This component is the container for Chat screen (in middle) and message details(on right side.) components. 

  @ViewChild('reportChatModal', { static: false }) reportChatModalRef: ElementRef;
  @ViewChild('blockUserModal', { static: false }) blockUserModalRef: ElementRef;

  modalRef: any;
  conversationId: any;
  conversation: any = null;
  conversationLoaded = false;
  showSearchFields = false;

  routeSubscription: Subscription;
  conversationChange: Subscription;
  readUnreadUpdate: Subscription;
  newMessageListener: Subscription;
  modalType:string;
  isCompany:boolean = false;
  isBlocked:boolean = false;
  isMobile:boolean = false;

  constructor(
    private ngbModalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private apollo: Apollo,
    private cookieService: CookieService,
    private listenersService: ListenersService,
    private graphQLMappingService: MappingService
  ) { }

  ngOnInit() {

 
    this.isMobile = utilities.isMobile;

    this.routeSubscription = this.activatedRoute.params.subscribe(params => {
      this.conversationLoaded = false;
      this.conversationId = params['conversationId'];
      this.conversationChange && this.conversationChange.unsubscribe()
      this.conversationChange = this.getConversation()
    })

    // To toggle readUnread on the list item. 
    this.readUnreadUpdate = this.listenersService.readUnreadUpdate.subscribe((event) => {
      this.conversation.unread = event.unread
    })

    // To change conversation name for group when participant is added or left
    this.newMessageListener = this.listenersService.newMessage.subscribe(newMessage => {
      if(newMessage.type == 'ParticipantLeft' || newMessage.type == 'AddParticipant' ){
        this.conversationChange.unsubscribe();
        this.conversationChange = this.getConversation();
      }
    })
  }

  ngOnDestroy() {
    this.routeSubscription.unsubscribe();
    this.conversationChange && this.conversationChange.unsubscribe();
    this.readUnreadUpdate.unsubscribe();
    this.newMessageListener.unsubscribe();
  }

  showMessageList(){
    this.listenersService.triggerMessageList(false);
  }

  // Get details of the selected conversation 
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
        this.conversationLoaded = true;
      });
  }

  // To open different boostrap modal - starts
  openLeaveGroupModal(content) {
    this.modalRef = this.ngbModalService.open(content, { windowClass: 'messaging-leave-group-modal' })
  }; 

  openMuteChatModal(content) {
    this.modalRef = this.ngbModalService.open(content, { windowClass: 'messaging-mute-chat-modal' })
  }

  openDeleteChatModal(content) {
    this.modalRef = this.ngbModalService.open(content, { windowClass: 'messaging-mute-chat-modal' })
  }

  openReportBlockModal(content) {
    this.modalRef = this.ngbModalService.open(content, { windowClass: 'messaging-report-block-modal' })
  }
  // To open different boostrap modal - Ends

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
      alert('Error 101 ' + error);

    });
  }

  // Update other components when group is renamed
  onRename() {
    this.listenersService.triggerToggleRenameGroupInput(true);
  }

  open(type:string , content?:any){
    this.modal.open();
    this.modalType = type;

    
    if(type === 'report'){
      this.modal.title = `Report ${content.name}`;
    };
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

  closeModal() {
    this.modalRef.close();
  }

  // When next is clicked inside the report/block modal
  onNext(type) {
    let modalType = type == "report" ? this.reportChatModalRef : this.blockUserModalRef
    this.closeModal();
    this.modalRef = this.ngbModalService.open(modalType, { windowClass: 'messaging-mute-chat-modal' })
  }

  getParticipant() {
    let loggedInUserId = this.cookieService.get('user_id');
    let participant = this.conversation.participants.filter((item) => item.id !== loggedInUserId)[0];
    this.isCompany = participant.is_company;
    return participant
  }

  setReadUnread() {
    let variables = {
      conversationId: this.conversationId,
      flag: !this.conversation.unread
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

  // When plus button is clicked on the header, notify the child component to show the search field. 
  onAddParticipants() {
    this.showSearchFields = !this.showSearchFields;
    this.listenersService.triggerSearchUserFields(this.showSearchFields);
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

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ListenersService } from 'src/app/messaging/shared/services/listeners.service';
import { MappingService } from 'src/app/messaging/shared/graphql/mapping.service'

@Component({
  selector: 'app-delete-chat-confirm',
  templateUrl: './delete-chat-confirm.component.html',
  styleUrls: ['./delete-chat-confirm.component.scss']
})
export class DeleteChatConfirmComponent implements OnInit {

  @Output() closeModal = new EventEmitter();
  @Input() conversationId: number;
  @Input() archiveStatus: boolean;

  constructor(
    private apollo: Apollo,
    private listenersService: ListenersService,
    private graphQLMappingService: MappingService
  ) { }

  ngOnInit() {
  }

  onDelete() {
    let variables = {
      conversationId: this.conversationId
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.mutate({
      mutation: this.graphQLMappingService.deleteConversation,
      variables: variables
    }).subscribe(({ data }) => {
      this.listenersService.triggerDeleteConversationUpdate({
        conversationId: this.conversationId
      })
      this.closeModal.emit();
    }, (error) => {
      alert('there was an error sending the query' + error);
    });
  }

  archiveConversation() {
    let variables = {
      conversationId: this.conversationId,
      archive: !this.archiveStatus
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.mutate({
      mutation: this.graphQLMappingService.archiveConversation,
      variables: variables
    }).subscribe(({ data }) => {
      this.listenersService.triggerArchiveUpdate({
        conversationId: this.conversationId,
        archived: !this.archiveStatus
      });
      this.close();
    }, (error) => {
      alert('there was an error sending the query' + error);

    });
  }

  close() {
    this.closeModal.emit();
  }
}

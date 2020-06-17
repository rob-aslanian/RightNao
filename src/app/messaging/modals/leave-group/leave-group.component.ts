import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ListenersService } from 'src/app/messaging/shared/services/listeners.service';

import { MappingService } from 'src/app/messaging/shared/graphql/mapping.service'


@Component({
  selector: 'app-leave-group',
  templateUrl: './leave-group.component.html',
  styleUrls: ['./leave-group.component.scss']
})
export class LeaveGroupComponent implements OnInit {

  @Output() closeModal = new EventEmitter();
  @Input() conversationId

  constructor(
    private apollo: Apollo,
    private listenersService: ListenersService,
    private graphQLMappingService: MappingService
  ) { }

  ngOnInit() {
  }

  leaveConversation() {
    let variables = {
      conversationId: this.conversationId,
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.mutate({
      mutation: this.graphQLMappingService.LeaveConversation,
      variables: variables
    }).subscribe(({ data }) => {
      this.listenersService.triggerDeleteConversationUpdate({ // notify other component of leaving the group
        conversationId: this.conversationId
      })
      this.close();
    }, (error) => {
      alert('Error-101 ' + error)
    });
  }

  close() {
    this.closeModal.emit();
  }

}

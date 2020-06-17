import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { MappingService } from 'src/app/messaging/shared/graphql/mapping.service'

@Component({
  selector: 'app-report-chat',
  templateUrl: './report-chat.component.html',
  styleUrls: ['./report-chat.component.scss']
})
export class ReportChatComponent implements OnInit {

  @Output() closeModal = new EventEmitter();
  @Input() conversationId: any;

  reason: string = "It is a spam."

  constructor(
    private apollo: Apollo,
    private graphQLMappingService: MappingService
  ) { }

  ngOnInit() {
  }

  reportConversation() {
    let variables = {
      conversationId: this.conversationId,
      text: this.reason
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.mutate({
      mutation: this.graphQLMappingService.ReportConversation,
      variables: variables
    }).subscribe(({ data }) => {
      this.close()
    }, (error) => {
      alert('Error-101 ' + error)
    });
  }

  close() {
    this.closeModal.emit();
  }

}

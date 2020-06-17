import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ListenersService } from 'src/app/messaging/shared/services/listeners.service';
import { MappingService } from 'src/app/messaging/shared/graphql/mapping.service'

@Component({
  selector: 'app-mute-chat',
  templateUrl: './mute-chat.component.html',
  styleUrls: ['./mute-chat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MuteChatComponent implements OnInit {

  @Output() closeModal = new EventEmitter();
  @Input() conversationId: number;
  @Input() muteStatus: any;

  constructor(
    private apollo: Apollo,
    private listenersService: ListenersService,
    private graphQLMappingService: MappingService
  ) { }

  ngOnInit() {
  }

  onMuteClick() {
    let variables = {
      conversationId: this.conversationId,
      mute: !this.muteStatus
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)
    this.apollo.mutate({
      mutation: this.graphQLMappingService.muteChat,
      variables: variables
    }).subscribe(({ data }) => {
      this.muteStatus = !this.muteStatus
      this.listenersService.triggerMuteUnmuteUpdate({
        conversationId: this.conversationId,
        mute: this.muteStatus
      })
      this.close()
    }, (error) => {
      

    });
  }

  close() {
    this.closeModal.emit();
  }

}

import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Apollo } from 'apollo-angular';
import { ListenersService } from 'src/app/messaging/shared/services/listeners.service';

import { MappingService } from 'src/app/messaging/shared/graphql/mapping.service'


@Component({
  selector: 'app-block-user',
  templateUrl: './block-user.component.html',
  styleUrls: ['./block-user.component.scss']
})
export class BlockUserComponent implements OnInit {

  @Output() closeModal = new EventEmitter();
  @Input() conversation: any;

  user: any;
  company: any;

  constructor(
    private cookieService: CookieService,
    private apollo: Apollo,
    private graphQLMappingService: MappingService,
    private listenersService: ListenersService,
  ) { }

  ngOnInit() {
    if (this.getParticipant().is_company) {
      this.GetCompanyProfile();
    } else {
      this.getUserProfile();
    }
  }

  GetCompanyProfile() {
    this.apollo.query({
      query: this.graphQLMappingService.getCompanyProfile,
      variables: {
        url: this.getParticipant().url
      },
    }).subscribe
      (({ data }) => {
        this.company = data[Object.keys(data)[0]]
      });
  }

  getUserProfile() {
    let variables = {
      url: this.getParticipant().url
    }

    this.apollo.query({
      query: this.graphQLMappingService.getUserProfile,
      fetchPolicy: 'network-only',
      variables: variables,
    }).subscribe
      (({ data }) => {
        this.user = data[Object.keys(data)[0]]
      });
  }

  blockUser() {
    let variables = {
      userId: this.getParticipant().id
    }

    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.mutate({
      mutation: this.graphQLMappingService.BlockUser,
      variables: variables
    }).subscribe(({ data }) => {
      this.blockConversation();
      this.close()
    }, (error) => {
      alert('Error-101 ' + error)
    });
  }

  blockConversation() {
    let variables = {
      conversationId: this.conversation.id,
      block: true
    }

    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.mutate({
      mutation: this.graphQLMappingService.BlockConversation,
      variables: variables
    }).subscribe(({ data }) => {
      this.conversation.blocked = true;
      this.listenersService.triggerDeleteConversationUpdate({
        conversationId: this.conversation.id
      })
      this.close();
    }, (error) => {
      alert(error)
    });
  }

  getParticipant() {
    let loggedInUserId = this.cookieService.get('user_id');
    let participant = this.conversation.participants.filter((item) => item.id !== loggedInUserId)[0];
    return participant
  }

  close() {
    this.closeModal.emit();
  }

}

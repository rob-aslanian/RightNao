import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MappingService } from 'src/app/messaging/shared/graphql/mapping.service';
import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-report-block',
  templateUrl: './report-block.component.html',
  styleUrls: ['./report-block.component.scss']
})
export class ReportBlockComponent implements OnInit {

  @Output() closeModal = new EventEmitter();
  @Output() onNext = new EventEmitter();
  @Input() conversation;

  type: string = "block";

  constructor(
    private graphQLMappingService: MappingService,
    private apollo: Apollo,
    private cookieService: CookieService
  ) { }

  ngOnInit() {}

  close() {
    this.closeModal.emit();
  }

  onNextClick() {
    this.conversation.blocked ? this.unBlockUser() : this.onNext.emit(this.type);
  }

  unBlockUser() {
    // let variables = {
    //   conversationId: this.conversation.id,
    //   block: !this.conversation.blocked
    // }

    // this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    // this.apollo.mutate({
    //   mutation: this.graphQLMappingService.BlockConversation,
    //   variables: variables
    // }).subscribe(({ data }) => {
    //   this.conversation.blocked = false;
    //   this.closeModal.emit();
    // }, (error) => {
    //   alert(error)
    // });

    let variables = {
      userId: this.getParticipant().id
    }

    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.mutate({
      mutation: this.graphQLMappingService.UnblockUser,
      variables: variables
    }).subscribe(({ data }) => {
      this.conversation.blocked = false;
      this.close()
    }, (error) => {
      alert('Error-101 ' + error)
    });
  }

  getParticipant() {
    let loggedInUserId = this.cookieService.get('user_id');
    let participant = this.conversation.participants.filter((item) => item.id !== loggedInUserId)[0];
    return participant
  }
}

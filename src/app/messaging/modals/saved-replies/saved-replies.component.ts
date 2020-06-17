import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { MappingService } from 'src/app/messaging/shared/graphql/mapping.service'


@Component({
  selector: 'app-saved-replies',
  templateUrl: './saved-replies.component.html',
  styleUrls: ['./saved-replies.component.scss']
})
export class SavedRepliesComponent implements OnInit {

  @Output() closeModal = new EventEmitter();
  @Output() applyReply = new EventEmitter();
  @Output() onCreateReply = new EventEmitter();
  @Input() conversationName;

  selectedListType: string = 'All';
  myReplies = [];
  selectedReply: any;
  searchText = ""

  constructor(
    private apollo: Apollo,
    private graphQLMappingService: MappingService
  ) { }

  ngOnInit() {
    this.getChatReplies();
  }

  getChatReplies() {

    let variables = {
      query: this.searchText
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.query({
      query: this.graphQLMappingService.GetMyReplies,
      fetchPolicy: 'network-only',
      variables: variables
    }).subscribe
      (({ data }) => {
        this.myReplies = data[Object.keys(data)[0]]
      });
  }

  changeChatListType(type) {
    this.selectedListType = type
  }

  onCreateClick() {
    
    this.onCreateReply.emit(this.selectedReply);
  }

  close() {
    this.closeModal.emit();
  }

  deleteReply(id, index) {
    let variables = {
      id: id
    }
    this.graphQLMappingService.isCompany && (variables['companyId'] = this.graphQLMappingService.companyId)


    this.apollo.mutate({
      mutation: this.graphQLMappingService.DeleteReply,
      variables: variables
    }).subscribe(({ data }) => {
      this.myReplies.splice(index, 1)
    }, (error) => {
      

    });
  }

  editReply(reply) {
    this.selectedReply = reply;
    this.onCreateClick()
  }

  onApplyReply(reply) {
    let _reply = JSON.parse(JSON.stringify(reply))
    _reply.text = _reply.text.replace(new RegExp('___', 'g'), this.conversationName)
    this.applyReply.emit(_reply);
    this.close();
  }

}

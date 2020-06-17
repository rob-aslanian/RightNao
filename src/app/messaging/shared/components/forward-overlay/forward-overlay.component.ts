import { Component, OnInit, Input } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ListenersService } from 'src/app/messaging/shared/services/listeners.service';
import { MappingService } from 'src/app/messaging/shared/graphql/mapping.service';

@Component({
  selector: 'app-forward-overlay',
  templateUrl: './forward-overlay.component.html',
  styleUrls: ['./forward-overlay.component.scss']
})
export class ForwardOverlayComponent implements OnInit {

  @Input() selectedItems;
  @Input() overlayRef;
  @Input() fileId;
  @Input() filesId:Set<any>;

  constructor(
    private apollo: Apollo,
    private listenersService: ListenersService,
    private graphQLMappingService: MappingService
  ) { }

  ngOnInit() {
  }

  forwardPhoto() {
    let participantsArr = [];
    let params;

    participantsArr = this.createParticipantsArr();
    params = {
      name: name,
      avatar: '',
      participants: participantsArr
    }
    this.createConversation(params, (conversationId) => {
      this.closeOverlay();
      this.sendWebsocketMessage(conversationId, this.fileId ? this.fileId : this.filesId);
    })
  }

  // create this array to forward to multiple users
  createParticipantsArr() {
    let arr = []
    this.selectedItems.forEach(element => {
      let participantJSON = {
        id: element.id,
        is_company: false,
        is_admin: false
      }
      arr.push(participantJSON);
    });
    return arr;
  }

  createConversation(params, callback) {
    this.graphQLMappingService.isCompany && (params['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.mutate({
      mutation: this.graphQLMappingService.CreateConversation,
      variables: params
    }).subscribe(({ data }) => {
      let converstionId = data[Object.keys(data)[0]].id;
      callback(converstionId);
    }, (error) => {
      alert('Error-101' + error)
    });
  }

  sendWebsocketMessage(converstionId, filepath) {
    let message = {
      "conversation_id": converstionId,
      "text": "",
      "files":[], 
    }
    let files = [];

    
    filepath instanceof Set ?  message['files'] = Array.from(filepath)
                                                       .map(files  => files.map(file => { return {file} }) )[0] : 
                               message['files'].push({file:filepath})

 
    

    this.listenersService.messagingWebSocket.send(JSON.stringify(message));
  }


  closeOverlay() {
    this.selectedItems = [];
    this.overlayRef.close();
  }

}

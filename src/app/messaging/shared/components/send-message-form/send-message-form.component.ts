import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'
import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import { ListenersService } from 'src/app/messaging/shared/services/listeners.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CONSTANTS } from 'src/app/messaging/shared/constants';

import { ConversationNamePipe } from 'src/app/messaging/shared/pipes/conversation-name.pipe';
import { FilepathPipe } from 'src/app/messaging/shared/pipes/filepath.pipe';

import { MappingService } from 'src/app/messaging/shared/graphql/mapping.service'
import { GlobalUserProService } from 'src/app/_shared/services/global-user-pro.service';

@Component({
  selector: 'app-send-message-form',
  templateUrl: './send-message-form.component.html',
  styleUrls: ['./send-message-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SendMessageFormComponent implements OnInit {

  // The component to send the message at the bottom of the chat screen. 

  @Input() selectedItems;
  @Input() conversation;
  @Output() handleAfterSending = new EventEmitter;

  @ViewChild('createReplyModal', { static: true }) createReplyModalRef: ElementRef;
  @ViewChild('messageTextArea', { static: true }) messageTextAreaRef: ElementRef<HTMLElement>;


  messageText = "";
  formData: FormData;
  modalRef: any;
  selectedReply: any;
  selectedFilename = ''
  conversationName: any;
  isBlank:boolean = false;
  selectedFiles = [];

  constructor(
    private apollo: Apollo,
    private cookieService: CookieService,
    public listenersService: ListenersService,
    private ngbModalService: NgbModal,
    private http: HttpClient,
    private router: Router,
    private graphQLMappingService: MappingService,
    private global:GlobalUserProService
  ) { }

  ngOnInit() {
    this.formData = null;
    this.conversationName = this.conversation ? new ConversationNamePipe(this.cookieService).transform(this.conversation) : "";
  }

  ngAfterViewInit(): void {
    this.messageTextAreaRef.nativeElement.focus();
  }

  onFileDrop(files:any[]) {
    this.fileChange(files)
  }


  // Generate a participants array to be sent to the server
  createParticipantsArr() {
    let arr = []
    this.selectedItems.forEach(element => {
      let participantJSON = {
        id: element.id,
        is_company: element['is_company'] !== undefined, // if is_company is not present, then it is not a company.
        is_admin: false
      }
      arr.push(participantJSON);
    });
    return arr;
  }

  // Upload file if any. Send response in call back function
  checkAndUploadFile(callback) {

    this.isBlank = !this.messageText || /^\s*$/.test(this.messageText);
    if (!this.isBlank || this.formData != null) {
      if (this.selectedFiles.length !== 0) {

        let hasBlob = false;
        let formData = new FormData();
        let filesIds = [] 
        
        this.selectedFiles.forEach((file) => {
          if (file.isBlob) { // If blob, append as form data
            hasBlob = true;
            formData.append('file', file, file.name);
          }else { // if not blob, say we directly have link/id of the file
            filesIds.push({ 'file': file.id })
          }
        })

        if (hasBlob) {
          let token = this.cookieService.get('token_user');
          const req = this.http.post(CONSTANTS.FILEPATH + '?token=' + token, formData)
            .subscribe(
              (res: any) => {
                
                res.files.forEach((item) => {
                  filesIds.push({ 'file': item.id })
                })
                callback(filesIds);
              },
              err => {
                callback([]);
              }
            );
        }else {
          callback(filesIds);
        }


        //upload file and then callback with acual uploaded file path

      } else if (!this.formData && this.selectedFilename !== '') { // if link of the file is already provided
        let link = document.getElementById('selectedImage')['src']
        let splitArr = link.split('fs/');
        callback([splitArr[splitArr.length - 1]]);
      } else {
        callback([])
      }
    }
  }

  // Call API to add participants in the conversation 
  addParticipants(params, callback) {
    this.graphQLMappingService.isCompany && (params['companyId'] = this.graphQLMappingService.companyId)

    this.apollo.mutate({
      mutation: this.graphQLMappingService.AddParticipants,
      variables: params
    }).subscribe(({ data }) => {
      callback(data[Object.keys(data)[0]].id);
    }, (error) => {
      alert('Error 101 ' + error)
    });
  }

  // Sending the web socket message with all the details. 
  sendWebsocketMessage(converstionId, fileIds) {
    let message = {
      "conversation_id": converstionId,
      "text": this.messageText,
      // "file": fileId,
      "files": fileIds
    }


    this.listenersService.messagingWebSocket.send(JSON.stringify(message));
    this.messageText = '';
    this.selectedFilename = '';
    this.formData = null;
    this.selectedItems = [];
    this.selectedFiles = [];

    this.handleAfterSending.emit(converstionId);
  }

  // select file to send and show it in the img tag
  async fileChange(event) {
    const files = event instanceof Event ? (<any>event).target.files : event;
    let file = event instanceof Event ? (<any>event).target.files[0] : event[0];

    this.formData = new FormData();
    this.formData.append('file', file, file.name);
    this.selectedFilename = file.name;


    let totalFiles = files.length + this.selectedFiles.length;
    let totalFilesSize = this.getTotalFilesSize(files);

    if (totalFiles > 20) {
      alert('Total allowed files are 20');
    }
    else if (totalFilesSize >= 20) {
      alert('Maximum total files size should be 10 MB');
    }
    else {
      for (let i = 0; i < files.length; i++) {
        let fileObj = files[i];
        fileObj['isBlob'] = true;
        if (this.listenersService.isImage(this.getFileExt(fileObj.name))) { // if file is image
          fileObj['imageSrc'] = await this.getImageData(fileObj);
          this.selectedFiles.push(fileObj);
        }
        else {
          this.selectedFiles.push(fileObj); // file is not image
        }
      }
    }

  }

  getImageData(fileObj) {
    return new Promise((res, rej) => {
      var fr = new FileReader();
      fr.onload = () => {
        res(fr.result);
        // document.getElementById('selectedImage')['src'] = fr.result;
      }
      fr.readAsDataURL(fileObj);
    })
  }

  getTotalFilesSize(files) {
    let totalSize = 0;

    this.selectedFiles.forEach((file) => {
      totalSize = totalSize + file.size
    })

    for (let i = 0; i < files.length; i++) {
      totalSize = totalSize + files[i].size
    }

    totalSize = totalSize / 1000000;

    return totalSize
  }

  removeSelectedFile(index) {
    this.selectedFilename = '';
    this.formData = null;

    this.selectedFiles.splice(index, 1);
  }

  getFileExt(file_name) {
    let dotIndex = file_name.lastIndexOf('.')
    let fileExt: string = file_name.substring(dotIndex);
    return fileExt.toLowerCase()
  }

  onSend() {

    let participantsArr = [];
    let params;

    this.checkAndUploadFile((fileIds) => { // step 1: upload file if exists.
      if (this.selectedItems.length > 0) { // add participants if selected 
        participantsArr = this.createParticipantsArr();
        if (this.conversation) { // if its an already existing message
          params = {
            conversationId: this.conversation.id,
            participants: participantsArr
          }
          this.addParticipants(params, (conversationId) => {  // if group, then add participants first 
            // Code for renaming the conversation 
            this.sendWebsocketMessage(conversationId, fileIds) //finally send the mssage
          })
        } else { // if brand new message
          let name = ''
          this.selectedItems.forEach((item) => {
            name = name + ', ' + item.name
          })
          name = name.substring(1);
          params = {
            name: '',
            avatar: '',
            participants: participantsArr
          }
          this.createConversation(params, (conversationId) => {
            this.sendWebsocketMessage(conversationId, fileIds);
          })
        }
      } else {
        if (this.conversation) {
          this.sendWebsocketMessage(this.conversation.id, fileIds)
        } else {
          alert('Please selected any participants.')
        }
      }
    })
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

  openSavedRepliesModal(content) {
    this.modalRef = this.ngbModalService.open(content, { windowClass: 'top-over-all' })
  }

  onCreateReply(reply) {
    this.selectedReply = reply;
    this.modalRef.close();
    this.modalRef = this.ngbModalService.open(this.createReplyModalRef, { windowClass: 'top-over-all' })
  }

  applyReply(reply) {
    this.messageText = '';
    this.messageText = reply.text;

    if (reply.files.length !== 0) {

      let filePath = new FilepathPipe().transform(reply.files[0].id)
      this.selectedFiles.push({
        id: reply.files[0].id,
        name: reply.files[0].name,
        imageSrc: filePath,
        isBlob: false
      })
      // this.selectedFilename = reply.files[0].name;

      // setTimeout(() => { document.getElementById('selectedImage')['src'] = filePath; }, 500)
    }
  }

  closeModal() {
    this.modalRef.close();
  }
}

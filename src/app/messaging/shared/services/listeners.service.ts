import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListenersService {

  messagingWebSocket: WebSocket;
  sendOnEnterIsOn: boolean = true;
  isOnline: boolean = false;
  conversationPhotos = [];
  conversationFiles = [];

  public newMessage = new Subject<any>();
  public muteUnmuteUpdate = new Subject<any>();
  public deleteConversationUpdate = new Subject<any>();
  public searchInsideInterface = new Subject<any>();
  public toggleRenameGroupInput = new Subject<any>();
  public searchUserFields = new Subject<any>();
  public updateMessageStatus = new Subject<any>();
  public groupInfoUpdated = new Subject<any>();
  public totalUnreadCounts = new Subject<any>();
  public readUnreadUpdate = new Subject<any>();
  public archivedUpdate = new Subject<any>();
  public newUsersMessage = new Subject<any>();

  public hideMessage = new BehaviorSubject<boolean>(false);

  constructor(
  ) { }

  triggerNewMessage(event) {
    this.newMessage.next(event);
  }

  triggerMuteUnmuteUpdate(event) {
    this.muteUnmuteUpdate.next(event);
  }

  triggerDeleteConversationUpdate(event) {
    this.deleteConversationUpdate.next(event);
  }

  triggerSearchInsideInterface(event) {
    this.searchInsideInterface.next(event);
  }

  triggerToggleRenameGroupInput(event) {
    this.toggleRenameGroupInput.next(event);
  }

  triggerSearchUserFields(event) {
    this.searchUserFields.next(event);
  }

  triggerUpdateMessageStatus(event) {
    this.updateMessageStatus.next(event);
  }

  triggerGroupInfoUpdated(event) {
    this.groupInfoUpdated.next(event);
  }

  triggerTotalUnreadCounts(event) {
    this.totalUnreadCounts.next(event);
  }

  triggerReadUnreadUpdate(event) {
    this.readUnreadUpdate.next(event);
  }

  triggerArchiveUpdate(event) {
    this.archivedUpdate.next(event);
  }
 
  triggerMessageList(event:boolean) {
    this.hideMessage.next(event);
  }
  
  set setSendOnEnter(val) {
    this.sendOnEnterIsOn = val;
  }

  get getSendOnEnter() {
    return this.sendOnEnterIsOn;
  }

  set setConversationPhotos(val) {
    this.conversationPhotos = val
  }

  get getConversationPhotos() {
    return this.conversationPhotos;
  }

  set setConversationFiles(val) {
    this.conversationFiles = val
  }

  get getConversationFiles() {
    return this.conversationFiles;
  }

  isImage(fileExt) {
    if (fileExt == '.PNG' || fileExt == '.png' || fileExt == '.jpg' || fileExt == '.JPG' || fileExt == '.JPEG' || fileExt == '.jpeg') {
      return true;
    }else{
      return false; 
    }
  }

}

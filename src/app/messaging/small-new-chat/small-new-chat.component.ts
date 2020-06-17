import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-small-new-chat',
  templateUrl: './small-new-chat.component.html',
  styleUrls: ['./small-new-chat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SmallNewChatComponent implements OnInit {

  @ViewChild('sendMessageForm', { static: true }) sendMessageFormRef: ElementRef;

  @Output() onCloseNewChatBox = new EventEmitter;
  @Output() addChatBox = new EventEmitter;

  showBody = false;
  selectedItems = [];
  conversation = null;

  constructor() { }

  ngOnInit() {}

  close() {
    this.onCloseNewChatBox.emit();
  }

  handleAfterSending(converstionId) {
    this.addChatBox.emit(converstionId)
    this.close();
  }

}

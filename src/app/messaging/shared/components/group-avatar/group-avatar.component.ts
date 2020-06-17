import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-group-avatar',
  templateUrl: './group-avatar.component.html',
  styleUrls: ['./group-avatar.component.scss']
})
export class GroupAvatarComponent implements OnInit {

  // Component to display the group avatar 

  @Input() conversation;

  participantsCount = 0;

  constructor() { }

  ngOnInit() {}

  ngOnChanges(changes){
    let groupMembers = [];

    // Find legit group members in the conversation
    this.conversation.participants.forEach((item) => {
      if (!item.has_left) {
        groupMembers.push(item);
      }
    })

    // then get the total count
    if (groupMembers.length >= 4) {
      this.participantsCount = 4;
    } else {
      this.participantsCount = groupMembers.length
    }
  }
}

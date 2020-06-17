import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EMTY_PROFILE } from '../../models/empty-profile/emptyProfile.model';

@Component({
  selector: 'app-empty-profile',
  templateUrl: './empty-profile.component.html',
  styleUrls: ['./empty-profile.component.scss']
})

export class EmptyProfileComponent implements OnInit {

  EMTY_PROFILE = EMTY_PROFILE;
 
  // Get key for item 
  @Input() key: string;
 
  //Emit open on click empty div
  @Output() openModal: EventEmitter<undefined> = new EventEmitter<undefined>();
  

  constructor() { }

  ngOnInit() {
  }

  emitOpen() {
     this.openModal.emit();
  }
}

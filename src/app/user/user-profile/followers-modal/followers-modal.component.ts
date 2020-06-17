import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-followers-modal',
  templateUrl: './followers-modal.component.html',
  styleUrls: ['./followers-modal.component.scss']
})
export class FollowersModalComponent implements OnInit {

  @Input() profileID: string; 
  @Input() companyID: string; 
  @Input() isCompany: boolean; 
  @Input() followerListLenght: number; 
  @Output() onCloseModal : EventEmitter<boolean> = new EventEmitter(); 

  followerCompaniesLength: number; 
  followerPeopleLength: number; 

  constructor() { }

  ngOnInit() {
    
    
  }


  getFollowerPeopleLength(length: number) {
    this.followerPeopleLength = length; 
    this.followerCompaniesLength = this.followerListLenght - length; 
  }; 

  closeModal(event: boolean) {
    event ? this.onCloseModal.emit(true) : null;  
  }

}

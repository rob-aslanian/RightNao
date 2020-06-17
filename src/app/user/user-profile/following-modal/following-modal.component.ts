import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-following-modal',
  templateUrl: './following-modal.component.html',
  styleUrls: ['./following-modal.component.scss']
})
export class FollowingModalComponent implements OnInit {

  @Input() profileID: string; 
  @Input() companyID: string; 
  @Input() isCompany: boolean; 
  @Input() followingListLength: number; 
  @Output() onCloseModal: EventEmitter<boolean> = new EventEmitter(); 

  followingPeopleLength: number; 
  followingCompaniesLength: number; 

  constructor() { }

  ngOnInit() {
    
  }

  getPeopleLength(length: number) {
    this.followingPeopleLength = length;
    this.followingCompaniesLength = this.followingListLength - length;  
    
  }; 

  closeModal(event: boolean) {
    event ? this.onCloseModal.emit(true) : null; 
  }







}

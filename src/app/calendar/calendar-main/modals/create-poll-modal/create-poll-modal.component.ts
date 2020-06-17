import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-poll-modal',
  templateUrl: './create-poll-modal.component.html',
  styleUrls: ['./create-poll-modal.component.scss']
})
export class CreatePollModalComponent implements OnInit {

  pageNumber: number = 1;
  addTimes: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  nextPage() {
    this.pageNumber++
  }

}

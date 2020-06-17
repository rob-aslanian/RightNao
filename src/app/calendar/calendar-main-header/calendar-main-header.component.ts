import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-main-header',
  templateUrl: './calendar-main-header.component.html',
  styleUrls: ['./calendar-main-header.component.scss']
})
export class CalendarMainHeaderComponent implements OnInit {
  menuIsOpen = false
  constructor() { }

  ngOnInit() {
  }

}

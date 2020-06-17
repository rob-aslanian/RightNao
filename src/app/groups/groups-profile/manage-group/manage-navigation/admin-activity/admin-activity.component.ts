import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-admin-activity',
  templateUrl: './admin-activity.component.html',
  styleUrls: ['./admin-activity.component.scss']
})
export class AdminActivityComponent implements OnInit {

  @HostBinding('style.width') width = '100%';

  constructor() { }

  ngOnInit() {
  }

}

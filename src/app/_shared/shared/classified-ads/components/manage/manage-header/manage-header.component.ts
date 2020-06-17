import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-manage-header',
  templateUrl: './manage-header.component.html',
  styleUrls: ['./manage-header.component.scss']
})
export class ManageHeaderComponent implements OnInit {
  @Input() place:string = 'ads-services';

  constructor() { }

  ngOnInit() {
  }

}

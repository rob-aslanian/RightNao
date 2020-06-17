import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search-service-request',
  templateUrl: './search-service-request.component.html',
  styleUrls: ['./search-service-request.component.scss']
})
export class SearchServiceRequestComponent implements OnInit {

  @Input() requestList;
  @Input() amount:number
  
  constructor() { }

  ngOnInit() {
  }

}

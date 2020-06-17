import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ads-services',
  templateUrl: './ads-services.component.html',
  styleUrls: ['./ads-services.component.scss']
})
export class AdsServicesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('is main');
  }

}

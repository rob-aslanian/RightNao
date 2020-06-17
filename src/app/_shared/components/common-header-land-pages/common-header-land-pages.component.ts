import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-common-header-land-pages',
  templateUrl: './common-header-land-pages.component.html', 
  styleUrls: ['./common-header-land-pages.component.scss']
})
export class CommonHeaderLandPagesComponent implements OnInit {
  
  @Input()
     isLogin: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}

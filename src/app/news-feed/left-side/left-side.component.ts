import { Component, OnInit, HostBinding } from '@angular/core';
import { NewsFeedService } from '../services/news-feed.service';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.scss' ,  '../shared/scss/shared.scss']
})
export class LeftSideComponent implements OnInit {

  @HostBinding('attr.class') class = 'col-lg-3 col-md-4';
  
  constructor(
   // private testt:NewsFeedService
  ) { }

  ngOnInit() {

  }

}
